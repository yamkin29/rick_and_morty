import { Toaster } from 'react-hot-toast';

export const AppToaster = () => (
  <Toaster
    position='bottom-right'
    toastOptions={{
      error: {
        duration: 4000,
        style: {
          background: '#e7b9d2',
          color: '#000509',
          border: '1px solid #3f3f46',
          borderRadius: 8,
          padding: '12px 16px',
          fontSize: 14,
          fontFamily: 'Roboto, sans-serif',
          boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          maxWidth: 320
        },
        iconTheme: {
          primary: '#f87171',
          secondary: '#18181b'
        }
      }
    }}
  />
);
