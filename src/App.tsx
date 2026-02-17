import { Navigate, Route, Routes } from 'react-router';

import { CharacterPage, CharactersListPage, NotFoundPage } from '@/pages';
import { Footer, Header } from '@/shared/components';

import './App.css';

export const App = () => {
  return (
    <div className='app'>
      <div className='app__header'>
        <Header />
      </div>
      <div className='app__content'>
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
            path='*'
            element={<NotFoundPage />}
          />
        </Routes>
      </div>
      <div className='app__footer'>
        <Footer />
      </div>
    </div>
  );
};
