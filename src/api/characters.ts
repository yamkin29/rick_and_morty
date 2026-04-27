import type { IApiCharacterDetails } from '@/shared/helpers';
import type { CharacterFilters } from '@/shared/types';

import { api } from './api';

export interface IApiCharactersPage {
  info: {
    next: string | null;
  };
  results: IApiCharacterDetails[];
}

interface FetchCharactersPageParams {
  page: number;
  filters: CharacterFilters;
  signal?: AbortSignal;
}

export const fetchCharactersPage = async ({
  page,
  filters,
  signal
}: FetchCharactersPageParams): Promise<IApiCharactersPage> => {
  const result = await api.get<IApiCharactersPage>('/character', {
    signal,
    params: {
      name: filters.name || undefined,
      species: filters.species,
      gender: filters.gender,
      status: filters.status,
      page
    }
  });

  return result.data;
};

interface FetchCharacterParams {
  id: string;
  signal?: AbortSignal;
}

export const fetchCharacter = async ({ id, signal }: FetchCharacterParams): Promise<IApiCharacterDetails> => {
  const result = await api.get<IApiCharacterDetails>(`/character/${id}`, {
    signal
  });

  return result.data;
};
