import { Navigate, Route, Routes } from 'react-router';

import { CharacterPage, CharactersListPage, NotFoundPage } from '@/pages';
import { Footer, Header } from '@/shared/components';
import { ErrorBoundary } from '@/shared/components';
import { AppToaster } from '@/shared/components/appToaster';

import './App.scss';

export const App = () => {
  return (
    <div className='app'>
      <AppToaster />
      <div className='app__header'>
        <Header />
      </div>
      <div className='app__content'>
        <ErrorBoundary>
          <Routes>
            <Route
              path='/'
              element={
                <Navigate
                  to='/characters'
                  replace
                />
              }
            />

            <Route
              path='/characters'
              element={<CharactersListPage />}
            />
            <Route
              path='/characters/:id'
              element={<CharacterPage />}
            />

            <Route
              path='/404'
              element={<NotFoundPage />}
            />

            <Route
              path='*'
              element={
                <Navigate
                  to='/404'
                  replace
                />
              }
            />
          </Routes>
        </ErrorBoundary>
      </div>
      <div className='app__footer'>
        <Footer />
      </div>
    </div>
  );
};
