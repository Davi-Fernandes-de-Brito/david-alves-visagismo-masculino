import { useInView } from '../../hooks/useMotion.js';

// Entrada suave ao rolar. variant: 'up' | 'fade' | 'line'
export default function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, className = '', children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant} ${inView ? 'is-in' : ''} ${className}`}
      style={{ '--delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
