import type { StatusVariants } from '@/shared/types';

export interface ICharacterData {
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
