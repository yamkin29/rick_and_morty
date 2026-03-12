import type { StatusVariants } from '@/shared/types';
import type { CharacterCardData } from '@/widgets/characterCard';

export interface IApiCharacter {
  id: number;
  name: string;
  image: string;
  gender: string;
  species: string;
  status: string;
  location: { name: string };
}

const normalizeStatus = (value: string): StatusVariants => {
  const res = value.toLowerCase();
  if (res === 'alive' || res === 'dead' || res === 'unknown') {
    return res;
  }

  return 'unknown';
};

export const characterAdapter = (item: IApiCharacter): CharacterCardData => {
  return {
    id: String(item.id),
    name: item.name,
    status: normalizeStatus(item.status),
    species: item.species,
    gender: item.gender,
    location: item.location.name,
    image: item.image
  };
};
