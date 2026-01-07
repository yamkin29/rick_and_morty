import './CharactersListPage.css';
import { Loader } from '@/shared/components';
import { MainIcon } from '@/assets';

const CharactersListPage = () => {
  return (
    <div className='characters-list-page'>
      <div className='characters-list-page__logo'>
        <MainIcon />
      </div>
      <div className='characters-list-page__list'>
        <Loader size='large' />
      </div>
    </div>
  );
};

export default CharactersListPage;
