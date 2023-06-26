'use client';
import { useAppSelector } from '@/redux/store';

interface Props {
  type: 'SCORE' | 'BEST';
}

export default function Score({ type }: Props) {
  const scoreType = type === 'BEST' ? 'best' : 'score';
  const score = useAppSelector((state) => state.board[scoreType]);

  return (
    <div className="flex flex-col justify-center items-center bg-score text-white rounded-md py-2 px-3 w-[125px]">
      <span className="font-bold text-[14px] md:text-[16px]">{type}</span>
      <span
        className={`font-bold text-md ${
          score < 10000 ? `md:text-lg` : `md:text-md`
        }`}
      >
        {score}
      </span>
    </div>
  );
}
