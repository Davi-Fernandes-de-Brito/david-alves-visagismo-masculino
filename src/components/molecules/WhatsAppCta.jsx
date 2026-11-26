import Reveal from '../atoms/Reveal.jsx';
import Button from '../atoms/Button.jsx';
import { whatsappProps } from '../../utils/whatsapp.js';

// Chamada padrão "Solicitar atendimento" que abre o WhatsApp com a mensagem da seção.
// Usada em todas as seções para que o visitante sempre tenha um caminho direto até o contato.
export default function WhatsAppCta({ source, message, children = 'Solicitar atendimento', variant = 'primary', className = '', delay = 0 }) {
  return (
    <Reveal className={`section-cta ${className}`} delay={delay}>
      <Button variant={variant} icon="arrow" {...whatsappProps(source, message)}>
        {children}
      </Button>
    </Reveal>
  );
}
