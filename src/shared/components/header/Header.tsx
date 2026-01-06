import './Header.css';
import { Icon, Sun } from '@/assets';

const Header = () => {
  return (
    <>
      <div className='header__logo'>
        <Icon />
      </div>
      <div className='header__actions'>
        <button className='header__button header__button--sun'>
          <Sun />
        </button>
        <button className='header__button'>
          <div className='header__button-text'>РУ</div>
        </button>
      </div>
    </>
  );
};

export default Header;
