import { makeAutoObservable } from 'mobx';

import type { ICharacterData } from '@/shared/types';
import type { CharacterFilters } from '@/widgets/filterPanel';

export class CharactersListStore {
  characters: ICharacterData[] = [];
  page = 1;
  hasMore = false;
  isInitialLoading = false;
  isLoadingMore = false;
  filterValues: CharacterFilters = { name: '' };

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setFilterValues(values: CharacterFilters) {
    this.filterValues = values;
  }

  setCharacters(characters: ICharacterData[]) {
    this.characters = characters;
  }

  appendCharacters(nextCharacters: ICharacterData[]) {
    this.characters = [...this.characters, ...nextCharacters];
  }

  updateCharacter(updatedCharacter: ICharacterData) {
    this.characters = this.characters.map((character) =>
      character.id === updatedCharacter.id ? updatedCharacter : character
    );
  }

  setPage(page: number) {
    this.page = page;
  }

  setHasMore(value: boolean) {
    this.hasMore = value;
  }

  setInitialLoading(value: boolean) {
    this.isInitialLoading = value;
  }

  setLoadingMore(value: boolean) {
    this.isLoadingMore = value;
  }

  get isEmpty() {
    return !this.isInitialLoading && this.characters.length === 0;
  }

  get canLoadMore() {
    return !this.isInitialLoading && !this.isLoadingMore && this.hasMore;
  }
}
