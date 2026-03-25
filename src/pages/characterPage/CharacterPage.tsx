import { Link, useParams } from 'react-router';

import { BackIcon } from '@/assets';
import { useCharacter } from '@/pages/characterPage';
import { Loader } from '@/shared/components';
import { Capitalize } from '@/shared/helpers';

import './CharacterPage.scss';

export const CharacterPage = () => {
  const { id } = useParams<{ id: string }>();

  const { character, isLoading } = useCharacter(id);

  if (isLoading) {
    return (
      <div className='character-page character-page--loading'>
        <Loader
          size='large'
          text='Loading character...'
        />
      </div>
    );
  }

  if (!character) {
    return (
      <div className='character-page character-page--empty'>
        <Link
          to='/characters'
          className='character-page__back-link'
        >
          <BackIcon />
          <span className='character-page__back-text'>GO BACK</span>
        </Link>
        <div className='character-page__empty-state'>Character details are unavailable.</div>
      </div>
    );
  }

  const characterInfoKeys = ['gender', 'status', 'species', 'origin', 'type', 'location'] as const;

  return (
    <div className='character-page'>
      <div className='character-page__back'>
        <Link
          to='/characters'
          className='character-page__back-link'
        >
          <BackIcon />
          <span className='character-page__back-text'>GO BACK</span>
        </Link>
      </div>

      <div className='character-page__content'>
        <div className='character-page__avatar'>
          <img
            src={character.image}
            alt={character.name}
          />
        </div>

        <h1 className='character-page__name'>{character.name}</h1>

        <div className='character-page__section-title'>Information</div>

        <div className='character-page__info-list'>
          {characterInfoKeys.map((key) => (
            <div
              key={key}
              className='character-page__info-item'
            >
              <div className='character-page__info-label'>{Capitalize(key)}</div>
              <div className='character-page__info-value'>
                {key === 'status' ? Capitalize(character[key]) : character[key]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
