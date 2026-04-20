import { CharacterAdapter, type IApiCharacterDetails, IsNotFoundError } from '@/shared/helpers';
import type { CharacterFilters, ICharacterData } from '@/shared/types';

import { api } from './api';

export type CharactersPage = {
  characters: ICharacterData[];
  nextPage?: number;
};

interface FetchCharactersPageParams {
  page: number;
  filters: CharacterFilters;
  signal?: AbortSignal;
}

export const fetchCharactersPage = async ({
  page,
  filters,
  signal
}: FetchCharactersPageParams): Promise<CharactersPage> => {
  try {
    const result = await api.get('/character', {
      signal,
      params: {
        name: filters.name || undefined,
        species: filters.species,
        gender: filters.gender,
        status: filters.status,
        page
      }
    });

    return {
      characters: result.data.results.map((item: IApiCharacterDetails) => CharacterAdapter(item)),
      nextPage: result.data.info.next ? page + 1 : undefined
    };
  } catch (e: unknown) {
    if (IsNotFoundError(e)) {
      return {
        characters: [],
        nextPage: undefined
      };
    }

    throw e;
  }
};

interface FetchCharacterParams {
  id: string;
  signal?: AbortSignal;
}

export const fetchCharacter = async ({ id, signal }: FetchCharacterParams): Promise<ICharacterData> => {
  const result = await api.get<IApiCharacterDetails>(`/character/${id}`, {
    signal
  });

  return CharacterAdapter(result.data);
};
