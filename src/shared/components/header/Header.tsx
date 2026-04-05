import { LogoIcon, SunIcon } from '@/assets';
import { ClassNames } from '@/shared/helpers';

import './Header.scss';

export const Header = () => {
  return (
    <div className='header'>
      <div className='header__logo'>
        <LogoIcon />
      </div>
      <div className='header__actions'>
        <button
          className={ClassNames('header__button', 'header__button--sun')}
          type='button'
        >
          <SunIcon />
        </button>
        <button
          className='header__button'
          type='button'
        >
          <div className='header__button--text'>РУ</div>
        </button>
      </div>
    </div>
  );
};
