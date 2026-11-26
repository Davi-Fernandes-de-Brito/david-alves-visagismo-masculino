// Inventário central das fotografias usadas no site.
const BASE = import.meta.env.BASE_URL;
// Para trocar uma imagem, substitua os arquivos correspondentes em public/images.
const img = (folder, name, w, h, alt, focus = '50% 50%') => ({
  name,
  width: w,
  height: h,
  alt,
  focus,
  src: `${BASE}images/${folder}/${name}-1600.webp`,
  srcSet: `${BASE}images/${folder}/${name}-800.webp 800w, ${BASE}images/${folder}/${name}-1600.webp 1600w`,
});

const uploadedImg = (folder, name, w, h, alt, focus = '50% 50%') => ({
  name,
  width: w,
  height: h,
  alt,
  focus,
  src: `${BASE}images/${folder}/${name}-full.webp`,
  srcSet: `${BASE}images/${folder}/${name}-800.webp 800w, ${BASE}images/${folder}/${name}-full.webp ${w}w`,
});

export const images = {
  hero: uploadedImg(
    'hero',
    'hero-david-alves',
    1080,
    1080,
    'David Alves sentado no estúdio, usando camisa escura e óculos',
    '50% 25%',
  ),
  beforeAfterBefore: uploadedImg(
    'comparativo',
    'antes-camisa-preta',
    853,
    1066,
    'Retrato inicial do comparativo, com camisa preta e fundo cinza',
    '50% 30%',
  ),
  beforeAfterAfter: uploadedImg(
    'comparativo',
    'depois-camisa-cinza',
    1638,
    2048,
    'Retrato final do comparativo, com camisa cinza em ambiente iluminado',
    '50% 30%',
  ),
  // Fotografia da seção Visagismo (rolagem narrativa).
  practiceFace: uploadedImg(
    'visagismo',
    'retrato-polo-cinza',
    1121,
    1403,
    'Retrato de homem de cabelo grisalho e barba grisalha, com camisa polo cinza, em ambiente claro',
    '50% 30%',
  ),
  // Fotografia da seção "A visão de David".
  vision: uploadedImg(
    'palestras',
    'david-alves-palestra-cabelinho-pra-tras',
    952,
    1269,
    'David Alves em palestra, com o microfone na mão, ao lado de um telão com a frase "Visagismo não é cabelinho pra trás."',
    '50% 20%',
  ),
  stageName: img(
    'palestras',
    'david-alves-palestra-tela-nome',
    1536,
    2048,
    'David Alves segurando um microfone em palestra, com seu nome projetado no telão',
    '60% 50%',
  ),
  // Mantida no inventário para uso editorial futuro; não aparece na seção Serviços.
  stageSlide: img(
    'palestras',
    'david-alves-palestra-slide-visagismo',
    1536,
    2048,
    'David Alves em palestra ao lado de um slide sobre visagismo',
    '35% 40%',
  ),
};

// Adicione aqui apenas fotografias com nome descritivo, contexto e autorização de uso confirmados.
const work = (n, alt, focus) => ({
  name: `trabalho-${n}`,
  width: 1600,
  height: 2000,
  alt,
  focus,
  src: `${BASE}images/trabalhos/trabalho-${n}-1600.webp`,
  srcSet: `${BASE}images/trabalhos/trabalho-${n}-800.webp 800w, ${BASE}images/trabalhos/trabalho-${n}-1600.webp 1600w`,
});

export const portraits = [
  { ...work('01', 'Retrato de homem de cabelo escuro e barba cheia, com camisa verde-acinzentada, após atendimento de visagismo', '50% 28%'), caption: 'Barba e cabelo alinhados' },
  { ...work('02', 'Retrato de homem de cabelo grisalho curto e barba aparada, com camisa polo azul-marinho', '50% 28%'), caption: 'Grisalho com naturalidade' },
  { ...work('03', 'Retrato sorridente de homem de cabelo penteado para trás e barba curta, com camisa polo clara', '50% 30%'), caption: 'Estrutura e acabamento' },
  { ...work('04', 'David Alves finalizando o cabelo de um cliente com spray, em estúdio com espelhos iluminados', '45% 35%'), caption: 'Bastidores do atendimento' },
];
