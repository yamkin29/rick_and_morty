import { useId } from 'react';

import { SearchIcon } from '@/assets';
import { Input, Select } from '@/shared/components';
import { GENDER_FILTER_OPTIONS, SPECIES_FILTER_OPTIONS, STATUS_FILTER_OPTIONS } from '@/shared/constans';
import type { CharacterFilters } from '@/widgets/filterPanelWidget/types.ts';

import './FilterPanelWidget.scss';

interface IFilterPanelWidgetProps {
  values: CharacterFilters;
  onChange: (values: CharacterFilters) => void;
}

export const FilterPanelWidget = ({ values, onChange }: IFilterPanelWidgetProps) => {
  const nameInputId = useId();

  const handleChange = <K extends keyof CharacterFilters>(key: K, value: CharacterFilters[K]) => {
    onChange({ ...values, [key]: value });
  };

  return (
    <div className='filter-panel'>
      <Input
        icon={<SearchIcon />}
        placeholder='Filter by name...'
        value={values.name}
        id={nameInputId}
        onChange={(value) => handleChange('name', value)}
        className='filter-panel__input'
      />
      <Select
        placeholder='Species'
        options={SPECIES_FILTER_OPTIONS}
        value={values.species}
        onChange={(value) => handleChange('species', value ?? '')}
        className='filter-panel__select'
      ></Select>
      <Select
        placeholder='Gender'
        options={GENDER_FILTER_OPTIONS}
        value={values.gender}
        onChange={(value) => handleChange('gender', value ?? '')}
        className='filter-panel__select'
      ></Select>
      <Select
        placeholder='Status'
        options={STATUS_FILTER_OPTIONS}
        value={values.status}
        onChange={(value) => handleChange('status', value ?? '')}
        className='filter-panel__select'
      ></Select>
    </div>
  );
};
