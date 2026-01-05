import SvgIcon from '../../shared/components/utils/SvgIcon';
import './CharactersListPage.css';
import { Loader } from '../../shared/components/loader/Loader.tsx';

export const CharactersListPage = () => {
  return (
    <div className='characters-list-page'>
      <div className='characters-list-page__logo'>
        <SvgIcon
          iconName='main'
          svgProp={{ width: 600, height: 200, fill: 'black' }}
        />
      </div>
      <div className='characters-list-page__list'>
        <Loader size={'large'} />
      </div>
    </div>
  );
};
