// Conteúdo editável do site. Informações provisórias e observações editoriais ficam apenas nos comentários.

export const hero = {
  eyebrow: 'Visagismo masculino',
  headline: ['Imagem não é apenas aparência.', 'É comunicação.'],
  lead: 'Uma abordagem de visagismo que considera características individuais, intenção e identidade na construção da imagem masculina.',
  ctaPrimary: { label: 'Conhecer meu trabalho', href: '#visao' },
  ctaSecondary: { label: 'Solicitar atendimento', href: '#agendar' },
};

export const vision = {
  title: 'Antes de definir uma imagem, é preciso compreender a pessoa.',
  paragraphs: [
    'O visagismo começa por uma pergunta que o espelho sozinho não responde: o que esta pessoa quer comunicar?',
    'Traços, proporções, cor e textura do cabelo entram na conversa, mas não decidem sozinhos. A imagem é construída a partir da intenção, e não imposta de fora.',
  ],
  caption: 'Em palestra',
  // Reservar espaço para uma apresentação biográfica quando o texto final for fornecido.
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
    // Novos serviços podem ser incluídos aqui quando nome e descrição forem definidos.
  ],
  cta: 'Solicitar informações',
};

export const process = {
  eyebrow: 'O processo',
  title: 'Como é um atendimento',
  // Etapas estruturadas como rascunho editorial; revisar com David antes da publicação final.
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
  // Para adicionar publicações, informe image, href e label em cada objeto.
  posts: [],
  slots: 4,
};

export const booking = {
  eyebrow: 'Contato',
  title: 'Vamos conversar sobre a imagem que você deseja construir?',
  text: 'Conheça as possibilidades de atendimento e encontre a melhor maneira de iniciar sua consultoria.',
  button: 'Solicitar atendimento',
  fields: { name: 'Nome', contact: 'Contato (WhatsApp ou e-mail)', service: 'Serviço de interesse', message: 'Mensagem' },
};
