import React, { useRef } from 'react';

import { CloseIcon } from '@/assets';
import { ClassNames } from '@/shared/helpers';

import './Input.css';

interface IInputProps {
  variant?: 'bordered' | 'underlined';
  icon?: React.ReactNode;
  value: string;
  id: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const Input = ({ variant = 'bordered', icon, value, id, onChange, placeholder, className }: IInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const showClear = value.length > 0;

  const handleChangeClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleOnClearClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onChange('');
  };

  const handleOnContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className={ClassNames(`input`, `input--${variant}`, className)}
      onClick={handleOnContainerClick}
    >
      <div className='input__field'>
        {icon && <div className='input__icon'>{icon}</div>}
        <input
          className='input__control'
          ref={inputRef}
          type='text'
          value={value}
          id={id}
          placeholder={placeholder}
          onChange={handleChangeClick}
        />
        {showClear && (
          <button
            className='input__button--clear'
            type='button'
            aria-label='Clear input'
            onClick={handleOnClearClick}
          >
            <CloseIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
