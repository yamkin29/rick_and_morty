import { makeAutoObservable } from 'mobx';

import type { CharacterFilters } from '@/shared/types';

export class CharactersListStore {
  filterValues: CharacterFilters = { name: '' };

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setFilterValues(values: CharacterFilters) {
    this.filterValues = values;
  }
}
