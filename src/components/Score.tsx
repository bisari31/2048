'use client';
import { useState } from 'react';

interface Props {
  type: 'SCORE' | 'BEST';
}

export default function Score({ type }: Props) {
  const [score, setScore] = useState(0);
  return (
    <div className="flex flex-col jus-cen items-center bg-score text-white rounded-md w-[120px] py-2 gap-2">
      <span className="font-bold text-xs leading-5">{type}</span>
      <span className="font-bold text-lg leading-10">{score}</span>
    </div>
  );
}
