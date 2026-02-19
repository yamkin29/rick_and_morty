import { MainIcon } from '@/assets';
import { TestImageRick } from '@/assets';
import { CharacterCardWidget } from '@/widgets';

import './CharactersListPage.css';

export const CharactersListPage = () => {
  return (
    <div className='characters-list-page'>
      <div className='characters-list-page__logo'>
        <MainIcon />
      </div>
      <div className='characters-list-page__list'>
        <CharacterCardWidget
          mode='edit'
          image={<TestImageRick />}
        />
      </div>
    </div>
  );
};
