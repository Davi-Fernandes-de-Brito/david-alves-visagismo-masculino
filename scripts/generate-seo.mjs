import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { resolveSite } from './site-env.mjs';

function readEnvFile(file) {
  try {
    const contents = readFileSync(file, 'utf8');
    return Object.fromEntries(contents.split(/\r?\n/).flatMap((line) => {
      const match = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (!match) return [];
      let value = match[2].trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
      return [[match[1], value]];
    }));
  } catch {
    return {};
  }
}

const root = process.cwd();
const fileEnv = { ...readEnvFile(path.join(root, '.env')), ...readEnvFile(path.join(root, '.env.production')) };
const { base: basePath, siteUrl } = resolveSite({ ...fileEnv, ...process.env });
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n  <url>\n    <loc>${siteUrl}/privacidade.html</loc>\n    <changefreq>yearly</changefreq>\n    <priority>0.3</priority>\n  </url>\n</urlset>\n`;
const robots = `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`;
const notFound = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><meta name="theme-color" content="#141311"><title>Página não encontrada | David Alves</title>
<style>:root{color-scheme:dark;--bg:#141311;--fg:#f3efe8;--muted:#c7bfb4;--accent:#d4b38b}*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:2rem;background:var(--bg);color:var(--fg);font-family:Arial,sans-serif}main{max-width:680px;text-align:center}small{color:var(--accent);letter-spacing:.2em;font-weight:700;text-transform:uppercase}h1{font:500 clamp(3rem,9vw,6.5rem)/.98 Georgia,serif;margin:1.5rem 0}p{color:var(--muted);line-height:1.7;margin:0 auto 2rem;max-width:34rem}a{display:inline-block;padding:1rem 1.4rem;border:1px solid var(--accent);color:var(--fg);text-decoration:none;text-transform:uppercase;letter-spacing:.08em;font-size:.8rem}</style></head>
<body><main><small>David Alves · Visagismo masculino</small><h1>Esta página não existe.</h1><p>O endereço pode ter mudado ou a página não está disponível. Volte ao início para continuar conhecendo o trabalho.</p><a href="${basePath}">Voltar ao início</a></main></body></html>`;

const privacyTemplatePath = path.join(root, 'scripts', 'privacidade.template.html');
const privacyPath = path.join(root, 'public', 'privacidade.html');
const privacyHtml = readFileSync(privacyTemplatePath, 'utf8').replaceAll('__SITE_URL__', siteUrl);
writeFileSync(privacyPath, privacyHtml);
writeFileSync(path.join(root, 'public', 'sitemap.xml'), sitemap);
writeFileSync(path.join(root, 'public', 'robots.txt'), robots);
writeFileSync(path.join(root, 'public', '404.html'), notFound);
console.log(`SEO básico gerado para ${siteUrl}/`);
