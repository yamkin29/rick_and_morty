import { LogoIcon, SunIcon } from '@/assets';
import { ClassNames } from '@/shared/helpers';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles['header__logo']}>
        <LogoIcon />
      </div>
      <div className={styles['header__actions']}>
        <button
          className={ClassNames(styles['header__button'], styles['header__button--sun'])}
          type='button'
        >
          <SunIcon />
        </button>
        <button
          className={styles['header__button']}
          type='button'
        >
          <div className={styles['header__button-text']}>RU</div>
        </button>
      </div>
    </div>
  );
};
