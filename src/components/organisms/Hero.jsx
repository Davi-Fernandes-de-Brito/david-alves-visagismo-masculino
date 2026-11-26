import { useRef } from 'react';
import { hero, whatsappMessages } from '../../config/content.js';
import { images } from '../../config/images.js';
import { site } from '../../config/site.js';
import Picture from '../atoms/Picture.jsx';
import SplitWords from '../atoms/SplitWords.jsx';
import Button from '../atoms/Button.jsx';
import { useParallax } from '../../hooks/useMotion.js';
import { whatsappProps } from '../../utils/whatsapp.js';

export default function Hero({ ready }) {
  const frameRef = useRef(null);
  useParallax(frameRef, ready);
  return (
    <section id="inicio" className={`hero theme-dark ${ready ? 'is-ready' : ''}`} aria-label="Apresentação">
      <div className="hero__media">
        <div className="hero__mask">
          <div className="hero__frame" ref={frameRef}>
            <Picture
              image={images.hero}
              eager
              sizes="(min-width: 900px) 46vw, 100vw"
              className="hero__img"
            />
          </div>
        </div>
        <span className="hero__frameline" aria-hidden="true" />
      </div>

      <div className="hero__copy">
        <p className="hero__id">
          <span className="hero__name">{site.name.toUpperCase()}</span>
          <span className="hero__sep" aria-hidden="true" />
          <span className="eyebrow">{hero.eyebrow}</span>
        </p>

        <SplitWords
          as="h1"
          className="display hero__title"
          lines={hero.headline.map((t, i) => ({ text: t, em: i === 1 }))}
          active={ready}
          delay={250}
        />

        <p className="lead hero__lead">{hero.lead}</p>

        <div className="hero__cta">
          <Button href={hero.ctaPrimary.href}>{hero.ctaPrimary.label}</Button>
          <Button {...whatsappProps('hero', whatsappMessages.hero)} variant="ghost" icon={null}>
            {hero.ctaSecondary.label}
          </Button>
        </div>
      </div>

      <a href="#visao" className="hero__cue" aria-label="Rolar para a próxima seção">
        <span className="hero__cue-line" />
        <span className="eyebrow">Role</span>
      </a>
    </section>
  );
}
