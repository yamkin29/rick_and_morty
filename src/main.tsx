import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router';

import { App } from './App.tsx';

import './index.scss';

const Router = import.meta.env.PROD ? HashRouter : BrowserRouter;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
