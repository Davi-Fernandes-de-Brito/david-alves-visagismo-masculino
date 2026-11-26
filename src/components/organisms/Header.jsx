import { useEffect, useMemo, useState } from 'react';
import { nav, site } from '../../config/site.js';
import useActiveSection from '../../hooks/useActiveSection.js';
import Icon from '../atoms/Icon.jsx';
import Button from '../atoms/Button.jsx';
import { trackEvent } from '../../services/analytics.js';
import { whatsappMessages } from '../../config/content.js';
import { whatsappProps } from '../../utils/whatsapp.js';

export default function Header({ ready }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ids = useMemo(() => nav.map((n) => n.id), []);
  const active = useActiveSection(ids);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('is-locked', open);
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('is-locked');
    };
  }, [open]);

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''} ${ready ? 'is-ready' : ''} ${open ? 'is-open' : ''}`}>
      <div className="header__bar">
        <a href="#inicio" className="header__brand" aria-label={`${site.name}, início`} onClick={() => setOpen(false)}>
          <span className="header__name">{site.name.toUpperCase()}</span>
          <span className="header__role">{site.role}</span>
        </a>

        <nav className="header__nav" aria-label="Principal">
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={`header__link ${active === n.id ? 'is-active' : ''}`} aria-current={active === n.id ? 'true' : undefined}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="header__cta">
          <Button {...whatsappProps('header', whatsappMessages.header)} variant="ghost" icon={null}>
            Solicitar atendimento
          </Button>
        </div>

        <button
          type="button"
          className="header__toggle"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} size={22} />
        </button>
      </div>

      <div id="menu-mobile" className="menu" hidden={!open}>
        <nav aria-label="Menu móvel">
          {nav.map((n, i) => (
            <a key={n.id} href={`#${n.id}`} className="menu__link" style={{ '--i': i }} onClick={() => setOpen(false)}>
              <span className="menu__n">{String(i + 1).padStart(2, '0')}</span>
              {n.label}
            </a>
          ))}
        </nav>
        <a {...whatsappProps('mobile_menu', whatsappMessages.header)} className="menu__wa" onClick={() => { setOpen(false); trackEvent('whatsapp_contact_open', { source: 'mobile_menu' }); }}>
          Solicitar atendimento
        </a>
        <a href={site.instagram.url} className="menu__ig" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('instagram_profile_open', { source: 'mobile_menu' })}>
          <Icon name="instagram" size={18} /> {site.instagram.handle}
        </a>
      </div>
    </header>
  );
}
