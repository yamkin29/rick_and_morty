import './CharacterPage.css';
import { Back } from '@/assets';

const CharacterPage = () => {
  return (
    <div className='character-page'>
      <div className='character-page__back-button'>
        <button className='character-page__button'>
          <Back />
          <div className='character-page__text'>GO BACK</div>
        </button>
      </div>
    </div>
  );
};

export default CharacterPage;
