import { MainIcon } from '@/assets';
import { CharacterCardWidget } from '@/widgets';
import type { CharacterCardData } from '@/widgets/characterCardWidget/types.ts';

import './CharactersListPage.scss';

const character: CharacterCardData = {
  id: '1',
  name: 'Rick Sanchez',
  status: 'alive',
  species: 'Human',
  gender: 'Male',
  location: 'Earth',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
};

export const CharactersListPage = () => {
  return (
    <div className='characters-list-page'>
      <img
        src={MainIcon}
        alt='Rick and Morty'
        className='characters-list-page__logo'
      />
      <div className='characters-list-page__list'>
        <CharacterCardWidget data={character} />
      </div>
    </div>
  );
};
