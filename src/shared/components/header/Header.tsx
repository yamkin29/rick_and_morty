import SvgIcon from '../utils/SvgIcon.tsx';
import './Header.css';

export const Header = () => {
  return (
    <div className='header'>
      <div className='header__logo'>
        <SvgIcon
          iconName='icon'
          svgProp={{ width: 48, height: 50, fill: 'rgba(0, 0, 0, 1)' }}
        />
      </div>
      <div className='header__actions'>
        <button className='header__button header__button--sun'>
          <SvgIcon
            iconName='sun'
            svgProp={{ width: 30, height: 30, fill: 'black' }}
          />
        </button>
        <button className='header__button'>
          <div className='header__button-text'>РУ</div>
        </button>
      </div>
    </div>
  );
};
