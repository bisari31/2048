import { Direction, MethodMap } from '@/types/board';

const type: MethodMap = {
  down: { method: 'unshift', transfrom: (row) => row },
  left: { method: 'push', transfrom: (row) => row },
  right: { method: 'unshift', transfrom: (row) => row.reverse() },
  up: { method: 'push', transfrom: (row) => row },
};

export const getRandomNumber = (num: number) => Math.floor(Math.random() * num);

export const setGrid = (grid: number[][], payload: Direction) => {
  const isVertical = payload === 'up' || payload === 'down';
  let score = 0;
  const { method, transfrom } = type[payload];
  // const newGrid: number[][] = [[], [], [], []];

  const newGrid = grid.map((r, rowIdx) => {
    const newRow: number[] = [];
    let previousNum: null | number = null;
    transfrom(r).forEach((c, colIdx) => {
      // const currentNum = isVertical
      //   ? grid[colIdx][rowIdx]
      //   : grid[rowIdx][colIdx];
      if (c !== 0) {
        if (previousNum === null) {
          previousNum = c;
        } else if (previousNum === c) {
          newRow[method](previousNum * 2);
          score += previousNum * 2;
          previousNum = null;
        } else {
          newRow[method](previousNum);
          previousNum = c;
        }
      }
    });

    if (previousNum !== null) {
      newRow[method](previousNum);
    }
    const remainingLength = grid.length - newRow.length;
    for (let i = 0; i < remainingLength; i++) {
      newRow[method](0);
    }
    return newRow;
    // newRow.forEach((n, idx) => newGrid[isVertical ? idx : rowIdx].push(n));
  });
  return { score, newGrid };
};
export const moveUp = (grid: number[][]) => {
  const newGrid: number[][] = [[], [], [], []];
  let score = 0;
  for (let i = 0; i < grid.length; i++) {
    const row = [];
    let previousNum = null;
    for (let j = 0; j < grid.length; j++) {
      let currentNum = grid[j][i];
      if (currentNum !== 0) {
        if (previousNum === null) {
          previousNum = currentNum;
        } else if (previousNum === currentNum) {
          row.push(previousNum * 2);
          score += previousNum * 2;
          previousNum = null;
        } else {
          row.push(previousNum);
          previousNum = currentNum;
        }
      }
    }
    if (previousNum !== null) {
      row.push(previousNum);
    }

    const remainingLength = grid.length - row.length;
    for (let i = 0; i < remainingLength; i++) {
      row.push(0);
    }

    row.forEach((n, idx) => {
      newGrid[idx].push(n);
    });
  }
  return { newGrid, score };
};
export const moveDown = (grid: number[][]) => {
  const newGrid: number[][] = [[], [], [], []];
  let score = 0;
  for (let i = 0; i < grid.length; i++) {
    const row = [];
    let previousNum = null;
    for (let j = grid.length - 1; j >= 0; j--) {
      let currentNum = grid[j][i];
      if (currentNum !== 0) {
        if (previousNum === null) {
          previousNum = currentNum;
        } else if (previousNum === currentNum) {
          row.unshift(previousNum * 2);
          score += previousNum * 2;
          previousNum = null;
        } else {
          row.unshift(previousNum);
          previousNum = currentNum;
        }
      }
    }
    if (previousNum !== null) {
      row.unshift(previousNum);
    }

    const remainingLength = grid.length - row.length;
    for (let i = 0; i < remainingLength; i++) {
      row.unshift(0);
    }

    row.forEach((n, idx) => {
      newGrid[idx].push(n);
    });
  }
  return { newGrid, score };
};
