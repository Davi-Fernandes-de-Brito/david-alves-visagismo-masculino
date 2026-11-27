import { useCallback, useEffect, useRef, useState } from 'react';
import { content } from '../../config/content.js';
import Reveal from '../atoms/Reveal.jsx';

const BASE = import.meta.env.BASE_URL;
const DOUBLE_TAP_MS = 280;

const REEL_ICON = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
    <path d="M10 8.6v6.8l5.6-3.4z" fill="currentColor" stroke="none" />
  </svg>
);

// Um card de reel: vídeo local, sem áudio, em loop.
// Já começa tocando e nunca pausa sozinho: só pausa quando o visitante clica uma vez.
// 1 clique/toque pausa ou retoma · 2 cliques/toques abrem o reel (reel.url) no Instagram.
function ReelCard({ reel, index, total, load }) {
  const videoRef = useRef(null);
  const tapTimer = useRef(null);
  const manualPause = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false); // pausado por clique do visitante
  const [blocked, setBlocked] = useState(false); // navegador impediu o autoplay
  const [failed, setFailed] = useState(false);

  const play = useCallback(() => {
    const video = videoRef.current;
    if (!video || manualPause.current) return;
    video.play().catch(() => setBlocked(true));
  }, []);

  useEffect(() => {
    if (load) play();
  }, [load, play]);

  useEffect(() => () => clearTimeout(tapTimer.current), []);

  useEffect(() => {
    const retry = () => {
      const video = videoRef.current;
      if (video && video.paused) play();
    };
    window.addEventListener('da:reels-retry', retry);
    return () => window.removeEventListener('da:reels-retry', retry);
  }, [play]);

  const openReel = () => {
    window.open(reel.url, '_blank', 'noopener,noreferrer');
  };

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      manualPause.current = false;
      setPaused(false);
      video.play().catch(() => setBlocked(true));
    } else {
      manualPause.current = true;
      setPaused(true);
      video.pause();
    }
  };

  // Diferencia clique simples de duplo: o primeiro clique só age após DOUBLE_TAP_MS,
  // e um segundo clique nesse intervalo cancela a pausa e abre o Instagram.
  // Funciona igual com mouse e toque.
  const onActivate = () => {
    if (failed) {
      openReel();
      return;
    }
    if (tapTimer.current) {
      clearTimeout(tapTimer.current);
      tapTimer.current = null;
      openReel();
      return;
    }
    tapTimer.current = setTimeout(() => {
      tapTimer.current = null;
      toggle();
    }, DOUBLE_TAP_MS);
  };

  // Inclinação sutil que acompanha o mouse (só com mouse; toque e teclado não são afetados).
  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.setProperty('--ry', `${(x * 7).toFixed(2)}deg`);
    card.style.setProperty('--rx', `${(-y * 7).toFixed(2)}deg`);
  };
  const onPointerLeave = (e) => {
    e.currentTarget.style.setProperty('--ry', '0deg');
    e.currentTarget.style.setProperty('--rx', '0deg');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  const showGlyph = paused || (blocked && !playing);

  return (
    <li className="reels__item" style={{ '--i': index }}>
      <Reveal delay={index * 90} className="reels__reveal">
        <div
          className={`reel ${playing ? 'is-playing' : ''} ${showGlyph ? 'is-paused' : ''}`}
          role="button"
          tabIndex={0}
          aria-label={`Vídeo ${index + 1} de ${total}. Pressione Enter para pausar ou retomar. Toque duas vezes para abrir no Instagram.`}
          onClick={onActivate}
          onKeyDown={onKeyDown}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
        >
          {failed ? (
            <img className="reel__video" src={`${BASE}${reel.poster}`} alt="" loading="lazy" />
          ) : (
            <video
              ref={videoRef}
              className="reel__video"
              src={load ? `${BASE}${reel.video}` : undefined}
              poster={`${BASE}${reel.poster}`}
              muted
              loop
              playsInline
              preload={load ? 'auto' : 'none'}
              disablePictureInPicture
              disableRemotePlayback
              controlsList="nodownload noremoteplayback"
              aria-hidden="true"
              tabIndex={-1}
              onPlaying={() => {
                setPlaying(true);
                setBlocked(false);
              }}
              onPause={() => setPlaying(false)}
              onError={() => load && setFailed(true)}
            />
          )}
          <span className="reel__glyph" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>
          </span>
          <span className="reel__icon" aria-hidden="true">{REEL_ICON}</span>
        </div>
        <a className="reel__open" href={reel.url} target="_blank" rel="noopener noreferrer">
          Abrir vídeo {index + 1} no Instagram
        </a>
      </Reveal>
    </li>
  );
}

export default function Reels() {
  const reels = content.reels;
  const rootRef = useRef(null);
  const [load, setLoad] = useState(false);

  // Os arquivos são anexados logo depois que a página termina de carregar (e já tocam, mudos, quando a
  // pessoa chega). Com "economia de dados" ou conexão lenta, o carregamento espera a seção ficar perto.
  // A reprodução é iniciada por script (play) e não pelo atributo autoplay, porque os navegadores
  // pausam sozinhos vídeos com autoplay que estão fora da tela.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const conn = navigator.connection;
    const constrained = !!conn && (conn.saveData || /(^|-)2g|3g/.test(conn.effectiveType || ''));
    let near;
    let timer;
    const start = () => setLoad(true);
    if (!constrained) {
      if (document.readyState === 'complete') timer = setTimeout(start, 600);
      else {
        const onLoad = () => { timer = setTimeout(start, 600); };
        window.addEventListener('load', onLoad, { once: true });
        return () => { window.removeEventListener('load', onLoad); clearTimeout(timer); };
      }
    } else if ('IntersectionObserver' in window) {
      near = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          start();
          near.disconnect();
        }
      }, { rootMargin: '3500px 0px' });
      near.observe(root);
    } else {
      start();
    }
    return () => {
      clearTimeout(timer);
      near?.disconnect();
    };
  }, []);

  // Se o navegador bloqueou o início automático (ex.: economia de energia), a primeira interação
  // com a página (toque, rolagem, tecla) tenta iniciar de novo os vídeos que não foram pausados pelo visitante.
  useEffect(() => {
    const retry = () => window.dispatchEvent(new Event('da:reels-retry'));
    const events = ['pointerdown', 'touchstart', 'keydown', 'wheel'];
    events.forEach((ev) => window.addEventListener(ev, retry, { once: true, passive: true }));
    return () => events.forEach((ev) => window.removeEventListener(ev, retry));
  }, []);

  return (
    <div className="reels" ref={rootRef}>
      <div className="container">
        <p className="reels__note">{content.reelsNote}</p>
      </div>
      <ul className="reels__list" aria-label="Vídeos do Instagram">
        {reels.map((reel, i) => <ReelCard key={reel.url} reel={reel} index={i} total={reels.length} load={load} />)}
      </ul>
    </div>
  );
}
