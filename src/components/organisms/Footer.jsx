import { nav, site } from '../../config/site.js';
import TextLink from '../atoms/TextLink.jsx';
import Icon from '../atoms/Icon.jsx';
import { whatsappMessages } from '../../config/content.js';
import { whatsappProps } from '../../utils/whatsapp.js';

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
          <p className="footer__label">Contato</p>
          <TextLink href={site.instagram.url} external icon="arrowUpRight">
            <Icon name="instagram" size={16} /> {site.instagram.handle}
          </TextLink>
          <TextLink icon="arrowUpRight" {...whatsappProps('footer', whatsappMessages.contact)}>
            WhatsApp · {site.contact.phoneDisplay}
          </TextLink>
          {site.contact.email && <TextLink href={`mailto:${site.contact.email}`}>{site.contact.email}</TextLink>}
        </div>

        <div className="footer__location">
          <p className="footer__label">Endereço</p>
          <address>{site.location.streetAddress}<br />{site.location.neighborhood}, {site.location.city} – {site.location.region}<br />CEP {site.location.postalCode}</address>
          <a className="footer__map-link" href={site.location.mapsUrl} target="_blank" rel="noopener noreferrer">Como chegar ↗</a>
        </div>
      </div>
      <div className="container footer__legal">
        <small>
          © {site.year} {site.name}. Todos os direitos reservados.
        </small>
        <div className="footer__legal-links">
          <a href={`${import.meta.env.BASE_URL}privacidade.html`}>Política de Privacidade</a>
          <a href="#inicio" className="footer__top">Voltar ao topo</a>
        </div>
      </div>
    </footer>
  );
}
