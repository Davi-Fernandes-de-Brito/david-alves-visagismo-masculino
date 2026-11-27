import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { initializeGlobalErrorReporting } from './utils/errorReporting.js';
import './styles/index.css';

initializeGlobalErrorReporting();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
