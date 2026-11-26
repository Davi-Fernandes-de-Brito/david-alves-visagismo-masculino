import { useMemo, useState } from 'react';
import { booking, services, whatsappMessages } from '../../config/content.js';
import { site } from '../../config/site.js';
import { trackEvent } from '../../services/analytics.js';
import { whatsappProps, whatsappUrl } from '../../utils/whatsapp.js';
import SectionHeading from '../molecules/SectionHeading.jsx';
import Reveal from '../atoms/Reveal.jsx';
import Field from '../atoms/Field.jsx';
import Button from '../atoms/Button.jsx';
import { WhatsAppIcon } from '../atoms/Icon.jsx';

const serviceOptions = [
  { value: '', label: 'Selecione' },
  ...services.items.filter((s) => s.confirmed).map((s) => ({ value: s.id, label: s.name })),
  { value: 'outro', label: 'Ainda não sei, quero conversar' },
];

// Dia da semana em Fortaleza, para destacar a linha de "Hoje" na tabela de horários.
function useTodayKey() {
  return useMemo(() => {
    try {
      return new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: 'America/Fortaleza' }).format(new Date());
    } catch {
      return null;
    }
  }, []);
}

export default function Booking() {
  const today = useTodayKey();
  const [data, setData] = useState({ name: '', contact: '', service: '', message: '' });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const change = (e) => {
    setData((d) => ({ ...d, [e.target.name]: e.target.value }));
    setErrors((current) => ({ ...current, [e.target.name]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (sending) return;

    const next = {};
    if (!data.name.trim()) next.name = 'Informe seu nome.';
    if (!data.contact.trim()) next.contact = 'Informe um WhatsApp ou e-mail para retorno.';
    if (!consent) next.consent = 'Autorize a abertura do WhatsApp com os dados preenchidos.';
    setErrors(next);
    if (Object.keys(next).length) return;

    setSending(true);
    setStatus('opening-whatsapp');
    const label = serviceOptions.find((o) => o.value === data.service)?.label;
    trackEvent('lead_form_submit', { service: data.service || 'not_selected' });

    const message = [
      `Olá, David! Sou ${data.name}.`,
      `Meu contato: ${data.contact}.`,
      data.service ? `Tenho interesse em: ${label || data.service}.` : '',
      data.message.trim() ? `Mensagem: ${data.message.trim()}` : '',
    ].filter(Boolean).join('\n');
    trackEvent('whatsapp_contact_open', { source: 'booking_form' });
    // Abre em nova aba (com noopener o retorno é sempre nulo, por isso não há fallback na mesma aba).
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
    setSending(false);
    setStatus('opened-whatsapp');
  };

  return (
    <section id="agendar" className="section booking theme-brown" aria-labelledby="agendar-title">
      <div className="container booking__grid">
        <div className="booking__intro">
          <SectionHeading
            eyebrow={booking.eyebrow}
            lines={[{ text: 'Vamos conversar sobre a imagem' }, { text: 'que você deseja construir?', em: true }]}
          />
          <h2 id="agendar-title" className="sr-only">{booking.title}</h2>
          <Reveal delay={120}>
            <p className="lead">{booking.text}</p>
          </Reveal>

          <Reveal delay={200} className="booking__info">
            <h3 className="booking__info-title">{booking.infoTitle}</h3>
            <address className="booking__address">
              <a href={site.location.mapsUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('maps_open', { source: 'contact' })}>
                {site.location.display}
                <span className="booking__maps">Abrir no Google Maps ↗</span>
              </a>
            </address>
            <a className="booking__phone" {...whatsappProps('contact_phone', whatsappMessages.contact)}>
              <WhatsAppIcon size={18} />
              <span>{site.contact.phoneDisplay}</span>
            </a>
            <dl className="booking__hours" aria-label="Horário de funcionamento">
              {site.hours.map((item) => (
                <div key={item.schemaDay} className={`${item.opens ? '' : 'is-closed'} ${item.schemaDay === today ? 'is-today' : ''}`}>
                  <dt>{item.day}{item.schemaDay === today && <span className="booking__today">Hoje</span>}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal as="form" className="form" onSubmit={submit} noValidate delay={160}>
          <Field id="name" label={booking.fields.name} value={data.name} onChange={change} autoComplete="name" maxLength={120} required aria-invalid={!!errors.name} aria-describedby={errors.name ? 'err-name' : undefined} />
          {errors.name && <p className="form__err" id="err-name" role="alert">{errors.name}</p>}

          <Field id="contact" label={booking.fields.contact} value={data.contact} onChange={change} autoComplete="email" maxLength={160} required aria-invalid={!!errors.contact} aria-describedby={errors.contact ? 'err-contact' : undefined} />
          {errors.contact && <p className="form__err" id="err-contact" role="alert">{errors.contact}</p>}

          <Field id="service" kind="select" label={booking.fields.service} value={data.service} onChange={change} options={serviceOptions} />
          <Field id="message" kind="textarea" label={booking.fields.message} value={data.message} onChange={change} maxLength={2000} />

          <div className="form__consent">
            <label htmlFor="lead-consent">
              <input
                id="lead-consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  setErrors((current) => ({ ...current, consent: undefined }));
                }}
                aria-invalid={!!errors.consent}
                aria-describedby={errors.consent ? 'err-consent' : 'consent-help'}
              />
              <span>Autorizo abrir o WhatsApp com os dados acima já preenchidos para iniciar o atendimento. Ainda poderei revisar e enviar a mensagem no WhatsApp. Consulte a <a href={`${import.meta.env.BASE_URL}privacidade.html`} target="_blank" rel="noopener noreferrer">Política de Privacidade</a>.</span>
            </label>
            <p id="consent-help" className="form__note">O site não armazena os dados. A mensagem só será enviada depois que você confirmar no WhatsApp.</p>
            {errors.consent && <p className="form__err" id="err-consent" role="alert">{errors.consent}</p>}
          </div>

          <div className="form__foot">
            <Button type="submit" icon="arrow" disabled={sending} aria-busy={sending}>
              {sending ? 'Abrindo...' : booking.button}
            </Button>
            <Button variant="ghost" icon={null} {...whatsappProps('contact_direct', whatsappMessages.contact)}>
              {booking.direct}
            </Button>
          </div>

          <div className="form__status" role="status" aria-live="polite">
            {status === 'opening-whatsapp' && <p>Abrindo o WhatsApp com sua mensagem...</p>}
            {status === 'opened-whatsapp' && <p>WhatsApp aberto. Revise e envie a mensagem por lá.</p>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
