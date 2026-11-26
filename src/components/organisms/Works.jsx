import { useRef, useState, useCallback } from 'react';
import { works, whatsappMessages } from '../../config/content.js';
import { images, portraits } from '../../config/images.js';
import SectionHeading from '../molecules/SectionHeading.jsx';
import Reveal from '../atoms/Reveal.jsx';
import Picture from '../atoms/Picture.jsx';
import Icon from '../atoms/Icon.jsx';
import Button from '../atoms/Button.jsx';
import { whatsappProps } from '../../utils/whatsapp.js';
import BeforeAfter from './BeforeAfter.jsx';

function Gallery() {
  const trackRef = useRef(null);
  const [idx, setIdx] = useState(0);
  const [prog, setProg] = useState(0);

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProg(max > 0 ? el.scrollLeft / max : 0);
    const first = el.children[0];
    const step = first ? first.getBoundingClientRect().width + 24 : 1;
    setIdx(Math.min(portraits.length - 1, Math.round(el.scrollLeft / step)));
  }, []);

  const go = (dir) => {
    const el = trackRef.current;
    const first = el.children[0];
    const step = first ? first.getBoundingClientRect().width + 24 : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <div className="gallery">
      <ul
        className="gallery__track"
        ref={trackRef}
        onScroll={onScroll}
        tabIndex={0}
        role="region"
        aria-label="Galeria de trabalhos. Use as setas do teclado para navegar."
      >
        {portraits.map((p, i) => (
          <li className="gallery__item" key={p.name} style={{ '--i': i }}>
            <figure>
              <div className="gallery__photo">
                <Picture image={p} sizes="(min-width: 900px) 28vw, 74vw" className="gallery__img" />
                <span className="gallery__n">{String(i + 1).padStart(2, '0')}</span>
              </div>
              {p.caption && <figcaption className="gallery__cap">{p.caption}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>

      <div className="gallery__ctrl">
        <span className="gallery__count" aria-live="polite">
          {String(idx + 1).padStart(2, '0')} <i>/</i> {String(portraits.length).padStart(2, '0')}
        </span>
        <span className="gallery__bar" aria-hidden="true">
          <span style={{ transform: `scaleX(${0.18 + prog * 0.82})` }} />
        </span>
        <div className="gallery__btns">
          <button type="button" className="round" onClick={() => go(-1)} aria-label="Trabalho anterior" disabled={idx === 0 && prog < 0.01}>
            <Icon name="left" size={18} />
          </button>
          <button type="button" className="round" onClick={() => go(1)} aria-label="Próximo trabalho" disabled={prog > 0.99}>
            <Icon name="right" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Works() {
  return (
    <section id="trabalhos" className="section works theme-light" aria-labelledby="trabalhos-title">
      <div className="container">
        <div className="works__head">
          <SectionHeading eyebrow={works.eyebrow} lines={[{ text: 'Análises e' }, { text: 'transformações.', em: true }]} />
          <span id="trabalhos-title" className="sr-only">
            {works.title}
          </span>
          <Reveal delay={120}>
            <p className="lead">{works.intro}</p>
          </Reveal>
        </div>
      </div>

      <Gallery />

      <div className="container works__compare">
        <div className="works__panel theme-graphite">
          <div className="works__panel-text">
            <Reveal>
              <span className="eyebrow">{works.compareTitle}</span>
              <h3 className="h3">Arraste para comparar.</h3>
              <p>{works.compareNote}</p>
            </Reveal>
          </div>
          <div className="works__panel-ba">
            <BeforeAfter before={images.beforeAfterBefore} after={images.beforeAfterAfter} />
          </div>
        </div>
        <Reveal className="works__cta">
          <Button icon="arrow" {...whatsappProps('works', whatsappMessages.works)}>{works.cta}</Button>
        </Reveal>
      </div>
    </section>
  );
}
