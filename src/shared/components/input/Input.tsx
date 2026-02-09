import React from 'react';

import { CloseIcon, SearchIcon } from '@/assets';

import './Input.css';

interface IInputProps {
  variant: 'form' | 'filter';
  size?: 'medium' | 'small';
  icon?: boolean;
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  onClear?: () => void;
}

const Input = ({ variant, size, icon, value, onChange, disabled, placeholder, onClear }: IInputProps) => {
  const showClear = value.length > 0 && !!onClear;
  const hasIcon = !!icon;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  const handleOnClearClick = () => {
    onClear?.();
  };

  return (
    <div className={`input input--${variant} input--${size ?? 'medium'}`}>
      <div
        className={`input__field${hasIcon ? ' input__field--with-icon' : ''}${showClear ? ' input__field--with-clear' : ''}`}
      >
        {hasIcon && (
          <div className='input__icon'>
            <SearchIcon />
          </div>
        )}
        <input
          className='input__control'
          type='text'
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={handleChange}
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
