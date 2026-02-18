import React from 'react';
import { ClassNames } from '@/shared/helpers';
import './CharacterCardWidget.css';
import {Select} from "@/shared/components";

interface ICharacterCardWidgetProps {
  mode: 'view' | 'edit';
  image: React.ReactNode;
}

export const CharacterCardWidget = ({ mode, image }: ICharacterCardWidgetProps) => {
  return (
    <div className={ClassNames('character-card', `character-card--${mode}`)}>
      <div className={ClassNames('character-card__media')}>
        { image }
      </div>
      <div className={ClassNames('character-card__content')}>
        <div className={ClassNames('character-card__title')}>
          Rick Sanchez
        </div>
        <div className={ClassNames('character-card__meta-item')}>
          <div className={ClassNames('character-card__meta-label')}>
            Gender
          </div>
          <div className={ClassNames('character-card__meta-value')}>
            Male
          </div>
        </div>
        <div className={ClassNames('character-card__meta-item')}>
          <div className={ClassNames('character-card__meta-label')}>
            Species
          </div>
          <div className={ClassNames('character-card__meta-value')}>
            Human
          </div>
        </div>
        <div className={ClassNames('character-card__meta-item')}>
          <div className={ClassNames('character-card__meta-label')}>
            Location
          </div>
          <div className={ClassNames('character-card__meta-value')}>
            Earth
          </div>
        </div>
        <div className={ClassNames('character-card__status')}>
          <div className={ClassNames('character-card__meta-label')}>
            Status
          </div>
          <div className={ClassNames('character-card__status-value')}>
            {/*<Select options={} value={} onChange={}/>*/}
          </div>
        </div>
      </div>
    </div>
  );
};
