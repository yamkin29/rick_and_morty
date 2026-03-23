import type { StatusVariants } from '@/shared/types';
import type { ICharacterCardData } from '@/widgets/characterCard';

export interface IApiCharacterDetails {
  id: number;
  name: string;
  image: string;
  gender: string;
  species: string;
  status: string;
  type: string;
  origin: { name: string };
  location: { name: string };
}

const normalizeStatus = (value: string): StatusVariants => {
  const res = value.toLowerCase();
  if (res === 'alive' || res === 'dead' || res === 'unknown') {
    return res;
  }

  return 'unknown';
};

export const CharacterAdapter = (item: IApiCharacterDetails): ICharacterCardData => {
  return {
    id: String(item.id),
    image: item.image,
    name: item.name,
    gender: item.gender,
    status: normalizeStatus(item.status),
    species: item.species,
    type: item.type || 'Unknown',
    origin: item.origin.name,
    location: item.location.name
  };
};
