// Build de verificação sem Vite: empacota com esbuild (resolve JSX, CSS @import) e copia public/.
// Com acesso à rede, use `npm run build` (Vite). Este script existe só para validar o projeto offline.
import { createRequire } from 'node:module';
import { cpSync, mkdirSync, rmSync, writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// esbuild pode estar em node_modules local ou em /opt/npm-tools (ambiente offline).
const require = createRequire(import.meta.url);
let esbuildPath = 'esbuild';
try { require.resolve('esbuild'); } catch { esbuildPath = '/opt/npm-tools/node_modules/esbuild'; }
const { build } = require(esbuildPath);

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'dist-local');
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

await build({
  entryPoints: [path.join(root, 'src/main.jsx')],
  bundle: true,
  minify: true,
  format: 'esm',
  jsx: 'automatic',
  target: 'es2020',
  outfile: path.join(out, 'assets/app.js'),
  loader: { '.css': 'css' },
  nodePaths: process.env.NODE_PATH ? process.env.NODE_PATH.split(path.delimiter) : [],
  define: { 'process.env.NODE_ENV': '"production"' },
  logLevel: 'info',
});

cpSync(path.join(root, 'public'), out, { recursive: true });
const html = readFileSync(path.join(root, 'index.html'), 'utf8')
  .replace('<script type="module" src="/src/main.jsx"></script>', '<link rel="stylesheet" href="/assets/app.css" /><script type="module" src="/assets/app.js"></script>');
writeFileSync(path.join(out, 'index.html'), html);
console.log('dist-local pronto');
