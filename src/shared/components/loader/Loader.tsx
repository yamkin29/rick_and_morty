import './Loader.css';
import SvgIcon from '../utils/SvgIcon.tsx';

interface ILoaderProps {
  size: 'small' | 'large';
  text?: string;
}

export const Loader = ({ size, text = 'Loading characters...' }: ILoaderProps) => {
  return size === 'large' ? (
    <div className='loader'>
      <div className='loader__logo'>
        <SvgIcon
          iconName='loader'
          svgProp={{ width: 475, height: 465 }}
        />
      </div>
      <div className='loader__text'>{text}</div>
    </div>
  ) : (
    <div className='loader'>
      <div className='loader__logo'>
        <SvgIcon
          iconName='loader'
          svgProp={{ width: 103, height: 101 }}
        />
      </div>
    </div>
  );
};
