import { render, screen } from '@testing-library/react';

import { Select } from './Select';

const options = [
  { label: 'Alive', value: 'alive' },
  { label: 'Dead', value: 'dead' }
];

const onChange = jest.fn();
const placeholder = 'Choose status';

test('renders placeholder', () => {
  render(
    <Select
      options={options}
      value={null}
      onChange={onChange}
      placeholder={placeholder}
    />
  );

  expect(screen.getByText(placeholder)).toBeInTheDocument();
});

test('renders medium size', () => {
  const { container } = render(
    <Select
      options={options}
      value={null}
      onChange={onChange}
      size='medium'
    />
  );

  expect(container.firstElementChild).toHaveClass('select--medium');
});

test('renders small size', () => {
  const { container } = render(
    <Select
      options={options}
      value={null}
      onChange={onChange}
      size='small'
    />
  );

  expect(container.firstElementChild).toHaveClass('select--small');
});
