import { Fragment } from 'react';
import { useInView } from '../../hooks/useMotion.js';

// Revela o texto palavra por palavra (máscara por linha, sem animar letras).
// `lines`: [{ text, em? }]  — cada item é uma linha lógica (em = itálico).
// `active`: força o gatilho (ex.: Hero após a intro). Sem `active`, dispara ao entrar na tela.
export default function SplitWords({ as: Tag = 'h2', lines, className = '', active, delay = 0, step = 70 }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const on = active === undefined ? inView : active;
  const full = lines.map((l) => l.text).join(' ');
  let i = 0;
  return (
    <Tag ref={ref} className={`split ${on ? 'is-in' : ''} ${className}`} aria-label={full}>
      {lines.map((line, li) => (
        <span key={li} className={`split__line ${line.em ? 'is-em' : ''}`} aria-hidden="true">
          {line.text.split(' ').map((w, wi) => (
            <Fragment key={wi}>
              <span className="split__mask">
                <span className="split__word" style={{ '--d': `${delay + step * i++}ms` }}>
                  {w}
                </span>
              </span>{' '}
            </Fragment>
          ))}
        </span>
      ))}
    </Tag>
  );
}
