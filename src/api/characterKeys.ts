import type { CharacterFilters } from '@/shared/types';

const charactersRootKey = ['characters'] as const;

export const characterKeys = {
  all: charactersRootKey,
  list: (filters: CharacterFilters) => [...charactersRootKey, 'list', filters] as const,
  detail: (id: string | undefined) => [...charactersRootKey, 'detail', id] as const
};
