import { memo, useState } from 'react';

import { Link } from 'react-router';

import { CharacterCardCheckIcon, CharacterCardCloseIcon, EditModeIcon } from '@/assets';
import { Input, Select } from '@/shared/components';
import { type FilterOption, STATUS_FILTER_OPTIONS } from '@/shared/constants';
import { ClassNames } from '@/shared/helpers';
import type { StatusVariants } from '@/shared/types';
import type { ICharacterData } from '@/shared/types';
import type { CharacterMode } from '@/widgets/characterCard';

import './CharacterCard.scss';

interface ICharacterCardWidgetProps {
  data: ICharacterData;
  onSave?: (data: ICharacterData) => void;
}

const StatusOption = ({ option }: { option: FilterOption<string> }) => {
  return (
    <div className={ClassNames('character-card__status-option')}>
      {option.label}
      <div className={ClassNames('character-card__status-dot', `character-card__status-dot--${option.value}`)}></div>
    </div>
  );
};

export const CharacterCard = memo(({ data, onSave }: ICharacterCardWidgetProps) => {
  const [nameValue, setNameValue] = useState<string>(data.name);
  const [selectValue, setSelectValue] = useState<StatusVariants | null>(data.status);
  const [locationValue, setLocationValue] = useState<string>(data.location);
  const [mode, setMode] = useState<CharacterMode>('view');

  const currentStatus = mode === 'view' ? data.status : selectValue;
  const currentOption = STATUS_FILTER_OPTIONS.find((option) => option.value === currentStatus);

  const nameInputId = `character-${data.id}-name`;
  const locationInputId = `character-${data.id}-location`;

  const handleEdit = () => {
    setNameValue(data.name);
    setSelectValue(data.status);
    setLocationValue(data.location);
    setMode('edit');
  };

  const handleCancel = () => {
    setNameValue(data.name);
    setSelectValue(data.status);
    setLocationValue(data.location);
    setMode('view');
  };

  const handleSave = () => {
    onSave?.({
      ...data,
      name: nameValue,
      location: locationValue,
      status: selectValue ?? data.status
    });
    setMode('view');
  };

  return (
    <div className={ClassNames('character-card', `character-card--${mode}`)}>
      <div className='character-card__media'>
        <img
          src={data.image}
          alt={data.name}
        />
      </div>
      <div className='character-card__content'>
        <div className='character-card__title'>
          {mode === 'view' ? (
            <Link
              to={`/characters/${data.id}`}
              className='character-card__title-link'
              aria-label='View Character'
            >
              {data.name}
            </Link>
          ) : (
            <Input
              value={nameValue}
              id={nameInputId}
              onChange={setNameValue}
              variant='underlined'
            />
          )}
        </div>
        <div className='character-card__meta-item'>
          <div className='character-card__meta-label'>Gender</div>
          <div className='character-card__meta-value'>{data.gender}</div>
        </div>
        <div className='character-card__meta-item'>
          <div className='character-card__meta-label'>Species</div>
          <div className='character-card__meta-value'>{data.species}</div>
        </div>
        <div className='character-card__meta-item'>
          <div className='character-card__meta-label'>Location</div>
          <div className='character-card__meta-value'>
            {mode === 'view' ? (
              data.location
            ) : (
              <Input
                value={locationValue}
                id={locationInputId}
                onChange={setLocationValue}
                variant='underlined'
                className='character-card__location'
              />
            )}
          </div>
        </div>
        <div className='character-card__status'>
          <div className='character-card__meta-label'>Status</div>
          <div className='character-card__status-value'>
            {mode === 'view' ? (
              currentOption ? (
                <StatusOption option={currentOption} />
              ) : (
                <span>–</span>
              )
            ) : (
              <Select
                options={STATUS_FILTER_OPTIONS}
                value={selectValue}
                onChange={setSelectValue}
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
          className='character-card__edit-button'
          onClick={handleEdit}
          aria-label='Edit Character'
        >
          <EditModeIcon />
        </button>
      )}
      {mode === 'edit' && (
        <div className='character-card__edit-actions'>
          <button
            type='button'
            className='character-card__cancel-button'
            onClick={handleCancel}
            aria-label='Cancel changes'
          >
            <CharacterCardCloseIcon />
          </button>
          <button
            type='button'
            className='character-card__save-button'
            onClick={handleSave}
            aria-label='Save changes'
          >
            <CharacterCardCheckIcon />
          </button>
        </div>
      )}
    </div>
  );
});
