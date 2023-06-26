import { Direction, MethodMap } from '@/types/board';
import { cloneDeep } from 'lodash';

const METHOD_MAP: MethodMap = {
  ArrowDown: 'unshift',
  ArrowLeft: 'push',
  ArrowRight: 'unshift',
  ArrowUp: 'push',
};

export const getRandomNumber = (num: number) => Math.floor(Math.random() * num);

export const setGrid = (grid: number[][], payload: Direction) => {
  const newGrid = cloneDeep(grid);
  const isVertical = payload === 'ArrowUp' || payload === 'ArrowDown';
  const method = METHOD_MAP[payload];
  let score = 0;
  const result: number[][] = [[], [], [], []];
  (payload === 'ArrowDown' ? newGrid.reverse() : newGrid).forEach((r, i) => {
    const array: number[] = [];
    let previousNum: null | number = null;
    (payload === 'ArrowRight' ? r.reverse() : r).forEach((_, j) => {
      let currentNum = isVertical ? newGrid[j][i] : newGrid[i][j];
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

    const remainingLength = newGrid.length - array.length;
    for (let i = 0; i < remainingLength; i++) {
      array[method](0);
    }

    array.forEach((n, idx) => {
      isVertical ? result[idx].push(n) : result[i].push(n);
    });
  });
  return { result, score };
};
