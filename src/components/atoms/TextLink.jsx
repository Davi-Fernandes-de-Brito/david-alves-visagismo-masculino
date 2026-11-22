import Icon from './Icon.jsx';

// Link com sublinhado animado.
export default function TextLink({ href, children, external = false, icon, className = '', ...rest }) {
  const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <a href={href} className={`tlink ${className}`} {...ext} {...rest}>
      <span className="tlink__text">{children}</span>
      {icon && <Icon name={icon} size={14} className="tlink__icon" />}
    </a>
  );
}
