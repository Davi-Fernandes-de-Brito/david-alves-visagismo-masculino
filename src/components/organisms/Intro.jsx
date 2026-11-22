import { useEffect, useState } from 'react';
import { intro } from '../../config/motion.js';
import { site } from '../../config/site.js';

// Abertura curta (~1,5 s). Não bloqueia o conteúdo: o Hero já está no DOM por baixo.
export default function Intro({ onReveal, onDone }) {
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => {
      setLeaving(true);
      onReveal();
    }, intro.hold);
    const t2 = setTimeout(onDone, intro.hold + intro.exit);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onReveal, onDone]);

  return (
    <div className={`intro ${leaving ? 'is-leaving' : ''}`} aria-hidden="true">
      <div className="intro__inner">
        <span className="intro__name">{site.name.toUpperCase()}</span>
        <span className="intro__role">{site.role}</span>
      </div>
      <span className="intro__line" />
    </div>
  );
}
