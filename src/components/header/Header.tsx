import SvgIcon from '../utils/SvgIcon';
import './Header.css';

export const Header = () => {
  return (
    <div className='header__container'>
      <div className='header__svg__container'>
        <SvgIcon
          iconName='icon'
          svgProp={{ width: 48, height: 50, fill: 'rgba(0, 0, 0, 1)' }}
        />
      </div>
      <div className='header__buttons__container'>
        <button
          className='header__button'
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <SvgIcon
            iconName='sun'
            svgProp={{ width: 30, height: 30, fill: 'black' }}
          />
        </button>
        <button className='header__button'>РУ</button>
      </div>
    </div>
  );
};
