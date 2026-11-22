import { useRef } from 'react';
import Picture from '../atoms/Picture.jsx';

// Comparador antes/depois: mouse, toque (pointer events) e teclado (input range acessível).
// `before` e `after` devem ser fotografias da MESMA pessoa, com autorização. Sem elas, mostra espaços reservados.
//
// Correção do "pisca-pisca" no celular:
// - as camadas não são mais componentes criados a cada render (isso remontava as <img> a cada movimento);
// - a posição é gravada direto numa variável CSS (--v), sem re-render do React durante o arraste;
// - as duas fotos carregam de imediato (eager + decoding sync) e ficam promovidas a camada própria.
function renderLayer(image, label, tone) {
  return image ? (
    <Picture
      image={image}
      sizes="(min-width: 900px) 40vw, 100vw"
      className="ba__img"
      eager
      loading="eager"
      decoding="sync"
      draggable={false}
    />
  ) : (
    <div className={`ba__empty ba__empty--${tone}`} role="img" aria-label={`Espaço para fotografia: ${label}`} />
  );
}

export default function BeforeAfter({ before, after, ratio = '4 / 5' }) {
  const boxRef = useRef(null);
  const rangeRef = useRef(null);
  const valueRef = useRef(50);
  const dragging = useRef(false);

  const apply = (v) => {
    const value = Math.min(100, Math.max(0, v));
    valueRef.current = value;
    const box = boxRef.current;
    if (box) box.style.setProperty('--v', `${value}%`);
    const range = rangeRef.current;
    if (range) {
      range.value = String(Math.round(value));
      range.setAttribute('aria-valuetext', `${Math.round(100 - value)}% depois, ${Math.round(value)}% antes`);
    }
  };

  const setFromX = (x) => {
    const r = boxRef.current.getBoundingClientRect();
    apply(((x - r.left) / r.width) * 100);
  };

  const down = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    dragging.current = true;
    try {
      boxRef.current.setPointerCapture(e.pointerId);
    } catch {
      /* captura indisponível: segue sem ela */
    }
    setFromX(e.clientX);
  };
  const move = (e) => {
    if (dragging.current) setFromX(e.clientX);
  };
  const up = (e) => {
    dragging.current = false;
    try {
      boxRef.current.releasePointerCapture(e.pointerId);
    } catch {
      /* já liberada */
    }
  };

  return (
    <div className="ba">
      <div
        ref={boxRef}
        className="ba__box"
        style={{ aspectRatio: ratio, '--v': '50%' }}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onLostPointerCapture={() => {
          dragging.current = false;
        }}
      >
        <div className="ba__layer ba__layer--before">{renderLayer(before, 'Antes', 'a')}</div>
        <div className="ba__layer ba__layer--after">{renderLayer(after, 'Depois', 'b')}</div>

        <span className="ba__chip ba__chip--l">Antes</span>
        <span className="ba__chip ba__chip--r">Depois</span>

        <span className="ba__handle" aria-hidden="true">
          <span className="ba__grip">
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 2 2 7l5 5M15 2l5 5-5 5" />
            </svg>
          </span>
        </span>

        <input
          ref={rangeRef}
          type="range"
          min="0"
          max="100"
          step="1"
          defaultValue="50"
          onChange={(e) => apply(Number(e.target.value))}
          className="ba__range"
          aria-label="Comparar antes e depois: arraste ou use as setas do teclado"
          aria-valuetext="50% depois, 50% antes"
        />
      </div>
    </div>
  );
}
