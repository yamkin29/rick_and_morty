import type { GenderVariants, SpeciesVariants, StatusVariants } from './characterVariants';

export type CharacterFilters = {
  name: string;
  species?: SpeciesVariants;
  gender?: GenderVariants;
  status?: StatusVariants;
};
