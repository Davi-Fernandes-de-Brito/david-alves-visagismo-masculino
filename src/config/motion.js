// Tokens de movimento e breakpoints em JS (os mesmos valores existem em styles/tokens.css).
export const ease = {
  out: 'cubic-bezier(0.22, 1, 0.36, 1)',
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
};

export const duration = { fast: 200, base: 700, slow: 1200 };

export const breakpoints = { sm: 600, md: 900, lg: 1200 };

// Intro curta: nome + cortina. Total ≈ 1,5 s e nunca bloqueia o conteúdo.
export const intro = { hold: 800, exit: 700, storageKey: 'da-intro-seen' };
