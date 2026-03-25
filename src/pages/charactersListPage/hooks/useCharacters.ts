import { useCallback, useEffect, useRef, useState } from 'react';

import { toast } from 'react-hot-toast';

import axios from 'axios';

import { api } from '@/api';
import { CharacterAdapter, type IApiCharacterDetails } from '@/shared/helpers';
import type { ICharacterData } from '@/shared/types';
import type { CharacterFilters } from '@/widgets/filterPanel';

type LoadMode = 'initial' | 'loadMore';

export const useCharacters = () => {
  const [characters, setCharacters] = useState<ICharacterData[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [filterValues, setFilterValues] = useState<CharacterFilters>({ name: '' });

  const controllerRef = useRef<AbortController | null>(null);

  const { name, species, gender, status } = filterValues;

  const fetchCharacters = useCallback(
    async (pageToLoad: number, mode: LoadMode) => {
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
        const result = await api.get('/character', {
          signal: controller.signal,
          params: {
            name,
            species,
            gender,
            status,
            page: pageToLoad
          }
        });

        if (controller.signal.aborted) {
          return;
        }

        const nextCharacters: ICharacterData[] = result.data.results.map((item: IApiCharacterDetails) =>
          CharacterAdapter(item)
        );

        setHasMore(result.data.info.next !== null);
        setPage(pageToLoad);

        if (mode === 'initial') {
          setCharacters(nextCharacters);
        } else {
          setCharacters((prev) => [...prev, ...nextCharacters]);
        }
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
    [name, species, gender, status]
  );

  const handleLoadMore = useCallback(() => {
    if (isInitialLoading || isLoadingMore || !hasMore) {
      return;
    }

    void fetchCharacters(page + 1, 'loadMore');
  }, [fetchCharacters, hasMore, isInitialLoading, isLoadingMore, page]);

  const handleCharacterSave = useCallback((updatedCharacter: ICharacterData) => {
    setCharacters((prev) =>
      prev.map((character) => (character.id === updatedCharacter.id ? updatedCharacter : character))
    );
  }, []);

  useEffect(() => {
    void fetchCharacters(1, 'initial');

    return () => {
      controllerRef.current?.abort();
    };
  }, [fetchCharacters]);

  return {
    characters,
    filterValues,
    setFilterValues,
    isInitialLoading,
    isLoadingMore,
    hasMore,
    handleLoadMore,
    handleCharacterSave
  };
};
