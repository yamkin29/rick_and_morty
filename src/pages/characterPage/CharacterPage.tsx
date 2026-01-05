import SvgIcon from '@/shared/components/utils/SvgIcon.tsx';
import './CharacterPage.css';

export const CharacterPage = () => {
  return (
    <div className='character-page'>
      <div className='character-page__back-button'>
        <button className='character-page__button'>
          <SvgIcon
            iconName='back'
            svgProp={{ width: 24, height: 24 }}
          />
          <div className='character-page__text'>GO BACK</div>
        </button>
      </div>
    </div>
  );
};
