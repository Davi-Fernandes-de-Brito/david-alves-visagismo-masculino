import { useRef, useState } from 'react';
import { process as proc } from '../../config/content.js';
import { images } from '../../config/images.js';
import WhatsAppCta from '../molecules/WhatsAppCta.jsx';
import { whatsappMessages } from '../../config/content.js';
import SectionHeading from '../molecules/SectionHeading.jsx';
import MaskedImage from '../molecules/MaskedImage.jsx';
import { useScrollLink, useInView } from '../../hooks/useMotion.js';

function Step({ s }) {
  const [ref, inView] = useInView({ threshold: 0.55, rootMargin: '0px 0px -15% 0px' });
  return (
    <li ref={ref} className={`proc__step ${inView ? 'is-in' : ''}`}>
      <span className="proc__n">{s.n}</span>
      <div>
        <h3 className="h3">{s.title}</h3>
        <p>{s.text}</p>
      </div>
    </li>
  );
}

export default function Process() {
  const listRef = useRef(null);
  const [p, setP] = useState(0);
  // progresso do início da lista até o fim, em 'through' ajustado para preencher a linha
  useScrollLink(listRef, 'through', (v) => setP(Math.min(1, Math.max(0, (v - 0.25) / 0.5))));

  return (
    <section id="processo" className="section process theme-sand" aria-labelledby="processo-title">
      <div className="container process__grid">
        <div className="process__media">
          <MaskedImage image={images.stageName} ratio="1 / 1" direction="right" focus="66% 58%" sizes="(min-width: 900px) 34vw, 100vw" />
        </div>
        <div className="process__text">
          <SectionHeading eyebrow={proc.eyebrow} lines={[{ text: 'Como é um' }, { text: 'atendimento.', em: true }]} />
          <span id="processo-title" className="sr-only">
            {proc.title}
          </span>
          <div className="proc" ref={listRef}>
            <span className="proc__line" aria-hidden="true">
              <span style={{ transform: `scaleY(${p})` }} />
            </span>
            <ol className="proc__list">
              {proc.steps.map((s) => (
                <Step key={s.n} s={s} />
              ))}
            </ol>
          </div>
          <WhatsAppCta source="process" message={whatsappMessages.process} />
        </div>
      </div>
    </section>
  );
}
