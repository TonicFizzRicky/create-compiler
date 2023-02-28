export type AddFunction = (...numbers: number[]) => number;

export const add: AddFunction = (...numbers: number[]) => {
  return numbers.reduce((total, current) => {
    // eslint-disable-next-line no-param-reassign
    total += current;
    return total;
  }, 0);
};
