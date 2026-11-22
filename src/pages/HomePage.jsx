import { useCallback, useState } from 'react';
import LandingTemplate from '../components/templates/LandingTemplate.jsx';
import Intro from '../components/organisms/Intro.jsx';
import Hero from '../components/organisms/Hero.jsx';
import Vision from '../components/organisms/Vision.jsx';
import Practice from '../components/organisms/Practice.jsx';
import Works from '../components/organisms/Works.jsx';
import Services from '../components/organisms/Services.jsx';
import Process from '../components/organisms/Process.jsx';
import Instagram from '../components/organisms/Instagram.jsx';
import Booking from '../components/organisms/Booking.jsx';
import { reducedMotionNow } from '../hooks/useMotion.js';
import { intro } from '../config/motion.js';

// A intro só roda uma vez por sessão e é ignorada com prefers-reduced-motion.
function shouldPlayIntro() {
  if (typeof window === 'undefined' || reducedMotionNow()) return false;
  try {
    if (sessionStorage.getItem(intro.storageKey)) return false;
    sessionStorage.setItem(intro.storageKey, '1');
  } catch {
    /* storage indisponível: toca a intro normalmente */
  }
  return true;
}

export default function HomePage() {
  const [playIntro] = useState(shouldPlayIntro);
  const [ready, setReady] = useState(!playIntro);
  const [introOn, setIntroOn] = useState(playIntro);
  const reveal = useCallback(() => setReady(true), []);
  const done = useCallback(() => setIntroOn(false), []);

  return (
    <>
      {introOn && <Intro onReveal={reveal} onDone={done} />}
      <LandingTemplate ready={ready}>
        <Hero ready={ready} />
        <Vision />
        <Practice />
        <Works />
        <Services />
        <Process />
        <Instagram />
        <Booking />
      </LandingTemplate>
    </>
  );
}
