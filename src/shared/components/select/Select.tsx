import { type ComponentType, useEffect, useRef, useState } from 'react';

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

export const Select = <T,>({
  options,
  placeholder,
  value,
  OptionComponent = DefaultOptionComponent,
  size = 'medium',
  onChange
}: ISelectProps<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  const handleSelectClick = () => setIsOpen((prevState) => !prevState);

  const handleOptionClick = (newValue: T) => {
    onChange(newValue);
    setIsOpen(false);
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

  const isPlaceholder = !selectedOption;

  return (
    <div
      className={`select select--${size} ${isOpen ? 'select--open' : ''}`}
      ref={selectRef}
    >
      <button
        className={`select__header ${isPlaceholder ? 'select__header--placeholder' : ''}`}
        onClick={handleSelectClick}
        type='button'
      >
        <span className='select__value'>
          {selectedOption ? <OptionComponent option={selectedOption} /> : placeholder}
        </span>
        <span
          className='select__arrow'
          aria-hidden='true'
        />
      </button>
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
