export type Direction = 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown';

export type MethodMap = {
  [key in Direction]: 'push' | 'unshift';
};
