import { useCallback, useEffect, useRef } from 'react';

import { toast } from 'react-hot-toast';

import axios, { HttpStatusCode } from 'axios';

import { api } from '@/api';
import { CharacterAdapter, type IApiCharacterDetails, IsNotFoundError } from '@/shared/helpers';
import { useDebounce } from '@/shared/hooks';
import type { ICharacterData } from '@/shared/types';
import { charactersListStore } from '@/store/rootStore';

type LoadMode = 'initial' | 'loadMore';

export const useCharacters = () => {
  const debouncedName = useDebounce(charactersListStore.filterValues.name, 500);

  const controllerRef = useRef<AbortController | null>(null);
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const failedLoadMorePageRef = useRef<number | null>(null);

  const { species, gender, status } = charactersListStore.filterValues;

  const store = charactersListStore;

  const clearPendingRetry = useCallback(() => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
  }, []);

  const fetchCharacters = useCallback(
    async (pageToLoad: number, mode: LoadMode) => {
      clearPendingRetry();

      if (mode === 'initial' && controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();
      controllerRef.current = controller;

      let shouldKeepLoadingMore = false;

      if (mode === 'initial') {
        failedLoadMorePageRef.current = null;
        store.setInitialLoading(true);
      } else {
        store.setLoadingMore(true);
      }

      try {
        const result = await api.get('/character', {
          signal: controller.signal,
          params: {
            name: debouncedName,
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

        store.setHasMore(result.data.info.next !== null);
        failedLoadMorePageRef.current = null;
        store.setPage(pageToLoad);

        if (mode === 'initial') {
          store.setCharacters(nextCharacters);
        } else {
          store.appendCharacters(nextCharacters);
        }
      } catch (e: unknown) {
        if (axios.isCancel(e)) {
          return;
        }

        if (IsNotFoundError(e)) {
          if (mode === 'initial') {
            store.setCharacters([]);
            store.setHasMore(false);
            store.setPage(1);
          }

          return;
        }

        if (mode === 'loadMore') {
          const shouldRetrySilently =
            axios.isAxiosError(e) && (!e.response || e.response.status === HttpStatusCode.TooManyRequests);

          if (shouldRetrySilently) {
            shouldKeepLoadingMore = true;
            retryTimeoutRef.current = setTimeout(() => {
              void fetchCharacters(pageToLoad, 'loadMore');
            }, 1500);
            return;
          }

          failedLoadMorePageRef.current = pageToLoad;
          console.error(e);
          return;
        }

        const message = e instanceof Error ? e.message : 'Something went wrong.';
        toast.error(message);
      } finally {
        if (controllerRef.current === controller) {
          controllerRef.current = null;
        }

        if (!controller.signal.aborted && !shouldKeepLoadingMore) {
          if (mode === 'initial') {
            store.setInitialLoading(false);
          } else {
            store.setLoadingMore(false);
          }
        }
      }
    },
    [clearPendingRetry, store, debouncedName, species, gender, status]
  );

  const handleLoadMore = useCallback(() => {
    if (!store.canLoadMore || failedLoadMorePageRef.current === store.nextPage) {
      return;
    }

    void fetchCharacters(store.nextPage, 'loadMore');
  }, [fetchCharacters, store.canLoadMore, store.nextPage]);

  const handleCharacterSave = useCallback(
    (updatedCharacter: ICharacterData) => {
      store.updateCharacter(updatedCharacter);
    },
    [store]
  );

  useEffect(() => {
    void fetchCharacters(1, 'initial');

    return () => {
      clearPendingRetry();
      controllerRef.current?.abort();
    };
  }, [clearPendingRetry, fetchCharacters]);

  return {
    handleLoadMore,
    handleCharacterSave
  };
};
