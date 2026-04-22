import { StrictMode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router';

import { AppToaster } from '@/shared/components/appToaster';

import { App } from './App.tsx';

import './index.scss';

const Router = import.meta.env.PROD ? HashRouter : BrowserRouter;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 минут
      gcTime: 1000 * 60 * 10, // 10 минут
      retry: 3
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AppToaster />
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  </StrictMode>
);
