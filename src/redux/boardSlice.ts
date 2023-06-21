import { Direction } from '@/types/board';
import { getRandomNumber, setGrid } from '@/utils/board';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  score: 0,
  best: 0,
  grid: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  isGameOver: false,
};

const DIRECTION: Direction[] = [
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
];

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    test: (state) => {
      state.grid = [
        [32, 8, 4, 2],
        [8, 32, 8, 4],
        [32, 16, 4, 8],
        [64, 4, 64, 16],
      ];
    },
    getStorageData: (
      state,
      action: PayloadAction<{ best: number; score: number; grid: number[][] }>,
    ) => {
      const { best, grid, score } = action.payload;
      if (best) state.best = best;
      if (score && grid.length) {
        state.grid = grid;
        state.score = score;
      }
    },
    reset: (state) => {
      state.score = 0;
      state.grid = initialState.grid;
      state.isGameOver = false;
    },
    generateCard: (state, action: PayloadAction<number | undefined>) => {
      const isGridFull = state.grid.every((cur) => !cur.includes(0));
      if (isGridFull) {
        const gameOver = !DIRECTION.reduce((acc, cur) => {
          const { score } = setGrid(state.grid, cur);
          return acc + score;
        }, 0);
        if (gameOver) {
          state.isGameOver = true;
          if (state.score > state.best) {
            state.best = state.score;
            localStorage.setItem('best', state.score.toString());
          }
        }
        return;
      }
      const { payload = 1 } = action;
      for (let i = 0; i < payload; i++) {
        const emptyValues = state.grid.reduce<number[][]>((acc, cur, idx) => {
          cur.forEach((n, i) => n === 0 && acc.push([idx, i]));

          return acc;
        }, []);
        const randomNum = getRandomNumber(emptyValues.length);
        const [row, col] = emptyValues[randomNum];
        state.grid = state.grid.map((r, rowIdx) =>
          rowIdx === row
            ? r.map((c, colIdx) =>
                colIdx === col ? (getRandomNumber(10) === 0 ? 4 : 2) : c,
              )
            : r,
        );
      }
      localStorage.setItem('score', state.score.toString());
      localStorage.setItem('grid', JSON.stringify(state.grid));
    },
    updateGrid: (state, action: PayloadAction<Direction>) => {
      const { result, score } = setGrid(state.grid, action.payload);
      state.grid = result;
      state.score += score;
    },
  },
});

export const { reset, generateCard, updateGrid, getStorageData, test } =
  boardSlice.actions;
export default boardSlice.reducer;
