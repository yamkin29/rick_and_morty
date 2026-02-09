import { useState } from 'react';

import { MainIcon } from '@/assets';
import Input from '@/shared/components/input/Input.tsx';

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
          onChange={handleChange}
          variant='form'
          size='medium'
          icon={false}
          onClear={() => setValue('')}
        />
      </div>
    </div>
  );
};

export default CharactersListPage;
