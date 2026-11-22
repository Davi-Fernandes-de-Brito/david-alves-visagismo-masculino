import { useRef, useState } from 'react';
import { practice } from '../../config/content.js';
import { images } from '../../config/images.js';
import Picture from '../atoms/Picture.jsx';
import { useScrollLink } from '../../hooks/useMotion.js';

// Rolagem narrativa: a fotografia fica fixa e as cinco decisões evoluem ao lado.
// As marcas usam coordenadas do quadro 4:5 (viewBox 100 x 125) e estão posicionadas sobre o rosto
// da fotografia: contorno da cabeça, olhos (44/58, 38), linha do cabelo (~21), nariz (~48) e queixo (~66).
// São apenas marcas ilustrativas; não representam diagnóstico sobre a pessoa fotografada.
const overlays = [
  // 01 cantos de enquadramento ao redor do rosto
  <g key="1"><path d="M27 17V9H35M65 9H73V17M73 60V68H65M35 68H27V60" /></g>,
  // 02 eixo vertical e linha dos olhos (proporção)
  <g key="2"><path d="M22 38H78" /><path d="M50 8V70" className="dash" /><circle cx="44" cy="38" r="1.2" className="dot" /><circle cx="58" cy="38" r="1.2" className="dot" /></g>,
  // 03 contorno da cabeça (intenção)
  <g key="3"><ellipse cx="50" cy="39" rx="23" ry="30" /></g>,
  // 04 linhas de decisão: cabelo, olhos, nariz, queixo
  <g key="4"><path d="M18 21H82M18 38H82M18 48H82M18 66H82" /></g>,
  // 05 moldura final
  <g key="5"><rect x="10" y="6" width="80" height="108" /><rect x="14" y="10" width="72" height="100" className="thin" /></g>,
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
            <figure className="practice__figure" aria-label="Análise visual de visagismo, com marcas sobre o rosto">
              <div className="practice__photo">
                <div className="practice__zoom" style={{ '--zoom': 1.3 - p * 0.12 }}>
                  <Picture image={images.practiceFace} focus="50% 30%" sizes="(min-width: 900px) 34vw, 80vw" eager className="practice__img" />
                  <svg className="practice__svg" viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden="true">
                    {overlays.map((g, i) => (
                      <g key={i} className={`ov ${i === step ? 'is-on' : ''}`}>
                        {g}
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
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
