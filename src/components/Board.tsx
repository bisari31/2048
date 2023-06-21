'use client';

import { useEffect } from 'react';
import Card from './Card';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { generateCard, updateGrid } from '@/redux/boardSlice';
import { Direction } from '@/types/board';

export default function Board() {
  const { grid } = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();

  const handleKeyDown = (e: KeyboardEvent) => {
    let direction = '';
    switch (e.key) {
      case 'ArrowLeft': {
        direction = 'left';
        break;
      }
      case 'ArrowRight': {
        direction = 'right';
        break;
      }
      case 'ArrowUp': {
        direction = 'up';
        break;
      }
      case 'ArrowDown': {
        direction = 'down';
        break;
      }
      default:
        return;
    }
    if (direction) dispatch(updateGrid(direction as Direction));
    dispatch(generateCard());
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
