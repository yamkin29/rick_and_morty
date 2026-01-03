import { Routes, Route, Navigate } from 'react-router';
import { CharactersListPage } from './pages/charactersListPage/CharactersListPage';
import { CharacterPage } from './pages/CharacterPage';
import { NotFoundPage } from './pages/NotFoundPage';
import './App.css';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';

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
