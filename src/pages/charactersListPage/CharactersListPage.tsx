import SvgIcon from '../../components/utils/SvgIcon';
import './CharactersListPage.css';
import { Loader } from '../../components/loader/Loader.tsx';

export const CharactersListPage = () => {
  return (
    <div className='charactersListPage__container'>
      <div className='charactersListPage__logo'>
        <SvgIcon
          iconName='main'
          svgProp={{ width: 600, height: 200, fill: 'black' }}
        />
      </div>
      <div className='charactersListPage__list'>
        <Loader size={'large'} />
      </div>
    </div>
  );
};
