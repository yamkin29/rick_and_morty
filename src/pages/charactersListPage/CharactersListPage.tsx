import { useState } from 'react';

import { MainIcon } from '@/assets';
import { TestImageRick } from "@/assets";

import './CharactersListPage.css';
import {CharacterCardWidget} from "@/widgets";

export const CharactersListPage = () => {
  const [value, setValue] = useState<string>('');

  const handleChange = (newValue: string) => setValue(newValue);

  return (
    <div className='characters-list-page'>
      <div className='characters-list-page__logo'>
        <MainIcon />
      </div>
      <div className='characters-list-page__list'>
        <CharacterCardWidget mode='view' image={<TestImageRick/>}/>
      </div>
    </div>
  );
};
