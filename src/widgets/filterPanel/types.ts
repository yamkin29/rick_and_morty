import type { GenderVariants, SpeciesVariants, StatusVariants } from '@/shared/types';

export type CharacterFilters = {
  name: string;
  species?: SpeciesVariants;
  gender?: GenderVariants;
  status?: StatusVariants;
};
