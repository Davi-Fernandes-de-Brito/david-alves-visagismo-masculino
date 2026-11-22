import { useEffect, useRef, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

export const reducedMotionNow = () =>
  typeof window !== 'undefined' && window.matchMedia(QUERY).matches;

export function useReducedMotion() {
  const [reduced, setReduced] = useState(reducedMotionNow);
  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

// Dispositivos com ponteiro fino e hover (desktop) — usado para efeitos magnéticos.
export function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    setFine(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);
  return fine;
}

// true quando o elemento entra na viewport (uma vez, por padrão).
export function useInView({ once = true, threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (reducedMotionNow() || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold, rootMargin]);
  return [ref, inView];
}

// Liga o progresso de rolagem de um elemento a um callback (0..1), com rAF.
// mode 'through': 0 quando o topo toca o fundo da viewport, 1 quando o fundo sai pelo topo.
// mode 'sticky' : 0 no começo da área "pinada", 1 no final (elemento mais alto que a viewport).
export function useScrollLink(ref, mode, cb, enabled = true) {
  const cbRef = useRef(cb);
  cbRef.current = cb;
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return undefined;
    let raf = 0;
    const compute = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let p;
      if (mode === 'sticky') p = -r.top / Math.max(1, r.height - vh);
      else p = (vh - r.top) / (vh + r.height);
      cbRef.current(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, mode, enabled]);
}

// Parallax discreto: grava --py (-1..1) no elemento.
export function useParallax(ref, enabled = true) {
  const reduced = useReducedMotion();
  useScrollLink(
    ref,
    'through',
    (p) => {
      if (ref.current) ref.current.style.setProperty('--py', String((p - 0.5) * 2));
    },
    enabled && !reduced,
  );
}
