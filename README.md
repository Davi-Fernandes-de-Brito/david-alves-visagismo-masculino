# David Alves — Visagismo masculino

Site editorial desenvolvido com React e Vite. O projeto separa conteúdo, componentes, estilos e fotografias para facilitar a manutenção manual.

## Executar localmente

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
```

O resultado será criado na pasta `dist/`.

## Estrutura do projeto

```text
public/
  images/
    hero/          # Foto principal
    comparativo/   # Fotos Antes e Depois
    palestras/     # Fotos de palestras
scripts/           # Utilitários para preparar imagens
src/
  components/
    atoms/         # Botões, ícones, imagens e elementos básicos
    molecules/     # Elementos compostos, títulos e molduras de imagem
    organisms/     # Seções completas do site
    templates/     # Estrutura geral da página
  config/          # Textos, imagens, navegação e movimento
  hooks/           # Lógica reutilizável do React
  pages/           # Páginas
  styles/          # CSS global e CSS das seções
```

## Onde editar

| O que deseja alterar | Arquivo / pasta |
|---|---|
| Textos das seções | `src/config/content.js` |
| Nome, Instagram e contato | `src/config/site.js` |
| Imagens e textos alternativos | `src/config/images.js` |
| Fotografias do site | `public/images/` |
| Cores, fontes e espaçamentos | `src/styles/tokens.css` |
| Aparência das seções | `src/styles/organisms.css` |
| Aparência de botões e molduras | `src/styles/atoms.css` e `src/styles/molecules.css` |
| Ordem das seções | `src/pages/HomePage.jsx` |

## Imagens atuais

| Seção | Pasta | Arquivos |
|---|---|---|
| Hero | `public/images/hero/` | `hero-david-alves-800.webp` e `hero-david-alves-full.webp` |
| Antes | `public/images/comparativo/` | `antes-camisa-preta-800.webp` e `antes-camisa-preta-full.webp` |
| Depois | `public/images/comparativo/` | `depois-camisa-cinza-800.webp` e `depois-camisa-cinza-full.webp` |
| Visão / Processo | `public/images/palestras/` | `david-alves-palestra-tela-nome-800.webp` e `-1600.webp` |
| Palestra sobre visagismo | `public/images/palestras/` | `david-alves-palestra-slide-visagismo-800.webp` e `-1600.webp` |

Os lugares da galeria, de Visagismo na prática e do Instagram que ainda não têm uma fotografia exibem molduras neutras sem texto. Os retratos sem identificação foram retirados da galeria e do inventário.

A seção Serviços está propositalmente sem fotografias. Para adicionar novas imagens à galeria, use nomes descritivos, cadastre os metadados em `src/config/images.js` e inclua os itens em `portraits` somente depois de confirmar identificação, contexto e autorização de uso.

## Contatos

O Instagram está configurado em `src/config/site.js`. O WhatsApp e o e-mail ainda não possuem valores no projeto. Quando o número de WhatsApp for definido, preencha `site.contact.whatsapp` no formato internacional, sem `+` ou espaços; o formulário passará a abrir uma conversa com a mensagem preenchida. Até lá, o formulário informa ao visitante que o envio não está conectado.

## Preparar imagens de palestra

O script `scripts/prepare-images.cjs` gera as versões WebP das duas fotografias de palestra. Informe como argumento a pasta onde estão `IMG_7122.jpeg` e `IMG_7123.jpeg`:

```bash
node scripts/prepare-images.cjs ./originais
```

As fotografias do Hero e do comparativo já estão otimizadas e armazenadas em suas pastas.
