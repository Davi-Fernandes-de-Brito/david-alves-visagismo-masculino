import { useRef } from 'react';
import Icon from './Icon.jsx';
import { useFinePointer, useReducedMotion } from '../../hooks/useMotion.js';

// variant: 'primary' (preenchido) | 'ghost' (contorno)
export default function Button({
  href,
  onClick,
  variant = 'primary',
  icon = 'arrow',
  magnetic = true,
  type,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  const move = (e) => {
    if (!fine || reduced || !magnetic || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.22;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.3;
    ref.current.style.setProperty('--mx', `${x.toFixed(1)}px`);
    ref.current.style.setProperty('--my', `${y.toFixed(1)}px`);
  };
  const leave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty('--mx', '0px');
    ref.current.style.setProperty('--my', '0px');
  };

  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      ref={ref}
      href={href}
      onClick={onClick}
      type={href ? undefined : type || 'button'}
      className={`btn btn--${variant}`}
      onPointerMove={move}
      onPointerLeave={leave}
      {...rest}
    >
      <span className="btn__label">{children}</span>
      {icon && <Icon name={icon} size={16} className="btn__icon" />}
    </Tag>
  );
}
