'use client';

import { useCallback, useEffect, useState } from 'react';
import Card from './Card';

const initialGrid = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

export default function Board() {
  const [grid, setGrid] = useState(initialGrid);

  const getRandomNumber = (num: number) => Math.floor(Math.random() * num);
  const generateCard = useCallback(() => {
    setGrid((prev) => {
      const emptyValues = prev.reduce<number[][]>((acc, cur, idx) => {
        cur.forEach((n, i) => n === 0 && acc.push([idx, i]));

        return acc;
      }, []);
      const random = getRandomNumber(emptyValues.length);
      const [row, col] = emptyValues[random];
      return prev.map((r, rowIdx) =>
        rowIdx === row
          ? r.map((c, colIdx) =>
              colIdx === col ? (getRandomNumber(10) === 0 ? 4 : 2) : c,
            )
          : r,
      );
    });
  }, []);
  useEffect(() => {
    generateCard();
    generateCard();
  }, [generateCard]);

  return (
    <div className="bg-border p-[25px] mt-7 w-full h-[526px] rounded-md flex flex-wrap gap-2">
      {grid.map((row) => row.map((n, i) => <Card key={i} num={n} />))}
    </div>
  );
}
