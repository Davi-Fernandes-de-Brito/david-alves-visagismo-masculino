// Detecta o caminho base e a URL pública para GitHub Pages ou execução local.
// Para um caminho/domínio próprio, defina VITE_BASE_PATH e/ou VITE_SITE_URL.
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
  const siteUrl = (env.VITE_SITE_URL || githubUrl || DEFAULT_SITE_URL).replace(/\/+$/, '');
  return { base, siteUrl };
}
