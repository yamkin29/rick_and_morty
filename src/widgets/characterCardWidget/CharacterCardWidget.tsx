import React, { useState } from 'react';

import { Input, Select } from '@/shared/components';
import { ClassNames } from '@/shared/helpers';

import './CharacterCardWidget.css';

type StatusVariants = 'alive' | 'dead' | 'unknown';
type Option = { label: string; value: StatusVariants };

interface ICharacterCardWidgetProps {
  characterId?: string;
  mode: 'view' | 'edit';
  image: React.ReactNode;
}

const options: Option[] = [
  { label: 'Alive', value: 'alive' },
  { label: 'Dead', value: 'dead' },
  { label: 'Unknown', value: 'unknown' }
];

const StatusOption = ({ option }: { option: Option }) => {
  return (
    <div className={ClassNames('character-card__status-option')}>
      <div>{option.label}</div>
      <div className={ClassNames('character-card__status-dot', `character-card__status-dot--${option.value}`)}></div>
    </div>
  );
};

export const CharacterCardWidget = ({ characterId, mode, image }: ICharacterCardWidgetProps) => {
  const [selectValue, setSelectValue] = useState<StatusVariants | null>('alive');
  const [nameValue, setNameValue] = useState<string>('Rick Sanchez');
  const [locationValue, setLocationValue] = useState<string>('Earth');

  const currentOption = options.find((option) => option.value === selectValue) ?? options[0];

  const nameInputId = `character-${characterId}-name`;
  const locationInputId = `character-${characterId}-location`;

  const handleSelectClick = (newSelectValue: StatusVariants | null) => {
    setSelectValue(newSelectValue);
  };

  const handleInputNameClick = (newNameValue: string) => {
    setNameValue(newNameValue);
  };

  const handleSelectLocationClick = (newLocationValue: string) => {
    setLocationValue(newLocationValue);
  };

  return (
    <div className={ClassNames('character-card', `character-card--${mode}`)}>
      <div className={ClassNames('character-card__media')}>{image}</div>
      <div className={ClassNames('character-card__content')}>
        <div className={ClassNames('character-card__title')}>
          {mode === 'view' ? (
            nameValue
          ) : (
            <Input
              value={nameValue}
              id={nameInputId}
              onChange={handleInputNameClick}
              variant='underlined'
            />
          )}
        </div>
        <div className={ClassNames('character-card__meta-item')}>
          <div className={ClassNames('character-card__meta-label')}>Gender</div>
          <div className={ClassNames('character-card__meta-value')}>Male</div>
        </div>
        <div className={ClassNames('character-card__meta-item')}>
          <div className={ClassNames('character-card__meta-label')}>Species</div>
          <div className={ClassNames('character-card__meta-value')}>Human</div>
        </div>
        <div className={ClassNames('character-card__meta-item')}>
          <div className={ClassNames('character-card__meta-label')}>Location</div>
          <div className={ClassNames('character-card__meta-value')}>
            {mode === 'view' ? (
              locationValue
            ) : (
              <Input
                value={locationValue}
                id={locationInputId}
                onChange={handleSelectLocationClick}
                variant='underlined'
                className={ClassNames('character-card__location')}
              />
            )}
          </div>
        </div>
        <div className={ClassNames('character-card__status')}>
          <div className={ClassNames('character-card__meta-label')}>Status</div>
          <div className={ClassNames('character-card__status-value')}>
            {mode === 'view' ? (
              <StatusOption option={currentOption} />
            ) : (
              <Select
                options={options}
                value={selectValue}
                onChange={handleSelectClick}
                size='small'
                OptionComponent={StatusOption}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
