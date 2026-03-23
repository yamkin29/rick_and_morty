import type { StatusVariants } from '@/shared/types';

export type CharacterMode = 'view' | 'edit';

export interface ICharacterCardData {
  id: string;
  name: string;
  image: string;
  gender: string;
  status: StatusVariants;
  species: string;
  type: string;
  origin: string;
  location: string;
}
