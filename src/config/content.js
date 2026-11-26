// Conteúdo editável do site: textos, mensagens do WhatsApp e lista de reels.

export const hero = {
  eyebrow: 'Visagismo masculino',
  headline: ['Imagem não é apenas aparência.', 'É comunicação.'],
  lead: 'Uma abordagem de visagismo que considera características individuais, intenção e identidade na construção da imagem masculina.',
  ctaPrimary: { label: 'Conhecer meu trabalho', href: '#visao' },
  ctaSecondary: { label: 'Solicitar atendimento' }, // abre o WhatsApp (mensagem em `whatsappMessages.hero`)
};

// Mensagens iniciais enviadas ao WhatsApp, de acordo com a seção do botão.
export const whatsappMessages = {
  hero: 'Olá, David! Acessei seu site e gostaria de solicitar um atendimento. Poderia me passar mais informações?',
  header: 'Olá, David! Acessei seu site e gostaria de solicitar um atendimento.',
  floating: 'Olá, David! Acessei seu site e gostaria de saber mais sobre seus serviços.',
  services: 'Olá, David! Gostaria de saber mais sobre os seus serviços.',
  vision: 'Olá, David! Li sobre a sua visão de visagismo no site e gostaria de solicitar um atendimento.',
  practice: 'Olá, David! Conheci o visagismo na prática pelo seu site e gostaria de solicitar um atendimento.',
  works: 'Olá, David! Vi seus trabalhos no site e gostaria de conversar sobre um atendimento.',
  process: 'Olá, David! Vi como funciona o atendimento no seu site e gostaria de solicitar um atendimento.',
  content: 'Olá, David! Acompanhei seus vídeos no site e gostaria de solicitar um atendimento.',
  contact: 'Olá, David! Gostaria de entrar em contato com você.',
};

export const vision = {
  title: 'Antes de definir uma imagem, é preciso compreender a pessoa.',
  paragraphs: [
    'O visagismo começa por uma pergunta que o espelho sozinho não responde: o que esta pessoa quer comunicar?',
    'Traços, proporções, cor e textura do cabelo entram na conversa, mas não decidem sozinhos. A imagem é construída a partir da intenção, e não imposta de fora.',
  ],
  caption: 'Em palestra',
};

export const practice = {
  eyebrow: 'O visagismo na prática',
  title: 'Cinco decisões, uma só coerência.',
  steps: [
    { n: '01', title: 'Características individuais', text: 'O ponto de partida é o que já existe: traços, cor, textura e volume. Nenhum modelo vem de fora.' },
    { n: '02', title: 'Perfil e proporções', text: 'A relação entre as partes do rosto e da cabeça mostra onde um corte equilibra e onde chama atenção.' },
    { n: '03', title: 'Intenção de imagem', text: 'Trabalho, vida pessoal, uma nova fase. A intenção vem antes do corte e orienta todas as escolhas.' },
    { n: '04', title: 'Escolhas visuais', text: 'Comprimento, linha, textura, barba e acabamento. Cada escolha precisa ter uma razão que se explica em voz alta.' },
    { n: '05', title: 'Resultado coerente', text: 'O critério final não é a tendência do momento, mas se a imagem sustenta aquilo que a pessoa quer dizer.' },
  ],
};

export const works = {
  eyebrow: 'Análises e transformações',
  title: 'Trabalhos',
  intro: 'Cada análise considera características individuais, rotina e intenção para construir escolhas visuais coerentes com a pessoa.',
  compareTitle: 'Antes e depois',
  compareNote: 'Arraste o controle para visualizar a comparação entre as duas imagens.',
  cta: 'Conversar sobre um atendimento',
};

export const services = {
  eyebrow: 'Atendimento',
  title: 'Como posso ajudar',
  items: [
    {
      id: 'consultoria',
      name: 'Consultoria de visagismo',
      text: 'Uma conversa e uma análise para definir a imagem que faz sentido para você, antes de qualquer corte.',
      confirmed: true,
    },
    ],
  cta: 'Solicitar informações',
  ctaIntro: 'Quer saber como funciona o atendimento?',
};

export const process = {
  eyebrow: 'O processo',
  title: 'Como é um atendimento',
  steps: [
    { n: '01', title: 'Conversa', text: 'Quem você é, o que faz, o que quer comunicar.' },
    { n: '02', title: 'Compreensão das necessidades', text: 'Rotina, referências, o que incomoda e o que funciona hoje.' },
    { n: '03', title: 'Análise e direcionamento', text: 'Leitura das características individuais e definição do caminho visual.' },
    { n: '04', title: 'Execução da proposta', text: 'O trabalho feito com o direcionamento combinado.' },
  ],
};

export const content = {
  eyebrow: 'Conteúdo',
  title: 'No Instagram',
  text: 'Análises de visagismo, explicações, trabalhos e bastidores publicados no perfil.',
  cta: 'Ver perfil',
  handleLabel: 'Acompanhe no Instagram',
  reelsNote: 'Toque uma vez para pausar. Toque duas vezes para abrir o reel no Instagram.',
  // REELS DA SEÇÃO CONTEÚDO
  // url   = para onde o visitante vai ao clicar DUAS vezes no vídeo (troque aqui para mudar o redirecionamento).
  // video = arquivo de vídeo dentro de public/ (public/videos/reel-N.mp4).
  // poster = imagem de capa dentro de public/ (mostrada antes do vídeo carregar).
  reels: [
    { url: 'https://www.instagram.com/reel/DbsuQlIx_q6/', video: 'videos/reel-1.mp4', poster: 'images/reels/reel-1.jpg' },
    { url: 'https://www.instagram.com/reels/DeatCAvRwQg/', video: 'videos/reel-2.mp4', poster: 'images/reels/reel-2.jpg' },
    { url: 'https://www.instagram.com/reel/DdugiR1xipO/', video: 'videos/reel-3.mp4', poster: 'images/reels/reel-3.jpg' },
    { url: 'https://www.instagram.com/reels/DdbyXV-R0fn/', video: 'videos/reel-4.mp4', poster: 'images/reels/reel-4.jpg' },
    { url: 'https://www.instagram.com/reels/Dav-yuvxt0h/', video: 'videos/reel-5.mp4', poster: 'images/reels/reel-5.jpg' },
  ],
};

export const booking = {
  eyebrow: 'Contato',
  title: 'Vamos conversar sobre a imagem que você deseja construir?',
  text: 'Conheça as possibilidades de atendimento e inicie uma conversa diretamente pelo WhatsApp.',
  button: 'Solicitar atendimento',
  direct: 'Falar direto no WhatsApp',
  infoTitle: 'Onde me encontrar',
  fields: { name: 'Nome', contact: 'Contato (WhatsApp ou e-mail)', service: 'Serviço de interesse', message: 'Mensagem' },
};
