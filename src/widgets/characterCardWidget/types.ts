export type StatusVariants = 'alive' | 'dead' | 'unknown';

export type CharacterMode = 'view' | 'edit';

export interface CharacterCardData {
  id: string;
  name: string;
  image: string;
  gender: string;
  species: string;
  location: string;
  status: StatusVariants;
}
