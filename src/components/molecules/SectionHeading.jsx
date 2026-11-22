import Reveal from '../atoms/Reveal.jsx';
import SplitWords from '../atoms/SplitWords.jsx';

// Título de seção com etiqueta e título, sem numeração ou traço decorativo.
export default function SectionHeading({ eyebrow, lines, size = 'h2', align = 'left', children }) {
  return (
    <header className={`sh sh--${align}`}>
      <Reveal variant="fade" className="sh__meta">
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <SplitWords as="h2" lines={lines} className={size === 'h3' ? 'h3' : 'h2'} />
      {children}
    </header>
  );
}
