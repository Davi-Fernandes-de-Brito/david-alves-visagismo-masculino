// Descobre o caminho base e a URL do site, para funcionar em qualquer hospedagem sem editar código:
// - GitHub Pages (GitHub Actions): usa o nome do repositório (https://usuario.github.io/repositorio/).
// - Vercel: usa a URL de produção fornecida pela Vercel.
// - Local: caminho "/".
// Para forçar valores, defina VITE_BASE_PATH (ex.: /meu-site/) e/ou VITE_SITE_URL.
export const DEFAULT_SITE_URL = 'https://davi-fernandes-de-brito.github.io/david-alves-visagismo-masculino';

const normalizeBase = (value) => {
  const clean = String(value || '/').trim();
  if (clean === '' || clean === '/') return '/';
  return `/${clean.replace(/^\/+|\/+$/g, '')}/`;
};

export function resolveSite(env = process.env) {
  const [owner, repo] = String(env.GITHUB_REPOSITORY || '').split('/');
  const onGithub = env.GITHUB_ACTIONS === 'true' && !!owner && !!repo;
  const isUserSite = onGithub && repo.toLowerCase() === `${owner}.github.io`.toLowerCase();
  const githubBase = onGithub ? (isUserSite ? '/' : `/${repo}/`) : null;

  const base = normalizeBase(env.VITE_BASE_PATH || githubBase || '/');
  const githubUrl = onGithub ? `https://${owner.toLowerCase()}.github.io${base === '/' ? '' : base.replace(/\/$/, '')}` : '';

  const productionDomain = env.VERCEL_PROJECT_PRODUCTION_URL || env.VITE_VERCEL_PROJECT_PRODUCTION_URL || '';
  const deploymentDomain = env.VERCEL_URL || '';
  const siteUrl = (
    env.VITE_SITE_URL ||
    githubUrl ||
    (productionDomain ? `https://${productionDomain}` : '') ||
    (deploymentDomain ? `https://${deploymentDomain}` : '') ||
    DEFAULT_SITE_URL
  ).replace(/\/+$/, '');

  return { base, siteUrl, productionDomain };
}
