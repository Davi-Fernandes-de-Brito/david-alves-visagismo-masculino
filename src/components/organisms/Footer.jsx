import { nav, site } from '../../config/site.js';
import TextLink from '../atoms/TextLink.jsx';
import Icon from '../atoms/Icon.jsx';

export default function Footer() {
  return (
    <footer className="footer theme-dark">
      <div className="container footer__grid">
        <div className="footer__brand">
          <p className="footer__name">{site.name.toUpperCase()}</p>
          <p className="eyebrow">{site.role}</p>
        </div>

        <nav className="footer__nav" aria-label="Rodapé">
          {nav.map((n) => (
            <TextLink key={n.id} href={`#${n.id}`}>
              {n.label}
            </TextLink>
          ))}
        </nav>

        <div className="footer__contact">
          <TextLink href={site.instagram.url} external icon="arrowUpRight">
            <Icon name="instagram" size={16} /> {site.instagram.handle}
          </TextLink>
          {site.contact.whatsapp && (
            <TextLink href={`https://wa.me/${site.contact.whatsapp}`} external>
              WhatsApp
            </TextLink>
          )}
          {site.contact.email && <TextLink href={`mailto:${site.contact.email}`}>{site.contact.email}</TextLink>}
        </div>
      </div>
      <div className="container footer__legal">
        <small>
          © {site.year} {site.name}. Todos os direitos reservados.
        </small>
        <a href="#inicio" className="footer__top">
          Voltar ao topo
        </a>
      </div>
    </footer>
  );
}
