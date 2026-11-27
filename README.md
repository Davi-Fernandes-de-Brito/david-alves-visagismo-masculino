# David Alves — Visagismo masculino

Site institucional desenvolvido com React e Vite. O projeto separa conteúdo, componentes, estilos e fotografias para facilitar a manutenção. A publicação prevista é pelo **GitHub Pages**, usando GitHub Actions.

## Executar localmente

```bash
npm ci
cp .env.example .env
npm run dev
```

Para gerar e conferir a versão de produção:

```bash
npm run build
npm run preview
```

O resultado será criado na pasta `dist/`.

## Antes da publicação

- **WhatsApp:** o número oficial é +55 85 8710-2722 e já está configurado como padrão. Para substituí-lo, use `VITE_WHATSAPP_NUMBER` e, opcionalmente, `VITE_WHATSAPP_DISPLAY`.
- **URL canônica:** `VITE_SITE_URL` permite definir o domínio público usado nos metadados, no sitemap e no robots.txt. No GitHub Actions, o endereço do GitHub Pages é detectado automaticamente.
- **Google Search Console (opcional):** para verificar o domínio por meta tag, defina `VITE_GOOGLE_SITE_VERIFICATION` com o token fornecido pelo Search Console. Depois envie o sitemap do domínio publicado.
- **Domínio próprio:** configure `VITE_BASE_PATH=/` e `VITE_SITE_URL=https://seudominio.com.br` nas variáveis do workflow.

Não coloque senhas, tokens privados ou chaves de serviço no código. Variáveis `VITE_` são incorporadas ao bundle do navegador e devem conter apenas valores públicos.

## Publicar no GitHub Pages

1. Envie o conteúdo da pasta `david-alves-site` (incluindo a pasta oculta `.github`) para o repositório, na branch `main`.
2. No GitHub, abra **Settings → Pages → Build and deployment** e selecione **GitHub Actions** como origem.
3. A aba **Actions** executa o workflow `Deploy Vite site to GitHub Pages` a cada envio para `main`.
4. Quando a execução ficar verde, confira a página inicial, `/privacidade.html`, `/404.html`, `/robots.txt` e `/sitemap.xml`.

## Reels (seção Conteúdo)

Os cinco vídeos ficam na seção **Conteúdo**. São arquivos locais, sem áudio e em loop. Um clique pausa ou retoma; dois cliques ou dois toques abrem a publicação original em uma nova aba. Com o mouse, os cards recebem uma inclinação discreta.

Para alterar os links, edite `content.reels` em `src/config/content.js`. Para trocar um vídeo, coloque o MP4 em `public/videos/`, a capa em `public/images/reels/` e atualize os campos `video` e `poster`. Os caminhos são relativos à pasta `public`.

## WhatsApp e formulário

Os botões do site abrem o WhatsApp com mensagens contextualizadas, definidas em `whatsappMessages` (`src/config/content.js`). O formulário solicita nome, número de WhatsApp com DDD, serviço de interesse e uma mensagem opcional. O número informado é validado, mas não é repetido no texto enviado, pois o próprio WhatsApp identifica quem iniciou a conversa.

A mensagem é apenas preparada no navegador. A pessoa pode revisá-la e precisa confirmar o envio dentro do WhatsApp. O site não mantém banco de dados de contatos nem envia os dados para um servidor.

## Política de Privacidade

O texto-fonte fica em `scripts/privacidade.template.html`. Durante o build, `scripts/generate-seo.mjs` gera `public/privacidade.html`, além de `sitemap.xml`, `robots.txt` e `404.html`.

## Onde editar

| O que deseja alterar | Arquivo / pasta |
|---|---|
| Textos das seções e mensagens do WhatsApp | `src/config/content.js` |
| Nome, Instagram, WhatsApp, endereço e horários | `src/config/site.js` |
| Imagens e textos alternativos | `src/config/images.js` |
| Fotografias do site | `public/images/` |
| Vídeos da seção Conteúdo | `public/videos/` |
| Cores, fontes e espaçamentos | `src/styles/tokens.css` |
| Aparência e animações | `src/styles/organisms.css`, `src/styles/features.css` e `src/styles/atoms.css` |
| Ordem das seções | `src/pages/HomePage.jsx` |
| Formulário e horários | `src/components/organisms/Booking.jsx` e `src/config/site.js` |
| Política de Privacidade | `scripts/privacidade.template.html` |
