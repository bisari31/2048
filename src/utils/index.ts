import { Direction, MethodMap } from '@/types/board';

const type: MethodMap = {
  down: 'unshift',
  left: 'push',
  right: 'unshift',
  up: 'push',
};

export const getRandomNumber = (num: number) => Math.floor(Math.random() * num);

export const setGrid = (grid: number[][], payload: Direction) => {
  const isVertical = payload === 'up' || payload === 'down';
  const method = type[payload];
  let score = 0;
  const newGrid: number[][] = [[], [], [], []];
  (payload === 'down' ? grid.reverse() : grid).forEach((r, i) => {
    const array: number[] = [];
    let previousNum: null | number = null;
    (payload === 'right' ? r.reverse() : r).forEach((_, j) => {
      let currentNum = isVertical ? grid[j][i] : grid[i][j];
      if (currentNum !== 0) {
        if (previousNum === null) {
          previousNum = currentNum;
        } else if (previousNum === currentNum) {
          array[method](previousNum * 2);
          score += previousNum * 2;
          previousNum = null;
        } else {
          array[method](previousNum);
          previousNum = currentNum;
        }
      }
    });
    if (previousNum !== null) {
      array[method](previousNum);
    }

    const remainingLength = grid.length - array.length;
    for (let i = 0; i < remainingLength; i++) {
      array[method](0);
    }

    array.forEach((n, idx) => {
      isVertical ? newGrid[idx].push(n) : newGrid[i].push(n);
    });
  });
  return { newGrid, score };
};
