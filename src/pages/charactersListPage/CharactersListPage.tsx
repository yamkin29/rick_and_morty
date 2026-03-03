import { useState } from 'react';

import { MainIcon } from '@/assets';
import { CharacterCardWidget, FilterPanelWidget } from '@/widgets';
import type { CharacterCardData } from '@/widgets/characterCardWidget';
import type { CharacterFilters } from '@/widgets/filterPanelWidget';

import './CharactersListPage.scss';

export const CharactersListPage = () => {
  const [filterValues, setFilterValues] = useState<CharacterFilters>({
    name: ''
  });

  const character: CharacterCardData = {
    id: '1',
    name: 'Rick Sanchez',
    status: 'alive',
    species: 'Human',
    gender: 'Male',
    location: 'Earth',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
  };

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
        <CharacterCardWidget data={character} />
      </div>
    </div>
  );
};
