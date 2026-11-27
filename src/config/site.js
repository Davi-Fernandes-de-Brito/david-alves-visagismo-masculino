// Dados gerais do site e canais de contato.
const env = import.meta.env;
const fallbackSiteUrl = 'https://davi-fernandes-de-brito.github.io/david-alves-visagismo-masculino';

const normalizePhone = (value) => (value || '').replace(/\D/g, '') || null;
const address = 'R. Padre Valdevino, 2546 - Aldeota, Fortaleza - CE, 60135-041, Brasil';
// Número oficial do atendimento: +55 85 8710-2722.
const whatsappNumber = normalizePhone(env.VITE_WHATSAPP_NUMBER || '558587102722');

export const site = {
  name: 'David Alves',
  role: 'Visagismo masculino',
  description:
    'Visagismo masculino com uma abordagem que considera características individuais, intenção e identidade na construção da imagem.',
  year: new Date().getFullYear(),
  url: (env.VITE_SITE_URL || fallbackSiteUrl).replace(/\/+$/, ''),
  instagram: { handle: '@davidalvess_', url: 'https://www.instagram.com/davidalvess_/' },
  contact: {
    whatsapp: whatsappNumber,
    phoneDisplay: env.VITE_WHATSAPP_DISPLAY || '+55 85 8710-2722',
    email: env.VITE_CONTACT_EMAIL || null,
  },
  location: {
    address,
    display: 'R. Padre Valdevino, 2546 - Aldeota, Fortaleza - CE, 60135-041',
    streetAddress: 'R. Padre Valdevino, 2546',
    neighborhood: 'Aldeota',
    city: 'Fortaleza',
    region: 'CE',
    postalCode: '60135-041',
    country: 'BR',
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
  },
  hours: [
    { day: 'Segunda-feira', schemaDay: 'Monday', value: 'Fechado', opens: null, closes: null },
    { day: 'Terça-feira', schemaDay: 'Tuesday', value: '09:00–17:00', opens: '09:00', closes: '17:00' },
    { day: 'Quarta-feira', schemaDay: 'Wednesday', value: '09:00–17:00', opens: '09:00', closes: '17:00' },
    { day: 'Quinta-feira', schemaDay: 'Thursday', value: '09:00–19:00', opens: '09:00', closes: '19:00' },
    { day: 'Sexta-feira', schemaDay: 'Friday', value: '09:00–19:00', opens: '09:00', closes: '19:00' },
    { day: 'Sábado', schemaDay: 'Saturday', value: '09:00–19:00', opens: '09:00', closes: '19:00' },
    { day: 'Domingo', schemaDay: 'Sunday', value: 'Fechado', opens: null, closes: null },
  ],
};

export const nav = [
  { id: 'visao', label: 'Visão' },
  { id: 'visagismo', label: 'Visagismo' },
  { id: 'trabalhos', label: 'Trabalhos' },
  { id: 'servicos', label: 'Atendimento' },
  { id: 'processo', label: 'Processo' },
  { id: 'conteudo', label: 'Conteúdo' },
  { id: 'agendar', label: 'Contato' },
];
