import { useEffect, useState } from 'react';

import { toast } from 'react-hot-toast';

import axios from 'axios';

import { api } from '@/api';
import { MainIcon } from '@/assets';
import { Loader } from '@/shared/components';
import { CharacterCard, FilterPanel } from '@/widgets';
import type { CharacterCardData } from '@/widgets/characterCard';
import type { CharacterFilters } from '@/widgets/filterPanel';

import { characterAdapter, type IApiCharacter } from './characterListPage.adapter';

import './CharactersListPage.scss';

export const CharactersListPage = () => {
  const [characters, setCharacters] = useState<CharacterCardData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterValues, setFilterValues] = useState<CharacterFilters>({
    name: ''
  });

  useEffect(() => {
    const controller = new AbortController();

    const getCharacters = async () => {
      setIsLoading(true);

      try {
        const result = await api.get(`/character`, {
          signal: controller.signal,
          params: {
            name: filterValues.name,
            species: filterValues.species,
            gender: filterValues.gender,
            status: filterValues.status
          }
        });

        if (controller.signal.aborted) {
          return;
        }

        const characters: CharacterCardData[] = result.data.results.map((item: IApiCharacter) => {
          return characterAdapter(item);
        });
        setCharacters(characters);
      } catch (e: unknown) {
        if (axios.isCancel(e)) {
          return;
        }

        const message = e instanceof Error ? e.message : 'Something went wrong.';
        toast.error(message);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void getCharacters();

    return () => {
      controller.abort();
    };
  }, [filterValues]);

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
      {isLoading ? (
        <Loader size='large' />
      ) : (
        <div className='characters-list-page__grid'>
          {characters.map((character: CharacterCardData) => (
            <CharacterCard
              key={character.id}
              data={character}
            />
          ))}
        </div>
      )}
    </div>
  );
};
