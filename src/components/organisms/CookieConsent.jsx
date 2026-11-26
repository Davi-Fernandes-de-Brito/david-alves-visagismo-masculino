import { useEffect, useRef, useState } from 'react';
import { analyticsEnabled, getAnalyticsConsent, setAnalyticsConsent } from '../../services/analytics.js';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  // Informa a altura do aviso ao CSS para o botão do WhatsApp não ficar por cima dele.
  useEffect(() => {
    const root = document.documentElement;
    const el = ref.current;
    if (!visible || !el) {
      root.style.removeProperty('--consent-h');
      return undefined;
    }
    const set = () => root.style.setProperty('--consent-h', `${el.offsetHeight + 16}px`);
    set();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(set) : null;
    ro?.observe(el);
    return () => {
      ro?.disconnect();
      root.style.removeProperty('--consent-h');
    };
  }, [visible]);

  useEffect(() => {
    if (analyticsEnabled && getAnalyticsConsent() === null) setVisible(true);
    const openPreferences = () => { if (analyticsEnabled) setVisible(true); };
    window.addEventListener('da:privacy-settings', openPreferences);
    return () => window.removeEventListener('da:privacy-settings', openPreferences);
  }, []);

  const choose = (value) => {
    setAnalyticsConsent(value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside ref={ref} className="consent" aria-label="Preferências de privacidade">
      <div className="consent__copy">
        <strong>Privacidade e métricas</strong>
        <p>Podemos usar o Google Analytics para entender como o site é utilizado. As métricas só serão ativadas com sua autorização. <a href={`${import.meta.env.BASE_URL}privacidade.html`}>Leia a política de privacidade.</a></p>
      </div>
      <div className="consent__actions">
        <button type="button" className="consent__reject" onClick={() => choose('denied')}>Recusar</button>
        <button type="button" className="consent__accept" onClick={() => choose('granted')}>Aceitar métricas</button>
      </div>
    </aside>
  );
}
