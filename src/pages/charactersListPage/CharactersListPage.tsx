import { useState } from 'react';

import { MainIcon } from '@/assets';
import { FilterPanelWidget } from '@/widgets';
import type { CharacterFilters } from '@/widgets/filterPanelWidget';

import './CharactersListPage.scss';

export const CharactersListPage = () => {
  const [filterValues, setFilterValues] = useState<CharacterFilters>({
    name: '',
    status: '',
    species: '',
    gender: ''
  });

  return (
    <div className='characters-list-page'>
      <img
        src={MainIcon}
        alt='Rick and Morty'
        className='characters-list-page__logo'
      />
      <div className='characters-list-page__list'>
        <FilterPanelWidget
          values={filterValues}
          onChange={setFilterValues}
        />
      </div>
    </div>
  );
};
