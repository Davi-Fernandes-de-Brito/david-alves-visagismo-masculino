import { content, whatsappMessages } from '../../config/content.js';
import { site } from '../../config/site.js';
import SectionHeading from '../molecules/SectionHeading.jsx';
import Reveal from '../atoms/Reveal.jsx';
import Button from '../atoms/Button.jsx';
import Icon from '../atoms/Icon.jsx';
import WhatsAppCta from '../molecules/WhatsAppCta.jsx';
import Reels from './Reels.jsx';

// Seção Conteúdo: reels em vídeo e link para o perfil oficial.
export default function Instagram() {

  return (
    <section id="conteudo" className="section ig theme-light" aria-labelledby="conteudo-title">
      <div className="container">
        <div className="ig__head">
          <SectionHeading eyebrow={content.eyebrow} lines={[{ text: 'No' }, { text: 'Instagram.', em: true }]} />
          <span id="conteudo-title" className="sr-only">{content.title}</span>
          <Reveal delay={120} className="ig__side">
            <p className="lead">{content.text}</p>
            <Button href={site.instagram.url} icon="arrowUpRight" target="_blank" rel="noopener noreferrer">
              {content.cta} {site.instagram.handle}
            </Button>
          </Reveal>
        </div>
      </div>

      <Reels />

      <div className="container">
        <Reveal delay={80}>
          <a className="ig__handle" href={site.instagram.url} target="_blank" rel="noopener noreferrer">
            <span className="ig__handle-label"><Icon name="instagram" size={18} /> {content.handleLabel}</span>
            <span className="ig__handle-name">{site.instagram.handle}</span>
            <span className="ig__handle-arrow" aria-hidden="true"><Icon name="arrowUpRight" size={34} /></span>
          </a>
        </Reveal>
        <WhatsAppCta source="content" message={whatsappMessages.content} className="ig__cta" />
      </div>
    </section>
  );
}
