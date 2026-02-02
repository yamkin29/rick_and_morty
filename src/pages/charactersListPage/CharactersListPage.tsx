import React, { useState } from 'react';

import { MainIcon } from '@/assets';
import Select from '@/shared/components/select/Select.tsx';

import './CharactersListPage.css';

const CharactersListPage = () => {
  const [value, setValue] = useState<string | null>(null);

  const handleChange = (newValue: string | null) => setValue(newValue);

  const mockOptions = [
    {
      label: 'Test1',
      value: 'test1'
    },
    {
      label: 'Test2',
      value: 'test2'
    },
    {
      label: 'Test3',
      value: 'test3'
    },
    {
      label: 'Test4',
      value: 'test4'
    }
  ];

  return (
    <div className='characters-list-page'>
      <div className='characters-list-page__logo'>
        <MainIcon />
      </div>
      <div className='characters-list-page__list'>
        <Select
          placeholder='Change options...'
          options={mockOptions}
          value={value}
          onChange={handleChange}
          OptionComponent={({ option }) => <span>{option.value}123</span>}
        />
      </div>
    </div>
  );
};

export default CharactersListPage;
