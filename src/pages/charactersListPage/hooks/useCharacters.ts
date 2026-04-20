import { useCallback, useEffect } from 'react';

import { type InfiniteData, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { characterKeys, type CharactersPage, fetchCharactersPage } from '@/api';
import { useDebounce } from '@/shared/hooks';
import type { ICharacterData } from '@/shared/types';
import { charactersListStore } from '@/store/rootStore';

export const useCharacters = () => {
  const debouncedName = useDebounce(charactersListStore.filterValues.name, 500);
  const { species, gender, status } = charactersListStore.filterValues;
  const queryClient = useQueryClient();

  const filters = {
    name: debouncedName,
    species,
    gender,
    status
  };
  const queryKey = characterKeys.list(filters);

  const query = useInfiniteQuery<
    CharactersPage,
    Error,
    InfiniteData<CharactersPage>,
    ReturnType<typeof characterKeys.list>,
    number
  >({
    queryKey,
    initialPageParam: 1,
    queryFn: ({ pageParam, signal }) => fetchCharactersPage({ page: pageParam, filters, signal }),
    getNextPageParam: (lastPage) => lastPage.nextPage
  });

  const characters = query.data?.pages.flatMap((page) => page.characters) ?? [];

  const handleLoadMore = useCallback(() => {
    if (!query.hasNextPage || query.isFetchingNextPage) {
      return;
    }

    void query.fetchNextPage();
  }, [query]);

  const handleCharacterSave = useCallback(
    (updatedCharacter: ICharacterData) => {
      queryClient.setQueryData<InfiniteData<CharactersPage>>(queryKey, (currentData) => {
        if (!currentData) {
          return currentData;
        }

        return {
          ...currentData,
          pages: currentData.pages.map((page) => ({
            ...page,
            characters: page.characters.map((character) =>
              character.id === updatedCharacter.id ? updatedCharacter : character
            )
          }))
        };
      });
    },
    [queryClient, queryKey]
  );

  useEffect(() => {
    if (!query.isError) {
      return;
    }

    const message = query.error instanceof Error ? query.error.message : 'Something went wrong.';
    toast.error(message);
  }, [query.error, query.isError]);

  return {
    characters,
    hasNextPage: query.hasNextPage ?? false,
    isFetchingNextPage: query.isFetchingNextPage,
    isPending: query.isPending,
    handleLoadMore,
    handleCharacterSave
  };
};
