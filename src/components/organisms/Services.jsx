import { services } from '../../config/content.js';
import SectionHeading from '../molecules/SectionHeading.jsx';
import Reveal from '../atoms/Reveal.jsx';
import TextLink from '../atoms/TextLink.jsx';

// Pré-seleciona o serviço no formulário de contato.
const pick = (id) => window.dispatchEvent(new CustomEvent('da:service', { detail: id }));

function Item({ item, n }) {
  return (
    <Reveal as="article" className="svc svc--lead">
      <div className="svc__body">
        <span className="svc__n">{n}</span>
        <h3 className="h3 svc__name">{item.name}</h3>
        <p className="svc__text">{item.text}</p>
        <TextLink href="#agendar" icon="arrowUpRight" onClick={() => pick(item.id)}>
          {services.cta}
        </TextLink>
      </div>
    </Reveal>
  );
}

export default function Services() {
  const visibleServices = services.items.filter((item) => item.confirmed);

  return (
    <section id="servicos" className="section services theme-graphite" aria-labelledby="servicos-title">
      <div className="container">
        <SectionHeading eyebrow={services.eyebrow} lines={[{ text: 'Como posso' }, { text: 'ajudar.', em: true }]} />
        <span id="servicos-title" className="sr-only">
          {services.title}
        </span>

        <div className="services__grid">
          {visibleServices.map((item, index) => (
            <Item key={item.id} item={item} n={String(index + 1).padStart(2, '0')} />
          ))}
        </div>
      </div>
    </section>
  );
}
