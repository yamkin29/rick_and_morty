import './Loader.css';
import { Loading, LoadingSmall } from '@/assets';
interface ILoaderProps {
  size: 'small' | 'large';
  text?: string;
}

const Loader = ({ size, text = 'Loading characters...' }: ILoaderProps) => {
  return size === 'large' ? (
    <div className='loader'>
      <div className='loader__logo'>
        <Loading />
      </div>
      <div className='loader__text'>{text}</div>
    </div>
  ) : (
    <div className='loader'>
      <div className='loader__logo'>
        <LoadingSmall />
      </div>
    </div>
  );
};

export default Loader;
