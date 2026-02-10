import { useState } from 'react';

import { MainIcon, SearchIcon } from '@/assets';
import { Input } from '@/shared/components';

import './CharactersListPage.css';

const CharactersListPage = () => {
  const [value, setValue] = useState<string>('');

  const handleChange = (newValue: string) => setValue(newValue);

  return (
    <div className='characters-list-page'>
      <div className='characters-list-page__logo'>
        <MainIcon />
      </div>
      <div className='characters-list-page__list'>
        <Input
          placeholder='Filter by name...'
          value={value}
          id='input'
          onChange={handleChange}
          variant='underlined'
          // icon={<SearchIcon />}
        />
      </div>
    </div>
  );
};

export default CharactersListPage;
