import { useQuery } from '@tanstack/react-query';

import { characterKeys, fetchCharacter } from '@/api';
import { CharacterAdapter, type IApiCharacterDetails, IsNotFoundError } from '@/shared/helpers';
import type { ICharacterData } from '@/shared/types';

export const useCharacter = (id: string | undefined) => {
  const query = useQuery<IApiCharacterDetails, Error, ICharacterData>({
    queryKey: characterKeys.detail(id),
    enabled: Boolean(id),
    queryFn: ({ signal }) => fetchCharacter({ id: id!, signal }),
    select: CharacterAdapter
  });

  const isNotFound = query.isError && IsNotFoundError(query.error);

  return {
    character: query.data ?? null,
    isLoading: query.isPending,
    isNotFound
  };
};
