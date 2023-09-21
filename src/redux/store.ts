import { combineReducers, configureStore } from '@reduxjs/toolkit';
import boardSlice from './slices/boardSlice';

const reducer = combineReducers({
  board: boardSlice,
});

export const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
