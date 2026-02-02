import React, { type ComponentType, useEffect, useRef, useState } from 'react';

import './Select.css';

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
}

const DefaultOptionComponent = <T,>({ option }: IDefaultOptionComponentProps<T>) => {
  return <span>{option.label}</span>;
};

const Select = <T,>({
  options,
  placeholder,
  value,
  OptionComponent = DefaultOptionComponent,
  size = 'medium',
  onChange
}: ISelectProps<T>) => {
  const selectedOption = options.find((option) => option.value === value);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelectClick = () => setIsOpen((prevState) => !prevState);

  const handleOptionClick = (newValue: T) => {
    onChange(newValue);
    setIsOpen(false);
  };

  const handleClearClick = () => {
    onChange(null);
  };

  const handleOutsideClick = (event: MouseEvent) => {
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
      className='select'
      ref={selectRef}
    >
      <button
        className='select__header'
        onClick={handleSelectClick}
      >
        {selectedOption?.label ? <OptionComponent option={selectedOption} /> : placeholder}
      </button>
      {selectedOption && (
        <button
          className='select__clean'
          onClick={handleClearClick}
        >
          X
        </button>
      )}
      {isOpen && (
        <ul className='select__options'>
          {options.map((option) => {
            return (
              <li
                key={String(option.value)}
                className='select__option'
                onClick={() => handleOptionClick(option.value)}
              >
                {
                  <OptionComponent option={option} />
                }
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Select;
