export type SpeciesFilter = 'Human' | 'Alien' | 'Humanoid' | 'Animal' | 'Robot' | 'Cronenberg' | 'Disease' | 'Unknown';
export type GenderFilter = 'female' | 'male' | 'genderless' | 'unknown';
export type StatusFilter = 'Alive' | 'Dead' | 'Unknown';

export type FilterOption<T> = {
  value: T;
  label: string;
};

export const SPECIES_FILTER_OPTIONS: FilterOption<SpeciesFilter>[] = [
  { value: 'Human', label: 'Human' },
  { value: 'Alien', label: 'Alien' },
  { value: 'Humanoid', label: 'Humanoid' },
  { value: 'Animal', label: 'Animal' },
  { value: 'Robot', label: 'Robot' },
  { value: 'Cronenberg', label: 'Cronenberg' },
  { value: 'Disease', label: 'Disease' },
  { value: 'Unknown', label: 'Unknown' }
];

export const GENDER_FILTER_OPTIONS: FilterOption<GenderFilter>[] = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'genderless', label: 'Genderless' },
  { value: 'unknown', label: 'Unknown' }
];

export const STATUS_FILTER_OPTIONS: FilterOption<StatusFilter>[] = [
  { value: 'Alive', label: 'Alive' },
  { value: 'Dead', label: 'Dead' },
  { value: 'Unknown', label: 'Unknown' }
];
