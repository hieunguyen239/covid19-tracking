import { formatDate, calcDate } from './utils';

test('It should format Date dd/m/yyyy', () => {
  expect(formatDate('2020-08-19T14:27:43Z')).toBe('19/8/2020');
});


test('It should create correct Date', () => {
  expect(calcDate(new Date(2021, 11, 19), -7)).toEqual(new Date(2021, 11, 12));
});