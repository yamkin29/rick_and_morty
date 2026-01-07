import './Header.css';
import { LogoIcon, SunIcon } from '@/assets';

const Header = () => {
  return (
    <>
      <div className='header__logo'>
        <LogoIcon />
      </div>
      <div className='header__actions'>
        <button className='header__button header__button--sun'>
          <SunIcon />
        </button>
        <button className='header__button'>
          <div className='header__button-text'>РУ</div>
        </button>
      </div>
    </>
  );
};

export default Header;
