import { site } from '../config/site.js';
import { trackEvent } from '../services/analytics.js';

// Link oficial do WhatsApp (https://wa.me/<número>) com a mensagem já codificada para URL.
export function whatsappUrl(message) {
  const base = `https://wa.me/${site.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// Propriedades prontas para <a> e <Button>: abre em nova aba e registra a origem do clique.
export function whatsappProps(source, message) {
  return {
    href: whatsappUrl(message),
    target: '_blank',
    rel: 'noopener noreferrer',
    onClick: () => trackEvent('whatsapp_contact_open', { source }),
  };
}
