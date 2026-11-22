import { useMemo } from 'react';
import { nav } from '../../config/site.js';
import useActiveSection from '../../hooks/useActiveSection.js';

// Indicador lateral de seção (apenas desktop).
export default function SideIndex() {
  const ids = useMemo(() => ['inicio', ...nav.map((n) => n.id)], []);
  const active = useActiveSection(ids);
  const idx = Math.max(0, ids.indexOf(active));
  return (
    <aside className="side" aria-hidden="true">
      <span className="side__now">{String(idx + 1).padStart(2, '0')}</span>
      <span className="side__track">
        <span className="side__fill" style={{ transform: `scaleY(${(idx + 1) / ids.length})` }} />
      </span>
      <span className="side__total">{String(ids.length).padStart(2, '0')}</span>
    </aside>
  );
}
