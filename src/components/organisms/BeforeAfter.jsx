import { useRef, useState } from 'react';
import Picture from '../atoms/Picture.jsx';

// Comparador antes/depois: mouse, toque (pointer events) e teclado (input range acessível).
// `before` e `after` devem ser fotografias da MESMA pessoa, com autorização. Sem elas, mostra espaços reservados.
export default function BeforeAfter({ before, after, ratio = '4 / 5' }) {
  const [value, setValue] = useState(50);
  const boxRef = useRef(null);
  const dragging = useRef(false);

  const setFromX = (x) => {
    const r = boxRef.current.getBoundingClientRect();
    setValue(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100)));
  };
  const down = (e) => {
    dragging.current = true;
    boxRef.current.setPointerCapture(e.pointerId);
    setFromX(e.clientX);
  };
  const move = (e) => dragging.current && setFromX(e.clientX);
  const up = () => (dragging.current = false);

  const Layer = ({ image, label, tone }) =>
    image ? (
      <Picture image={image} sizes="(min-width: 900px) 40vw, 100vw" className="ba__img" />
    ) : (
      <div className={`ba__empty ba__empty--${tone}`} role="img" aria-label={`Espaço para fotografia: ${label}`} />
    );

  return (
    <div className="ba">
      <div
        ref={boxRef}
        className="ba__box"
        style={{ aspectRatio: ratio, '--v': `${value}%` }}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
      >
        <div className="ba__layer ba__layer--before">
          <Layer image={before} label="Antes" tone="a" />
        </div>
        <div className="ba__layer ba__layer--after" style={{ clipPath: `inset(0 0 0 ${value}%)` }}>
          <Layer image={after} label="Depois" tone="b" />
        </div>

        <span className="ba__chip ba__chip--l">Antes</span>
        <span className="ba__chip ba__chip--r">Depois</span>

        <span className="ba__handle" style={{ left: `${value}%` }} aria-hidden="true">
          <span className="ba__grip">
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 2 2 7l5 5M15 2l5 5-5 5" />
            </svg>
          </span>
        </span>

        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={Math.round(value)}
          onChange={(e) => setValue(Number(e.target.value))}
          className="ba__range"
          aria-label="Comparar antes e depois: arraste ou use as setas do teclado"
          aria-valuetext={`${Math.round(100 - value)}% depois, ${Math.round(value)}% antes`}
        />
      </div>
    </div>
  );
}
