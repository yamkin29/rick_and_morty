import { type ComponentType, type MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from 'react';

import { CloseIcon } from '@/assets';
import { ClassNames } from '@/shared/helpers';

import './Select.scss';

interface IOption<T> {
  label: string;
  value: T;
}

interface IDefaultOptionComponentProps<T> {
  option: IOption<T>;
}

interface ISelectProps<T> {
  options: IOption<T>[];
  placeholder?: string;
  value: T | null;
  OptionComponent?: ComponentType<IDefaultOptionComponentProps<T>>;
  size?: 'medium' | 'small';
  onChange: (value: T | null) => void;
  className?: string;
}

const DefaultOptionComponent = <T,>({ option }: IDefaultOptionComponentProps<T>) => {
  return <span>{option.label}</span>;
};

export const Select = <T,>({
  options,
  placeholder,
  value,
  OptionComponent = DefaultOptionComponent,
  size = 'medium',
  onChange,
  className
}: ISelectProps<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);
  const isPlaceholder = !selectedOption;
  const showClear = size === 'medium' && value !== null && value !== undefined;

  const handleSelectClick = () => setIsOpen((prevState) => !prevState);

  const handleOptionClick = (newValue: T) => {
    onChange(newValue);
    setIsOpen(false);
  };

  const handleClearClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onChange(null);
    setIsOpen(false);
  };

  const handleOutsideClick = (event: globalThis.MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div
      className={ClassNames('select', `select--${size}`, { 'select--open': isOpen }, className)}
      ref={selectRef}
    >
      <div className={ClassNames('select__header', { 'select__header--placeholder': isPlaceholder })}>
        <button
          className='select__trigger'
          onClick={handleSelectClick}
          type='button'
        >
          <span className='select__value'>
            {selectedOption ? <OptionComponent option={selectedOption} /> : placeholder}
          </span>
        </button>

        {showClear ? (
          <button
            className='select__clear'
            type='button'
            aria-label='Clear select'
            onClick={handleClearClick}
          >
            <CloseIcon />
          </button>
        ) : (
          <button
            className='select__indicator'
            type='button'
            aria-label={isOpen ? 'Close select' : 'Open select'}
            onClick={handleSelectClick}
          >
            <span
              className='select__arrow'
              aria-hidden='true'
            />
          </button>
        )}
      </div>

      {isOpen && (
        <ul className='select__options'>
          {options.map((option) => {
            return (
              <li
                key={String(option.value)}
                className='select__option'
                onClick={() => handleOptionClick(option.value)}
              >
                <OptionComponent option={option} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
