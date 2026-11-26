const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const CONSENT_KEY = 'da:analytics-consent:v1';
let initialized = false;

export function getAnalyticsConsent() {
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

function loadGoogleAnalytics() {
  if (!MEASUREMENT_ID || initialized || typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  window.gtag('consent', 'update', { analytics_storage: 'granted' });
  window.gtag('config', MEASUREMENT_ID, { anonymize_ip: true });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID)}`;
  script.dataset.daAnalytics = 'true';
  script.onerror = () => console.warn('[analytics] Não foi possível carregar o Google Analytics.');
  document.head.appendChild(script);
  initialized = true;
}

export function setAnalyticsConsent(value) {
  if (!['granted', 'denied'].includes(value)) return;
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch (error) {
    console.warn('[privacy] Não foi possível salvar a preferência de cookies.', error);
  }
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', { analytics_storage: value });
  }
  if (value === 'granted') loadGoogleAnalytics();
}

export function initializeAnalyticsFromConsent() {
  if (getAnalyticsConsent() === 'granted') loadGoogleAnalytics();
}

export function trackEvent(name, params = {}) {
  if (getAnalyticsConsent() !== 'granted' || !MEASUREMENT_ID || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

export const analyticsEnabled = Boolean(MEASUREMENT_ID);
