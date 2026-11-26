import { Component } from 'react';
import { site } from '../../config/site.js';
import { getClientErrorReport, recordClientError } from '../../utils/errorReporting.js';

export default class ErrorBoundary extends Component {
  state = { hasError: false, copied: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    recordClientError('react-render', error, { componentStack: String(info.componentStack || '').slice(0, 1800) });
  }

  copyReport = async () => {
    try {
      await navigator.clipboard.writeText(getClientErrorReport());
      this.setState({ copied: true });
    } catch {
      this.setState({ copied: false });
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-screen" role="alert">
          <span className="eyebrow">Algo não saiu como esperado</span>
          <h1 className="display">Não foi possível carregar esta parte do site.</h1>
          <p>Atualize a página para tentar novamente. Se o problema continuar, copie o diagnóstico e envie ao responsável pelo site.</p>
          <div className="error-screen__actions">
            <button type="button" className="btn btn--primary" onClick={() => window.location.reload()}>
              <span className="btn__label">Atualizar página</span>
            </button>
            <button type="button" className="btn btn--ghost" onClick={this.copyReport}>
              <span className="btn__label">{this.state.copied ? 'Diagnóstico copiado' : 'Copiar diagnóstico'}</span>
            </button>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">Falar pelo Instagram</a>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
