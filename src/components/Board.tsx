'use client';

import { useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/store';
import { generateCard, updateGrid } from '@/redux/boardSlice';
import { Direction } from '@/types/board';
import { getGrid, getScore } from '@/utils/storage';

import Card from './Card';

const KEYS = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

export default function Board() {
  const { grid, isGameOver } = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isGameOver) return;
      if (KEYS.includes(e.key)) {
        dispatch(updateGrid(e.key as Direction));
        dispatch(generateCard());
      }
    },
    [isGameOver, dispatch],
  );

  useEffect(() => {
    const score = getScore();
    const grid = getGrid();
    const cardCounts = grid.reduce((acc, cur) => {
      cur.forEach((c) => (acc += c > 0 ? 1 : 0));
      return acc;
    }, 0);
    if (score || cardCounts >= 3) return;
    dispatch(generateCard(2));
  }, [dispatch]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="w-[324px] h-[324px] md:w-[526px] md:h-[526px] bg-border p-[10px] md:p-[25px] mt-7 rounded-md grid-rows-4 grid-cols-4 grid gap-2">
      {grid.map((row) => row.map((n, i) => <Card key={i} num={n} />))}
    </div>
  );
}
