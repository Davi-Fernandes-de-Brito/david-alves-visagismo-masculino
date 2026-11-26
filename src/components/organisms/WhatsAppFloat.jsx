import { whatsappMessages } from '../../config/content.js';
import { whatsappProps } from '../../utils/whatsapp.js';
import { WhatsAppIcon } from '../atoms/Icon.jsx';

// Botão fixo no canto inferior direito. Aparece depois da intro, com entrada suave.
export default function WhatsAppFloat({ ready }) {
  return (
    <a
      className={`wa-float ${ready ? 'is-ready' : ''}`}
      aria-label="Falar com David Alves no WhatsApp"
      {...whatsappProps('floating_button', whatsappMessages.floating)}
    >
      <span className="wa-float__label" aria-hidden="true">Fale no WhatsApp</span>
      <span className="wa-float__btn">
        <WhatsAppIcon size={26} />
      </span>
    </a>
  );
}
