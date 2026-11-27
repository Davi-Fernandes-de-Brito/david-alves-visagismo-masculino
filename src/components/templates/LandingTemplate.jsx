import Header from '../organisms/Header.jsx';
import Footer from '../organisms/Footer.jsx';
import ScrollProgress from '../organisms/ScrollProgress.jsx';
import SideIndex from '../organisms/SideIndex.jsx';
import WhatsAppFloat from '../organisms/WhatsAppFloat.jsx';

// Estrutura da página: link de pulo, cabeçalho, conteúdo, rodapé e indicadores.
export default function LandingTemplate({ ready, children }) {
  return (
    <>
      <a href="#conteudo-principal" className="skip-link">
        Pular para o conteúdo
      </a>
      <ScrollProgress />
      <Header ready={ready} />
      <SideIndex />
      <main id="conteudo-principal">{children}</main>
      <Footer />
      <WhatsAppFloat ready={ready} />
    </>
  );
}
