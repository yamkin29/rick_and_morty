import { ClassNames } from './ClassNames';

test('returns string from one class', () => {
  expect(ClassNames('button')).toBe('button');
});

test('returns string from several classes', () => {
  expect(ClassNames('button', 'test', 'case')).toBe('button test case');
});

test('returns string from undefined value', () => {
  expect(ClassNames('foo', undefined)).toBe('foo');
});

test('returns empty string without arguments', () => {
  expect(ClassNames()).toBe('');
});
