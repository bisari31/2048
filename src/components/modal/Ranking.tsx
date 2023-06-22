import { useEffect, useState } from 'react';

import { ModalType } from '@/types/board';
import { UserScore } from '@/types/score';
import LeftChevron from '@/assets/left-chevron.svg';
import RightChevron from '@/assets/right-chevron.svg';

const getBgClassName = (i: number) => {
  if (i === 1) return 'bg-button-default';
  if (i === 2) return 'bg-button-2';
  if (i === 3) return 'bg-button-3';
  return 'bg-button-4';
};

export default function Ranking({
  onModalClose,
}: {
  onModalClose: (type: ModalType) => void;
}) {
  const [ranking, setRanking] = useState<UserScore[]>();

  useEffect(() => {
    async function getData() {
      const res = await fetch('http://localhost:5000/ranking');
      const data: UserScore[] = await res.json();
      data.sort((a, b) => b.score - a.score);
      setRanking(data);
    }
    getData();
  }, []);
  return (
    <>
      <ul className="flex flex-col gap-2">
        {ranking?.map((n, i) => (
          <li
            key={n.id}
            className={`w-[400px] flex justify-between py-2 px-5 ${getBgClassName(
              i + 1,
            )} text-white rounded-md`}
          >
            <span>{i + 1}등</span>
            <span>{n.nickname}</span>
            <span>{n.score}점</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between w-full mt-[20px]">
        <button
          type="button"
          onClick={() => console.log('sdf')}
          className="p-1 rounded-full  bg-button-default "
        >
          <LeftChevron width={20} height={20} color="#fff" stroke="#fff" />
        </button>
        <button
          type="button"
          onClick={() => console.log('sdf')}
          className="p-1 rounded-full bg-button-default "
        >
          <RightChevron width={20} height={20} color="#fff" stroke="#fff" />
        </button>
      </div>
      <button
        onClick={() => onModalClose('ranking')}
        className="w-full mt-[35px] rounded-md bg-button-default py-3 px-6 font-bold text-white hover:bg-button-hover active:bg-button-active"
        type="button"
      >
        확인
      </button>
    </>
  );
}
