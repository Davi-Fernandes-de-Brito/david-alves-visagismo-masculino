import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolveSite } from './scripts/site-env.mjs';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Caminho base e URL do site são detectados automaticamente (GitHub Pages, Vercel ou local).
  const { base, siteUrl, productionDomain } = resolveSite({ ...env, ...process.env });
  const businessPhone = (env.VITE_WHATSAPP_NUMBER || process.env.VITE_WHATSAPP_NUMBER || '558587102722').replace(/[^0-9]/g, '');

  const siteMetadataPlugin = {
    name: 'david-alves-site-metadata',
    transformIndexHtml(html) {
      let output = html
        .replaceAll('__SITE_URL__', siteUrl)
        .replaceAll('__OG_IMAGE_URL__', `${siteUrl}/og-david-alves.jpg`)
        .replaceAll('__BUSINESS_PHONE__', businessPhone.startsWith('55') ? `+${businessPhone}` : `+55${businessPhone}`);

      if (env.VITE_GOOGLE_SITE_VERIFICATION) {
        const token = String(env.VITE_GOOGLE_SITE_VERIFICATION).replace(/["<>]/g, '');
        output = output.replace('</head>', `  <meta name="google-site-verification" content="${token}" />\n  </head>`);
      }
      return output;
    },
  };

  return {
    base,
    plugins: [react(), siteMetadataPlugin],
    define: {
      'import.meta.env.VITE_SITE_URL': JSON.stringify(siteUrl),
      'import.meta.env.VITE_VERCEL_PROJECT_PRODUCTION_URL': JSON.stringify(productionDomain),
    },
    build: { target: 'es2020' },
  };
});
