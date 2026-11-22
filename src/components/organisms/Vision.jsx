import { vision } from '../../config/content.js';
import { images } from '../../config/images.js';
import SectionHeading from '../molecules/SectionHeading.jsx';
import MaskedImage from '../molecules/MaskedImage.jsx';
import Reveal from '../atoms/Reveal.jsx';

export default function Vision() {
  return (
    <section id="visao" className="section vision theme-light" aria-labelledby="visao-title">
      <div className="container vision__grid">
        <div className="vision__media">
          <MaskedImage
            image={images.stageName}
            ratio="4 / 5"
            direction="left"
            focus="62% 46%"
            sizes="(min-width: 900px) 40vw, 100vw"
            caption={vision.caption}
          />
        </div>

        <div className="vision__text">
          <SectionHeading
            eyebrow="A visão de David"
            lines={[{ text: 'Antes de definir uma imagem,' }, { text: 'é preciso compreender a pessoa.', em: true }]}
          />
          <span id="visao-title" className="sr-only">
            {vision.title}
          </span>
          <Reveal className="prose vision__prose" delay={120}>
            {vision.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
