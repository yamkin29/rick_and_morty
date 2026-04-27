import { StrictMode } from 'react';

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRoot } from 'react-dom/client';
import { toast } from 'react-hot-toast';
import { BrowserRouter, HashRouter } from 'react-router';

import { AppToaster } from '@/shared/components/appToaster';
import { IsNotFoundError } from '@/shared/helpers';

import { App } from './App.tsx';

import './index.scss';

const Router = import.meta.env.PROD ? HashRouter : BrowserRouter;

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (IsNotFoundError(error)) {
        return;
      }

      const message = error instanceof Error ? error.message : 'Something went wrong.';
      toast.error(message);
    }
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 минут
      gcTime: 1000 * 60 * 10, // 10 минут
      retry: (failureCount, error) => !IsNotFoundError(error) && failureCount < 3
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
