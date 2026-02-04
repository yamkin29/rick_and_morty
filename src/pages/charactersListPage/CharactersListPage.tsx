import { useState } from 'react';

import { MainIcon } from '@/assets';
import Select from '@/shared/components/select/Select.tsx';

import './CharactersListPage.css';

const CharactersListPage = () => {
  const [value, setValue] = useState<string | null>(null);

  const handleChange = (newValue: string | null) => setValue(newValue);

  const mockOptions = [
    {
      label: 'Human',
      value: 'human'
    },
    {
      label: 'Alien',
      value: 'alien'
    },
    {
      label: 'Humanoid',
      value: 'humanoid'
    },
    {
      label: 'Animal',
      value: 'animal'
    },
    {
      label: 'Robot',
      value: 'robot'
    }
  ];

  return (
    <div className='characters-list-page'>
      <div className='characters-list-page__logo'>
        <MainIcon />
      </div>
      <div className='characters-list-page__list'>
        <Select
          placeholder='Species'
          options={mockOptions}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default CharactersListPage;
