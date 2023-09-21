'use client';

import { useCallback, useEffect, useRef } from 'react';

import { generateCard, updateGrid } from '@/redux/slices/boardSlice';
import { Direction } from '@/types/board';
import { getGrid, getScore } from '@/utils/storage';
import { useAppDispatch, useAppSelector } from '@/hooks';

import Card from './Card';

const KEYS = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

export default function Board() {
  const { grid, isGameOver } = useAppSelector((state) => state.board);
  const startX = useRef(0);
  const startY = useRef(0);
  const dispatch = useAppDispatch();

  const handleDispatch = useCallback(
    (e: KeyboardEvent | TouchEvent | MouseEvent) => {
      if (isGameOver) return;
      if (e instanceof TouchEvent || e instanceof MouseEvent) {
        const endX =
          e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX;
        const endY =
          e instanceof MouseEvent ? e.clientY : e.changedTouches[0].clientY;

        const deltaX = endX - startX.current;
        const deltaY = endY - startY.current;
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          if (Math.abs(deltaX) < 10) return;
          if (deltaX > 0) {
            dispatch(updateGrid('ArrowRight'));
          } else {
            dispatch(updateGrid('ArrowLeft'));
          }
          dispatch(generateCard());
        } else {
          if (Math.abs(deltaY) < 10) return;
          if (deltaY > 0) {
            dispatch(updateGrid('ArrowDown'));
          } else {
            dispatch(updateGrid('ArrowUp'));
          }
          dispatch(generateCard());
        }
      }
      if (e instanceof KeyboardEvent && KEYS.includes(e.key)) {
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
    const handleTouchStart = (e: TouchEvent | MouseEvent) => {
      startX.current =
        e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      startY.current =
        e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
    };

    document.addEventListener('mousedown', handleTouchStart);
    document.addEventListener('mouseup', handleDispatch);
    document.addEventListener('keydown', handleDispatch);
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleDispatch);
    return () => {
      document.removeEventListener('mousedown', handleTouchStart);
      document.removeEventListener('mouseup', handleDispatch);
      document.removeEventListener('touchend', handleDispatch);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('keydown', handleDispatch);
    };
  }, [handleDispatch]);

  return (
    <div className="w-[324px] h-[324px] md:w-[526px] md:h-[526px] bg-border p-[10px] md:p-[25px] mt-7 rounded-md grid-rows-4 grid-cols-4 grid gap-2">
      {grid.map((row) => row.map((n, i) => <Card key={i} num={n} />))}
    </div>
  );
}
