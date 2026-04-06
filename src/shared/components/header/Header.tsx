import { LogoIcon, SunIcon } from '@/assets';
import { ClassNames } from '@/shared/helpers';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <LogoIcon />
      </div>
      <div className={styles.actions}>
        <button
          className={ClassNames(styles.button, styles.buttonSun)}
          type='button'
        >
          <SunIcon />
        </button>
        <button
          className={styles.button}
          type='button'
        >
          <div className={styles.buttonText}>RU</div>
        </button>
      </div>
    </div>
  );
};
