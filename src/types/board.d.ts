export type Direction = 'left' | 'right' | 'up' | 'down';

export type MethodMap = {
  [key in Direction]: 'push' | 'unshift';
};
