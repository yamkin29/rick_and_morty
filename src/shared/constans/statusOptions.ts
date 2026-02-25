import type { StatusVariants } from '@/shared/types/statusVariants.ts';

export type StatusOption = {
  label: string;
  value: StatusVariants;
};

export const STATUS_OPTIONS: StatusOption[] = [
  { label: 'Alive', value: 'alive' },
  { label: 'Dead', value: 'dead' },
  { label: 'Unknown', value: 'unknown' }
];
