import { type IApiCharacterDetails, IsNotFoundError } from '@/shared/helpers';
import type { CharacterFilters } from '@/shared/types';

import { api } from './api';

export interface IApiCharactersPage {
  info: {
    next: string | null;
  };
  results: IApiCharacterDetails[];
}

const emptyCharactersPage: IApiCharactersPage = {
  info: {
    next: null
  },
  results: []
};

interface FetchCharactersPageParams {
  page: number;
  filters: CharacterFilters;
  signal?: AbortSignal;
}

export const fetchCharactersPage = ({
  page,
  filters,
  signal
}: FetchCharactersPageParams): Promise<IApiCharactersPage> =>
  api
    .get<IApiCharactersPage>('/character', {
      signal,
      params: {
        name: filters.name || undefined,
        species: filters.species,
        gender: filters.gender,
        status: filters.status,
        page
      }
    })
    .then((response) => response.data)
    .catch((error: unknown) => {
      if (IsNotFoundError(error)) {
        return emptyCharactersPage;
      }

      throw error;
    });

interface FetchCharacterParams {
  id: string;
  signal?: AbortSignal;
}

export const fetchCharacter = ({ id, signal }: FetchCharacterParams): Promise<IApiCharacterDetails> =>
  api
    .get<IApiCharacterDetails>(`/character/${id}`, {
      signal
    })
    .then((response) => response.data);
