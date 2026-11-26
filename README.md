# David Alves — Visagismo masculino

Site editorial desenvolvido com React e Vite. O projeto separa conteúdo, componentes, estilos e fotografias para facilitar a manutenção. A hospedagem planejada é a Vercel.

## Reels (seção Conteúdo)

Os cinco reels ficam na seção **Conteúdo** (id `conteudo`), logo abaixo do título. São vídeos próprios, sem áudio e em loop, e **já estão tocando quando a pessoa chega**: os arquivos começam a carregar assim que a página termina de abrir e a reprodução é iniciada por script. O vídeo **nunca pausa sozinho** (nem ao sair da tela, nem com "reduzir movimento" ligado no sistema). Ele só pausa quando o visitante clica uma vez; outro clique retoma. **Dois cliques (ou dois toques) abrem o link de redirecionamento do vídeo** em uma nova aba. Com o mouse, os cards têm uma leve inclinação.

Casos especiais: com "economia de dados" ou conexão lenta (2G/3G), os arquivos só carregam quando a seção está perto, para não gastar dados à toa. Se o navegador bloquear o início automático (por exemplo, celular em economia de energia), aparece a capa com o ícone de play e a primeira interação na página (toque, rolagem ou tecla) inicia os vídeos.

### Guia: mudar o link aberto com dois cliques

1. Abra o arquivo **`src/config/content.js`** e procure por `REELS DA SEÇÃO CONTEÚDO` (dentro de `export const content`).
2. Cada linha dentro de `reels: [ ... ]` é um vídeo, na ordem em que aparecem na tela (da esquerda para a direita):

   ```js
   { url: 'https://www.instagram.com/reel/DbsuQlIx_q6/', video: 'videos/reel-1.mp4', poster: 'images/reels/reel-1.jpg' },
   ```

3. Para mudar o destino do duplo clique, troque **somente o texto dentro das aspas de `url`** pelo novo link (Instagram, YouTube, site, WhatsApp etc.). Exemplo:

   ```js
   { url: 'https://www.instagram.com/reel/NOVO_CODIGO/', video: 'videos/reel-1.mp4', poster: 'images/reels/reel-1.jpg' },
   ```

   - O link precisa começar com `https://` e ficar entre aspas simples, com a vírgula no final da linha.
   - Não mexa em `video` e `poster` se o arquivo continua o mesmo.
4. Para **trocar o vídeo** de um card: coloque o novo MP4 em `public/videos/` (vertical 9:16, sem áudio, de preferência até ~8 MB), uma capa JPG em `public/images/reels/`, e ajuste `video` e `poster` na mesma linha (os caminhos são relativos à pasta `public`, sem a barra inicial).
5. Para **mudar a ordem**, troque as linhas de lugar. Para **adicionar ou remover** um vídeo, adicione ou apague uma linha completa (o layout foi pensado para 5; com outra quantidade, confira no navegador).
6. Salve, rode `npm run dev` para conferir (clique duas vezes no vídeo) e faça o deploy. O link também é usado pelo atalho de teclado/leitor de tela "Abrir vídeo N no Instagram".

Para mudar o texto de ajuda acima dos vídeos, edite `reelsNote` no mesmo arquivo. Ajustes de tempo do duplo clique: constante `DOUBLE_TAP_MS` em `src/components/organisms/Reels.jsx` (padrão 280 ms).

## Fotos da seção Trabalhos

Ficam em `public/images/trabalhos` e são listadas em `portraits` (`src/config/images.js`), com legenda e texto alternativo.

## Executar localmente

```bash
npm ci
cp .env.example .env
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

O resultado será criado na pasta `dist/`.

## Antes da publicação

1. **WhatsApp:** o número oficial é +55 85 8710-2722 (`https://wa.me/558587102722`) e já está configurado como padrão. Só use `VITE_WHATSAPP_NUMBER` e `VITE_WHATSAPP_DISPLAY` para sobrescrevê-lo.
2. **URL canônica:** a Vercel fornece `VERCEL_PROJECT_PRODUCTION_URL` para o domínio de produção. O projeto usa esse valor automaticamente quando as variáveis de sistema da Vercel estão habilitadas. Também é possível definir `VITE_SITE_URL` no ambiente Production para fixar a URL canônica.
3. **Google Search Console (opcional):** crie/verifique a propriedade do domínio depois do primeiro deploy. Se usar o método da meta tag, defina `VITE_GOOGLE_SITE_VERIFICATION` com o token fornecido pelo Search Console. Depois envie `https://SEU-DOMINIO/sitemap.xml`. A indexação não é imediata nem pode ser garantida pelo código.
4. **Google Analytics 4 (opcional):** crie uma propriedade GA4 e defina `VITE_GA_MEASUREMENT_ID` com o ID `G-...`. O código já exige consentimento antes de carregar a tag. O Analytics não está ativado nesta entrega porque nenhum ID foi fornecido.
5. **Domínio próprio:** não é necessário para publicar. A Vercel disponibiliza um subdomínio `vercel.app`; um domínio personalizado pode ser conectado depois.

Não coloque senhas, tokens privados ou chaves de serviço no código. Variáveis `VITE_` são incorporadas ao bundle do navegador e devem conter apenas valores públicos.

## Publicar no GitHub Pages

O projeto detecta sozinho o caminho do site. No GitHub Actions ele usa o nome do repositório (por exemplo, `https://usuario.github.io/nome-do-repositorio/`), então não é preciso editar nenhum arquivo ao trocar o nome do repositório. Se a tela ficar preta, quase sempre é caminho errado dos arquivos (erro 404 em `/assets/...`): confira se o deploy foi feito com este workflow.

1. Envie o conteúdo da pasta `david-alves-site` (incluindo a pasta oculta `.github`) para o repositório, na branch `main`.
2. No GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. A aba **Actions** executa o workflow `Deploy Vite site to GitHub Pages` a cada envio para `main`. Quando ficar verde, o site está no ar.
4. Se usar domínio próprio, defina `VITE_BASE_PATH=/` e `VITE_SITE_URL=https://seudominio.com.br` (em **Settings → Secrets and variables → Actions → Variables**, e repasse no workflow, ou em `.env.production`).

O GitHub Pages não aplica os cabeçalhos do `vercel.json`; se não for usar a Vercel, o arquivo pode ser apagado.

## Publicar na Vercel

1. Extraia o ZIP e envie o conteúdo da pasta `david-alves-site` para o repositório GitHub que será ligado à Vercel. Não envie `node_modules`, `dist` ou `.env`.
2. Na Vercel, selecione **Add New → Project** e importe o repositório.
3. Confirme o preset **Vite**, o comando de build `npm run build` e a pasta de saída `dist`.
4. Em **Settings → Environment Variables**, configure as variáveis opcionais necessárias. Habilite a exposição das variáveis de sistema para que o build use `VERCEL_PROJECT_PRODUCTION_URL` como URL canônica.
5. Faça o deploy de produção e confira `/`, `/privacidade.html`, `/404.html`, `/robots.txt` e `/sitemap.xml`.

## WhatsApp

Todos os botões de atendimento abrem `https://wa.me/558587102722?text=...` em nova aba, cada um com uma mensagem própria (Hero, menu, Serviços, Trabalhos, Contato, rodapé e botão flutuante). As mensagens ficam em `whatsappMessages` (`src/config/content.js`) e os links são montados por `src/utils/whatsapp.js`, com a codificação correta da URL. O formulário da seção Contato continua disponível: valida os campos e abre o WhatsApp com os dados preenchidos; nada é gravado em servidor.

## Botões "Solicitar atendimento" (WhatsApp)

Todas as seções têm um botão que abre o WhatsApp com uma mensagem própria: Hero, Visão, Visagismo, Trabalhos, Atendimento (Serviços), Processo, Conteúdo e Contato, além do menu, do rodapé e do botão flutuante. As mensagens ficam em `whatsappMessages` (`src/config/content.js`): para mudar o texto de uma seção, edite a frase correspondente (`hero`, `vision`, `practice`, `works`, `services`, `process`, `content`, `contact`, `header`, `floating`). O botão reutilizável é `src/components/molecules/WhatsAppCta.jsx`; o número está em `src/config/site.js`.

## Instagram

O perfil oficial é `https://www.instagram.com/davidalvess_/` (configurado em `src/config/site.js`). Links gerais levam ao perfil; cada reel leva à sua publicação original. O site não usa o embed do Instagram nem carrega scripts de terceiros por causa dele.

## Hospedagem, HTTPS e segurança

- O `vercel.json` define cabeçalhos de segurança: Content-Security-Policy, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy e X-Content-Type-Options.
- A Vercel disponibiliza HTTPS nos domínios de hospedagem. O redirecionamento e a URL canônica devem ser conferidos depois que o domínio de produção for atribuído.
- `404.html` fornece a página de erro para caminhos inexistentes.
- O `sitemap.xml` e o `robots.txt` são gerados no `prebuild` com a URL canônica disponível durante o build.

## Tratamento e diagnóstico de erros

- Um React Error Boundary impede que certos erros de renderização derrubem toda a interface sem mensagem.
- Erros globais e rejeições não tratadas são registrados no console para diagnóstico local.
- Se for necessário monitoramento remoto, configure uma ferramenta externa de observabilidade após criar a conta e fornecer as credenciais públicas apropriadas. Nenhum serviço de monitoramento remoto foi ativado nesta versão.

## Recursos incluídos

- Meta title e description, canonical, Open Graph, Twitter Card e dados estruturados Schema.org (`ProfessionalService` e `Person`).
- `sitemap.xml`, `robots.txt`, favicon, apple-touch-icon e página 404.
- Fotografias WebP otimizadas com `srcset`, dimensões intrínsecas e textos alternativos.
- Botões de atendimento com mensagens contextualizadas e botão flutuante do WhatsApp.
- Formulário com validação, consentimento e redirecionamento para WhatsApp.
- Cinco reels em vídeo na seção Conteúdo (já tocando, mudos, pausam só com um clique; duplo clique abre o link configurado).
- Botão "Solicitar atendimento" em todas as seções.
- Google Analytics 4 opcional, com consentimento e eventos sem dados pessoais.
- Endereço (Google Maps), telefone (WhatsApp) e horários na seção Contato; endereço no rodapé.
- Página de Política de Privacidade alinhada ao fluxo sem armazenamento.

## Onde editar

| O que deseja alterar | Arquivo / pasta |
|---|---|
| Textos das seções | `src/config/content.js` |
| Nome, Instagram, telefone, endereço e horário | `src/config/site.js` |
| Imagens e textos alternativos | `src/config/images.js` |
| Fotografias do site | `public/images/` |
| Imagem de compartilhamento | `public/og-david-alves.jpg` |
| Cores, fontes e espaçamentos | `src/styles/tokens.css` |
| Aparência das seções | `src/styles/organisms.css` e `src/styles/features.css` |
| Ordem das seções | `src/pages/HomePage.jsx` |
| Contato, formulário e horários | `src/components/organisms/Booking.jsx` e `src/config/site.js` |
| Mensagens do WhatsApp | `whatsappMessages` em `src/config/content.js` |
| Reels e link do duplo clique | `content.reels` em `src/config/content.js` (guia acima) e `src/components/organisms/Reels.jsx` |
| Botão flutuante | `src/components/organisms/WhatsAppFloat.jsx` |
| Analytics | `src/services/analytics.js` |
