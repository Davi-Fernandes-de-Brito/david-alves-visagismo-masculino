import { useEffect, useState } from 'react';
import { booking, services } from '../../config/content.js';
import { site } from '../../config/site.js';
import SectionHeading from '../molecules/SectionHeading.jsx';
import Reveal from '../atoms/Reveal.jsx';
import Field from '../atoms/Field.jsx';
import Button from '../atoms/Button.jsx';

const serviceOptions = [
  { value: '', label: 'Selecione' },
  ...services.items.filter((s) => s.confirmed).map((s) => ({ value: s.id, label: s.name })),
  { value: 'outro', label: 'Ainda não sei, quero conversar' },
];

export default function Booking() {
  const [data, setData] = useState({ name: '', contact: '', service: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | 'unavailable' | 'whatsapp'

  useEffect(() => {
    const on = (e) => {
      const id = e.detail;
      if (serviceOptions.some((o) => o.value === id)) setData((d) => ({ ...d, service: id }));
    };
    window.addEventListener('da:service', on);
    return () => window.removeEventListener('da:service', on);
  }, []);

  const change = (e) => setData((d) => ({ ...d, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!data.name.trim()) next.name = 'Informe seu nome.';
    if (!data.contact.trim()) next.contact = 'Informe um contato.';
    setErrors(next);
    if (Object.keys(next).length) return;

    const label = serviceOptions.find((o) => o.value === data.service)?.label;
    if (site.contact.whatsapp) {
      const text = encodeURIComponent(
        `Olá, David! Sou ${data.name}. ${label && data.service ? `Interesse: ${label}. ` : ''}${data.message}`.trim(),
      );
      window.open(`https://wa.me/${site.contact.whatsapp}?text=${text}`, '_blank', 'noopener');
      setStatus('whatsapp');
    } else {
      setStatus('unavailable');
    }
  };

  return (
    <section id="agendar" className="section booking theme-brown" aria-labelledby="agendar-title">
      <div className="container booking__grid">
        <div className="booking__intro">
          <SectionHeading
            eyebrow={booking.eyebrow}
            lines={[{ text: 'Vamos conversar sobre a imagem' }, { text: 'que você deseja construir?', em: true }]}
          />
          <h2 id="agendar-title" className="sr-only">
            {booking.title}
          </h2>
          <Reveal delay={120}>
            <p className="lead">{booking.text}</p>
          </Reveal>
        </div>

        <Reveal as="form" className="form" onSubmit={submit} noValidate delay={160}>
          <Field id="name" label={booking.fields.name} value={data.name} onChange={change} autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? 'err-name' : undefined} />
          {errors.name && <p className="form__err" id="err-name" role="alert">{errors.name}</p>}

          <Field id="contact" label={booking.fields.contact} value={data.contact} onChange={change} autoComplete="email" required aria-invalid={!!errors.contact} aria-describedby={errors.contact ? 'err-contact' : undefined} />
          {errors.contact && <p className="form__err" id="err-contact" role="alert">{errors.contact}</p>}

          <Field id="service" kind="select" label={booking.fields.service} value={data.service} onChange={change} options={serviceOptions} />
          <Field id="message" kind="textarea" label={booking.fields.message} value={data.message} onChange={change} />

          <div className="form__foot">
            <Button type="submit" icon="arrow">
              {booking.button}
            </Button>
          </div>

          <div className="form__status" role="status" aria-live="polite">
            {status === 'unavailable' && <p>Este formulário não está conectado. Para solicitar atendimento, entre em contato pelo Instagram.</p>}
            {status === 'whatsapp' && <p>Abrimos o WhatsApp com a sua mensagem.</p>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
