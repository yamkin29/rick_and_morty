import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { characterKeys, fetchCharacter } from '@/api';
import { IsNotFoundError } from '@/shared/helpers';
import type { ICharacterData } from '@/shared/types';

export const useCharacter = (id: string | undefined) => {
  const query = useQuery<ICharacterData, Error>({
    queryKey: characterKeys.detail(id),
    enabled: Boolean(id),
    queryFn: ({ signal }) => fetchCharacter({ id: id!, signal })
  });

  const isNotFound = query.isError && IsNotFoundError(query.error);

  useEffect(() => {
    if (!query.isError || isNotFound) {
      return;
    }

    const message = query.error instanceof Error ? query.error.message : 'Something went wrong.';
    toast.error(message);
  }, [query.error, query.isError, isNotFound]);

  return {
    character: query.data ?? null,
    isLoading: query.isPending,
    isNotFound
  };
};
