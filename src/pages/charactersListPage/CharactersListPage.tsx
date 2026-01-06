import './CharactersListPage.css';
import { Loader } from '@/shared/components';
import { Main } from '@/assets';

const CharactersListPage = () => {
  return (
    <div className='characters-list-page'>
      <div className='characters-list-page__logo'>
        <Main />
      </div>
      <div className='characters-list-page__list'>
        <Loader size='large' />
      </div>
    </div>
  );
};

export default CharactersListPage;
