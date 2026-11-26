const STORAGE_KEY = 'da:diagnostics:v1';
const MAX_ENTRIES = 12;
let initialized = false;

function toMessage(value) {
  if (value instanceof Error) return `${value.name}: ${value.message}`.slice(0, 1200);
  if (typeof value === 'string') return value.slice(0, 1200);
  try { return (JSON.stringify(value) || String(value)).slice(0, 1200); } catch { return 'Erro não identificado'; }
}

export function recordClientError(type, error, details = {}) {
  const entry = {
    time: new Date().toISOString(),
    type: String(type).slice(0, 80),
    message: toMessage(error),
    path: typeof window !== 'undefined' ? window.location.pathname : '/',
    ...details,
  };

  if (typeof window !== 'undefined') {
    try {
      const current = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '[]');
      const next = Array.isArray(current) ? current : [];
      next.push(entry);
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next.slice(-MAX_ENTRIES)));
    } catch {
      // Diagnóstico é complementar; indisponibilidade do armazenamento não pode quebrar o site.
    }
  }
  console.error(`[David Alves site] ${entry.type}: ${entry.message}`, error || '');
}

export function getClientErrorReport() {
  if (typeof window === 'undefined') return 'Nenhum diagnóstico disponível.';
  try {
    const entries = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '[]');
    return JSON.stringify({ generatedAt: new Date().toISOString(), page: window.location.pathname, errors: Array.isArray(entries) ? entries : [] }, null, 2);
  } catch {
    return JSON.stringify({ generatedAt: new Date().toISOString(), errors: [], note: 'Não foi possível ler o histórico local.' }, null, 2);
  }
}

export function initializeGlobalErrorReporting() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  window.addEventListener('error', (event) => {
    if (event.target && event.target !== window) {
      const resource = event.target;
      recordClientError('resource-load', `${resource.tagName || 'Recurso'} não carregou`, {
        resourceType: String(resource.tagName || '').slice(0, 40),
      });
      return;
    }
    recordClientError('window-error', event.error || event.message || 'Erro global sem detalhes');
  }, true);

  window.addEventListener('unhandledrejection', (event) => {
    recordClientError('unhandled-promise', event.reason || 'Promise rejeitada sem detalhes');
  });
}
