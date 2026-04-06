import { LoadingIcon } from '@/assets';
import { ClassNames } from '@/shared/helpers';

import './Loader.scss';

interface ILoaderProps {
  size: 'small' | 'large';
  text?: string;
}

export const Loader = ({ size, text }: ILoaderProps) => {
  return (
    <div className={ClassNames('loader', `loader_size_${size}`)}>
      <img
        className='loader__img'
        src={LoadingIcon}
        alt='Loading characters...'
      />
      {text && <p className='loader__text'>{text}</p>}
    </div>
  );
};
