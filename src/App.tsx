import { Routes, Route, Navigate } from 'react-router';
import { CharactersListPage, CharacterPage, NotFoundPage } from '@/pages';
import './App.css';
import { Header, Footer } from '@/shared/components';

function App() {
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
}

export default App;
