import { useRef, useState } from 'react';
import { practice } from '../../config/content.js';
import PhotoPlaceholder from '../molecules/PhotoPlaceholder.jsx';
import { useScrollLink } from '../../hooks/useMotion.js';

// Rolagem narrativa: a fotografia fica fixa e as cinco decisões evoluem ao lado.
// Cada passo muda apenas as marcas gráficas sobre a imagem — nenhuma análise é feita sobre a pessoa fotografada.
const overlays = [
  // 01 cantos de enquadramento
  <g key="1"><path d="M14 20v-6h6M80 14h6v6M86 98v6h-6M20 104h-6v-6" /></g>,
  // 02 grade e eixo
  <g key="2"><path d="M38 12v96M62 12v96M12 44h76M12 76h76" /><path d="M50 12v96" className="dash" /></g>,
  // 03 círculo de intenção
  <g key="3"><circle cx="50" cy="52" r="32" /><circle cx="50" cy="52" r="1.2" className="dot" /></g>,
  // 04 linhas de decisão
  <g key="4"><path d="M16 30h68M16 52h68M16 74h68M16 96h68" /></g>,
  // 05 moldura final
  <g key="5"><rect x="12" y="12" width="76" height="96" /><rect x="17" y="17" width="66" height="86" className="thin" /></g>,
];

export default function Practice() {
  const trackRef = useRef(null);
  const [step, setStep] = useState(0);
  const [p, setP] = useState(0);
  const n = practice.steps.length;

  useScrollLink(trackRef, 'sticky', (v) => {
    setP(v);
    setStep(Math.min(n - 1, Math.floor(v * n)));
  });

  const cur = practice.steps[step];
  return (
    <section id="visagismo" className="practice theme-brown" aria-labelledby="visagismo-title">
      <div className="practice__track" ref={trackRef} style={{ '--steps': n }}>
        <div className="practice__stage">
          <div className="practice__head container">
            <span className="eyebrow">{practice.eyebrow}</span>
          </div>

          <div className="practice__grid container">
            <figure className="practice__figure" aria-label="Análise visual de visagismo">
              <div className="practice__photo" style={{ '--zoom': 1.62 - p * 0.22 }}>
                <PhotoPlaceholder slot="visagismo-pratica" label="Área de fotografia da seção de visagismo" ratio="4 / 5" className="practice__placeholder" />
              </div>
              <svg className="practice__svg" viewBox="0 0 100 125" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                {overlays.map((g, i) => (
                  <g key={i} className={`ov ${i === step ? 'is-on' : ''}`}>
                    {g}
                  </g>
                ))}
              </svg>
              <figcaption className="practice__tag">
                <span>{cur.n}</span>
                <span>{cur.title}</span>
              </figcaption>
            </figure>

            <div className="practice__copy">
              <h2 id="visagismo-title" className="h2 practice__title">
                {practice.title}
              </h2>

              <div className="practice__live" aria-live="polite">
                <span className="practice__n">{cur.n}</span>
                <h3 className="h3" key={cur.n}>
                  {cur.title}
                </h3>
                <p key={`t${cur.n}`}>{cur.text}</p>
              </div>

              <ol className="practice__list">
                {practice.steps.map((s, i) => (
                  <li key={s.n} className={i === step ? 'is-on' : i < step ? 'is-done' : ''}>
                    <span>{s.n}</span>
                    <span>{s.title}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="practice__bar" aria-hidden="true">
            <span style={{ transform: `scaleX(${p})` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
