import type { GenderVariants, SpeciesVariants, StatusVariants } from '@/shared/types';

export type FilterOption<T> = {
  value: T;
  label: string;
};

export const SPECIES_FILTER_OPTIONS: FilterOption<SpeciesVariants>[] = [
  { value: 'human', label: 'Human' },
  { value: 'alien', label: 'Alien' },
  { value: 'humanoid', label: 'Humanoid' },
  { value: 'animal', label: 'Animal' },
  { value: 'robot', label: 'Robot' },
  { value: 'cronenberg', label: 'Cronenberg' },
  { value: 'disease', label: 'Disease' },
  { value: 'unknown', label: 'Unknown' }
];

export const GENDER_FILTER_OPTIONS: FilterOption<GenderVariants>[] = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'genderless', label: 'Genderless' },
  { value: 'unknown', label: 'Unknown' }
];

export const STATUS_FILTER_OPTIONS: FilterOption<StatusVariants>[] = [
  { value: 'alive', label: 'Alive' },
  { value: 'dead', label: 'Dead' },
  { value: 'unknown', label: 'Unknown' }
];
