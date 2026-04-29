import { useCallback } from 'react';

import { type InfiniteData, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { characterKeys, fetchCharactersPage, type IApiCharactersPage } from '@/api';
import { CharacterAdapter } from '@/shared/helpers';
import { useDebounce } from '@/shared/hooks';
import type { ICharacterData } from '@/shared/types';
import { charactersListStore } from '@/store/rootStore';

type CharactersPage = {
  characters: ICharacterData[];
  nextPage?: number;
};

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
    IApiCharactersPage,
    Error,
    InfiniteData<CharactersPage>,
    ReturnType<typeof characterKeys.list>,
    number
  >({
    queryKey,
    initialPageParam: 1,
    queryFn: ({ pageParam, signal }) => fetchCharactersPage({ page: pageParam, filters, signal }),
    getNextPageParam: (lastPage, _allPages, lastPageParam) => (lastPage.info.next ? lastPageParam + 1 : undefined),
    select: (data) => ({
      ...data,
      pages: data.pages.map((page, index) => ({
        characters: page.results.map(CharacterAdapter),
        nextPage: page.info.next ? data.pageParams[index] + 1 : undefined
      }))
    })
  });

  const characters = query.data?.pages.flatMap((page) => page.characters) ?? [];

  const handleLoadMore = useCallback(() => {
    if (!query.hasNextPage || query.isFetchingNextPage) {
      return;
    }

    void query.fetchNextPage();
  }, [query]);

  const handleCharacterSave = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: characterKeys.all });
  }, [queryClient]);

  return {
    characters,
    hasNextPage: query.hasNextPage ?? false,
    isFetchingNextPage: query.isFetchingNextPage,
    isPending: query.isPending,
    handleLoadMore,
    handleCharacterSave
  };
};
