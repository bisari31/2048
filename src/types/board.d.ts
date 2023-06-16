export type Direction = 'left' | 'right' | 'up' | 'down';

export type MethodMap = {
  [key in Direction]: {
    method: 'push' | 'unshift';
    transfrom: (row: number[]) => number[];
  };
};
