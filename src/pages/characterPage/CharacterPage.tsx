import { BackIcon } from '@/assets';

import './CharacterPage.scss';

export const CharacterPage = () => {
  return (
    <div className='character-page'>
      <div className='character-page__back-button'>
        <button className='character-page__button'>
          <BackIcon />
          <div className='character-page__text'>GO BACK</div>
        </button>
      </div>
    </div>
  );
};
