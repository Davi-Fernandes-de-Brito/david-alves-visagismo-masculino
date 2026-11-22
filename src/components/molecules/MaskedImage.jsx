import { useRef } from 'react';
import Picture from '../atoms/Picture.jsx';
import { useInView, useParallax } from '../../hooks/useMotion.js';

// Fotografia revelada por máscara (clip-path) com leve parallax.
// direction: 'up' | 'left' | 'right'
export default function MaskedImage({
  image,
  sizes = '(min-width: 900px) 40vw, 100vw',
  ratio = '4 / 5',
  direction = 'up',
  parallax = true,
  focus,
  eager = false,
  caption,
  className = '',
}) {
  const [ref, inView] = useInView({ threshold: 0.12 });
  const frameRef = useRef(null);
  useParallax(frameRef, parallax);
  return (
    <figure ref={ref} className={`mimg mimg--${direction} ${inView ? 'is-in' : ''} ${className}`}>
      <div className="mimg__box" style={{ aspectRatio: ratio }}>
        <div className="mimg__frame" ref={frameRef}>
          <div className="mimg__par">
            <Picture image={image} sizes={sizes} focus={focus} eager={eager} className="mimg__img" />
          </div>
        </div>
      </div>
      {caption && <figcaption className="mimg__cap">{caption}</figcaption>}
    </figure>
  );
}
