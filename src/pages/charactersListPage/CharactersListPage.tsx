import { observer } from 'mobx-react-lite';

import { MainIcon } from '@/assets';
import { useCharacters } from '@/pages/charactersListPage';
import { Loader } from '@/shared/components';
import { InfinityScroll } from '@/shared/components';
import { ClassNames } from '@/shared/helpers';
import type { ICharacterData } from '@/shared/types';
import { charactersListStore } from '@/store/store';
import { CharacterCard, FilterPanel } from '@/widgets';

import './CharactersListPage.scss';

export const CharactersListPage = observer(() => {
  const { characters, isInitialLoading, isLoadingMore, hasMore, handleLoadMore, handleCharacterSave } = useCharacters();

  return (
    <div className='characters-list-page'>
      <img
        src={MainIcon}
        alt='Rick and Morty'
        className='characters-list-page__logo'
      />
      <FilterPanel
        values={charactersListStore.filterValues}
        onChange={charactersListStore.setFilterValues}
      />
      <div
        className={ClassNames('characters-list-page__results', {
          'characters-list-page__results--empty': !isInitialLoading && characters.length === 0
        })}
      >
        {isInitialLoading ? (
          <Loader
            size='large'
            text='Loading characters...'
          />
        ) : characters.length === 0 ? (
          <div className='characters-list-page__empty-state'>Character list is empty...</div>
        ) : (
          <>
            <div className='characters-list-page__grid'>
              {characters.map((character: ICharacterData) => (
                <CharacterCard
                  key={character.id}
                  data={character}
                  onSave={handleCharacterSave}
                />
              ))}
            </div>
            <InfinityScroll
              hasMore={hasMore}
              loader={<Loader size='small' />}
              isLoadingMore={isLoadingMore}
              onLoadMore={handleLoadMore}
            />
          </>
        )}
      </div>
    </div>
  );
});
