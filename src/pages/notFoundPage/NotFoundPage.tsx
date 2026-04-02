import { Link } from 'react-router';

import { NotFoundIcon } from '@/assets';

import './NotFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <div className='not-found-page'>
      <img
        src={NotFoundIcon}
        alt='Not found page'
        className='not-found-page__logo'
      />
      <Link
        to='/characters'
        className='not-found-page__button'
      >
        Go to main page
      </Link>
    </div>
  );
};
