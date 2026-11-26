import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { initializeAnalyticsFromConsent } from './services/analytics.js';
import { initializeGlobalErrorReporting } from './utils/errorReporting.js';
import './styles/index.css';

initializeGlobalErrorReporting();
initializeAnalyticsFromConsent();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
