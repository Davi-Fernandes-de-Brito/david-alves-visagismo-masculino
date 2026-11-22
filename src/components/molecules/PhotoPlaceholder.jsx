// Moldura visual sem texto para fotos que serão inseridas posteriormente.
export default function PhotoPlaceholder({ slot, label = 'Espaço para fotografia', ratio = '4 / 5', className = '' }) {
  return (
    <div
      className={`ph ${className}`}
      style={{ aspectRatio: ratio }}
      data-image-slot={slot}
      role="img"
      aria-label={label}
    >
      <span className="ph__corner ph__corner--tl" aria-hidden="true" />
      <span className="ph__corner ph__corner--br" aria-hidden="true" />
    </div>
  );
}
