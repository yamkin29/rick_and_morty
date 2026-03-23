import { useEffect, useState } from 'react';

import { toast } from 'react-hot-toast';
import { Link, useParams } from 'react-router';

import axios from 'axios';

import { api } from '@/api';
import { BackIcon } from '@/assets';
import { Loader } from '@/shared/components';
import { CharacterAdapter, type IApiCharacterDetails } from '@/shared/helpers';
import type { ICharacterCardData } from '@/widgets/characterCard';

import './CharacterPage.scss';

export const CharacterPage = () => {
  const { id } = useParams<{ id: string }>();

  const [character, setCharacter] = useState<ICharacterCardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const loadCharacter = async () => {
      setIsLoading(true);

      try {
        const result = await api.get<IApiCharacterDetails>(`/character/${id}`, {
          signal: controller.signal
        });

        if (controller.signal.aborted) {
          return;
        }

        setCharacter(CharacterAdapter(result.data));
      } catch (e: unknown) {
        if (axios.isCancel(e)) {
          return;
        }

        setCharacter(null);

        if (axios.isAxiosError(e) && e.response?.status === 404) {
          toast.error('Character not found.');
          return;
        }

        const message = e instanceof Error ? e.message : 'Something went wrong.';
        toast.error(message);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void loadCharacter();

    return () => {
      controller.abort();
    };
  }, [id]);

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

  const capitalize = (value: string) => {
    if (!value) {
      return value;
    }

    return value[0].toUpperCase() + value.slice(1);
  };

  const characterInfo = [
    { label: 'Gender', value: character.gender },
    { label: 'Status', value: capitalize(character.status) },
    { label: 'Specie', value: character.species },
    { label: 'Origin', value: character.origin },
    { label: 'Type', value: character.type },
    { label: 'Location', value: character.location }
  ];

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
          {characterInfo.map((item) => (
            <div
              key={item.label}
              className='character-page__info-item'
            >
              <div className='character-page__info-label'>{item.label}</div>
              <div className='character-page__info-value'>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
