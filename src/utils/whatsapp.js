import { site } from '../config/site.js';

// Link oficial do WhatsApp (https://wa.me/<número>) com a mensagem codificada para URL.
export function whatsappUrl(message) {
  const base = `https://wa.me/${site.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// Propriedades reutilizáveis para links e botões de atendimento.
export function whatsappProps(_source, message) {
  return {
    href: whatsappUrl(message),
    target: '_blank',
    rel: 'noopener noreferrer',
  };
}
