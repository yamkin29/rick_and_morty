import type { GenderFilter, SpeciesFilter, StatusFilter } from '@/shared/constans';

export type CharacterFilters = {
  name: string;
  species: SpeciesFilter | '';
  gender: GenderFilter | '';
  status: StatusFilter | '';
};
