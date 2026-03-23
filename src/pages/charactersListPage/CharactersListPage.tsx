import { useCallback, useEffect, useRef, useState } from 'react';

import { toast } from 'react-hot-toast';

import axios from 'axios';

import { api } from '@/api';
import { MainIcon } from '@/assets';
import { Loader } from '@/shared/components';
import { InfinityScroll } from '@/shared/components';
import { ClassNames } from '@/shared/helpers';
import { CharacterCard, FilterPanel } from '@/widgets';
import type { CharacterCardData } from '@/widgets/characterCard';
import type { CharacterFilters } from '@/widgets/filterPanel';

import { characterAdapter, type IApiCharacter } from './characterListPage.adapter';

import './CharactersListPage.scss';

type loadMode = 'initial' | 'loadMore';

export const CharactersListPage = () => {
  const [characters, setCharacters] = useState<CharacterCardData[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [filterValues, setFilterValues] = useState<CharacterFilters>({
    name: ''
  });

  const controllerRef = useRef<AbortController | null>(null);

  const getCharacters = useCallback(
    async (pageToLoad: number, mode: loadMode) => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();
      controllerRef.current = controller;

      if (mode === 'initial') {
        setIsInitialLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      try {
        const result = await api.get(`/character`, {
          signal: controller.signal,
          params: {
            name: filterValues.name,
            species: filterValues.species,
            gender: filterValues.gender,
            status: filterValues.status,
            page: pageToLoad
          }
        });

        if (controller.signal.aborted) {
          return;
        }

        const hasMore = result.data.info.next !== null;
        setHasMore(hasMore);

        const characters: CharacterCardData[] = result.data.results.map((item: IApiCharacter) => {
          return characterAdapter(item);
        });

        if (mode === 'initial') {
          setCharacters(characters);
        } else {
          setCharacters((prevState) => [...prevState, ...characters]);
        }

        setPage(pageToLoad);
      } catch (e: unknown) {
        if (axios.isCancel(e)) {
          return;
        }

        if (axios.isAxiosError(e) && e.response?.status === 404) {
          if (mode === 'initial') {
            setCharacters([]);
            setHasMore(false);
            setPage(1);
          }

          return;
        }

        const message = e instanceof Error ? e.message : 'Something went wrong.';
        toast.error(message);
      } finally {
        if (!controller.signal.aborted) {
          if (mode === 'initial') {
            setIsInitialLoading(false);
          } else {
            setIsLoadingMore(false);
          }
        }
      }
    },
    [filterValues]
  );

  const handleLoadMore = () => {
    if (isInitialLoading || isLoadingMore || !hasMore) {
      return;
    }

    void getCharacters(page + 1, 'loadMore');
  };

  const handleCharacterSave = useCallback((updatedCharacter: CharacterCardData) => {
    setCharacters((prevState) => {
      return prevState.map((character) => {
        if (character.id !== updatedCharacter.id) {
          return character;
        }

        return updatedCharacter;
      });
    });
  }, []);

  useEffect(() => {
    void getCharacters(1, 'initial');

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [getCharacters]);

  return (
    <div className='characters-list-page'>
      <img
        src={MainIcon}
        alt='Rick and Morty'
        className='characters-list-page__logo'
      />
      <FilterPanel
        values={filterValues}
        onChange={setFilterValues}
      />
      <div
        className={ClassNames('characters-list-page__results', {
          'characters-list-page__results--empty': !isInitialLoading && characters.length === 0
        })}
      >
        {isInitialLoading ? (
          <Loader size='large' />
        ) : characters.length === 0 ? (
          <div className='characters-list-page__empty-state'>Character list is empty...</div>
        ) : (
          <>
            <div className='characters-list-page__grid'>
              {characters.map((character: CharacterCardData) => (
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
};
