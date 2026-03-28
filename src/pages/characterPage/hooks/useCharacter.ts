import { useEffect, useState } from 'react';

import { toast } from 'react-hot-toast';

import axios from 'axios';

import { api } from '@/api';
import { CharacterAdapter, type IApiCharacterDetails, IsNotFoundError } from '@/shared/helpers';
import type { ICharacterData } from '@/shared/types';

export const useCharacter = (id: string | undefined) => {
  const [character, setCharacter] = useState<ICharacterData | null>(null);
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

        if (IsNotFoundError(e)) {
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

  return { character, isLoading };
};
