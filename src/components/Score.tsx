'use client';

import { useAppSelector } from '@/hooks';

interface Props {
  type: 'SCORE' | 'BEST';
}

export default function Score({ type }: Props) {
  const scoreType = type === 'BEST' ? 'best' : 'score';
  const score = useAppSelector((state) => state.board[scoreType]);

  return (
    <div className="flex w-[125px] flex-col items-center justify-center rounded-md bg-score px-3 py-2 text-white">
      <span className="text-[14px] font-bold md:text-[16px]">{type}</span>
      <span
        className={`text-md font-bold ${
          score < 10000 ? `md:text-lg` : `md:text-md`
        }`}
      >
        {score}
      </span>
    </div>
  );
}
