import { Direction } from '@/types/board';
import { getRandomNumber, moveDown, moveUp, setGrid } from '@/utils';
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

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    increaseScore: ({ score }, action) => {
      score += action.payload;
    },
    reset: (state) => {
      state.score = 0;
      state.grid = initialState.grid;
    },
    generateCard: (state, action: PayloadAction<number | undefined>) => {
      const isGridFull = state.grid.every((cur) => !cur.includes(0));
      if (isGridFull) {
        return console.log('꽉 참');
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
                colIdx === col ? (getRandomNumber(20) === 0 ? 4 : 2) : c,
              )
            : r,
        );
      }
    },
    updateGrid: (state, action: PayloadAction<Direction>) => {
      const { newGrid, score } = setGrid(state.grid, action.payload);
      state.grid = newGrid;
      state.score += score;
    },
    up: (state) => {
      const { newGrid, score } = moveUp(state.grid);
      state.grid = newGrid;
      state.score += score;
    },
    down: (state) => {
      const { newGrid, score } = moveDown(state.grid);
      state.grid = newGrid;
      state.score += score;
    },
  },
});

export const { increaseScore, reset, generateCard, updateGrid, up, down } =
  boardSlice.actions;
export default boardSlice.reducer;
