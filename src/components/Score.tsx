'use client';
import { useAppSelector } from '@/redux/store';

interface Props {
  type: 'SCORE' | 'BEST';
}

export default function Score({ type }: Props) {
  const scoreType = type === 'BEST' ? 'best' : 'score';
  const score = useAppSelector((state) => state.board[scoreType]);

  return (
    <div className="flex flex-col jus-cen items-center bg-score text-white rounded-md w-[120px] py-2 gap-2">
      <span className="font-bold text-xs leading-5">{type}</span>
      <span
        className={`font-bold leading-10 ${
          score < 10000 ? `text-lg` : `text-md`
        }`}
      >
        {score}
      </span>
    </div>
  );
}
