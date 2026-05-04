import { ClassNames } from './ClassNames';

test('returns class name string', () => {
  expect(ClassNames('button')).toBe('button');
});
