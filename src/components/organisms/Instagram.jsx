import { content } from '../../config/content.js';
import { site } from '../../config/site.js';
import SectionHeading from '../molecules/SectionHeading.jsx';
import PhotoPlaceholder from '../molecules/PhotoPlaceholder.jsx';
import Picture from '../atoms/Picture.jsx';
import Reveal from '../atoms/Reveal.jsx';
import Button from '../atoms/Button.jsx';

// Galeria manual: não simula integração com a API do Instagram.
// Para adicionar publicações reais, preencha `content.posts` em config/content.js.
export default function Instagram() {
  const slots = Array.from({ length: content.slots }, (_, i) => content.posts[i] || null);
  return (
    <section id="conteudo" className="section ig theme-light" aria-labelledby="conteudo-title">
      <div className="container">
        <div className="ig__head">
          <SectionHeading eyebrow={content.eyebrow} lines={[{ text: 'No' }, { text: 'Instagram.', em: true }]} />
          <span id="conteudo-title" className="sr-only">
            {content.title}
          </span>
          <Reveal delay={120} className="ig__side">
            <p className="lead">{content.text}</p>
            <Button href={site.instagram.url} icon="arrowUpRight" target="_blank" rel="noopener noreferrer">
              {content.cta} {site.instagram.handle}
            </Button>
          </Reveal>
        </div>

        <ul className="ig__grid">
          {slots.map((post, i) => (
            <li key={i} className={`ig__cell ig__cell--${i + 1}`}>
              <Reveal delay={i * 80}>
                <a
                  href={post?.href || site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={post?.label || 'Abrir o perfil no Instagram'}
                  className="ig__link"
                >
                  {post ? (
                    <Picture image={post.image} sizes="(min-width: 900px) 24vw, 46vw" className="ig__img" />
                  ) : (
                    <PhotoPlaceholder slot={`instagram-${i + 1}`} label="Publicação" ratio={i % 3 === 0 ? '4 / 5' : '1 / 1'} />
                  )}
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
