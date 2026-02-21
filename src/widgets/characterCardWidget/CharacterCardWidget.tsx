import { useState } from 'react';

import { EditModeIcon } from '@/assets';
import { Input, Select } from '@/shared/components';
import { ClassNames } from '@/shared/helpers';
import type { CharacterCardData, CharacterMode, StatusVariants } from '@/widgets/characterCardWidget/types.ts';

import './CharacterCardWidget.css';

type Option = {
  label: string;
  value: StatusVariants;
};

interface ICharacterCardWidgetProps {
  data: CharacterCardData;
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

export const CharacterCardWidget = ({ data }: ICharacterCardWidgetProps) => {
  const [nameValue, setNameValue] = useState<string>(data.name);
  const [selectValue, setSelectValue] = useState<StatusVariants | null>(data.status);
  const [locationValue, setLocationValue] = useState<string>(data.location);
  const [mode, setMode] = useState<CharacterMode>('view');

  const currentOption = options.find((option) => option.value === selectValue) ?? options[0];

  const nameInputId = `character-${data.id}-name`;
  const locationInputId = `character-${data.id}-location`;

  const handleSelectClick = (newSelectValue: StatusVariants | null) => {
    setSelectValue(newSelectValue);
  };

  const handleInputNameClick = (newNameValue: string) => {
    setNameValue(newNameValue);
  };

  const handleSelectLocationClick = (newLocationValue: string) => {
    setLocationValue(newLocationValue);
  };

  const handleChangeModeClick = () => {
    setMode('edit');
  };

  return (
    <div className={ClassNames('character-card', `character-card--${mode}`)}>
      <div className={ClassNames('character-card__media')}>
        <img
          src={data.image}
          alt={data.name}
        />
      </div>
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
          <div className={ClassNames('character-card__meta-value')}>{data.gender}</div>
        </div>
        <div className={ClassNames('character-card__meta-item')}>
          <div className={ClassNames('character-card__meta-label')}>Species</div>
          <div className={ClassNames('character-card__meta-value')}>{data.species}</div>
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
      {mode === 'view' && (
        <button
          type='button'
          className={ClassNames('character-card__edit-button')}
          onClick={handleChangeModeClick}
        >
          <EditModeIcon />
        </button>
      )}
    </div>
  );
};
