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
export const portraits = [];
