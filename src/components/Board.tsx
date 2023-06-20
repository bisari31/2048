'use client';

import { useCallback, useEffect, useState } from 'react';
import Card from './Card';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { down, generateCard, up, updateGrid } from '@/redux/boardSlice';

export default function Board() {
  const grid = useAppSelector((state) => state.board.grid);
  const dispatch = useAppDispatch();

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft': {
        dispatch(updateGrid('left'));
        break;
      }
      case 'ArrowRight': {
        dispatch(updateGrid('right'));
        break;
      }
      case 'ArrowUp': {
        dispatch(up());
        break;
      }
      case 'ArrowDown': {
        dispatch(down());
        break;
      }
      default:
        return;
    }
    dispatch(generateCard());
    // setTimeout(() => {
    //   dispatch(generateCard());
    // }, 300);
  };

  useEffect(() => {
    dispatch(generateCard(2));
  }, [dispatch]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="bg-border p-[25px] mt-7 w-full h-[526px] rounded-md flex flex-wrap gap-2">
      {grid.map((row) => row.map((n, i) => <Card key={i} num={n} />))}
    </div>
  );
}
