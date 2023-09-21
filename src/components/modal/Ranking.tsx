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
  const [users, setUsers] = useState<UserScore[]>();
  const [page, setPage] = useState(1);
  const limit = 7;
  const offset = (page - 1) * limit;
  const totalPages = users?.length ? Math.ceil(users.length / limit) : 1;

  useEffect(() => {
    async function getData() {
      const res = await fetch('http://localhost:5000/ranking');
      const data: UserScore[] = await res.json();
      data.sort((a, b) => b.score - a.score);
      setUsers(data);
    }
    getData();
  }, []);
  return (
    <>
      <ul className="flex min-h-[328px] w-full flex-col gap-2">
        {users?.slice(offset, offset + limit).map((n, i) => (
          <li
            key={n.id}
            className={`flex justify-between px-5 py-2 ${getBgClassName(
              i + offset + 1,
            )} rounded-md text-white`}
          >
            <span>{i + 1 + offset}등</span>
            <span>{n.nickname}</span>
            <span>{n.score}점</span>
          </li>
        ))}
      </ul>
      <div className="mt-[20px] flex w-full justify-between">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="flex w-[30px] items-center justify-center rounded-full bg-button-default hover:bg-button-hover active:bg-button-active"
        >
          <LeftChevron width={20} height={20} color="#fff" stroke="#fff" />
        </button>
        <span className="text-sm text-button-default">{page}</span>
        <button
          disabled={page === totalPages}
          type="button"
          onClick={() => setPage(page + 1)}
          className="flex w-[30px] items-center justify-center rounded-full bg-button-default hover:bg-button-hover active:bg-button-active"
        >
          <RightChevron width={20} height={20} color="#fff" stroke="#fff" />
        </button>
      </div>
      <button
        onClick={() => onModalClose('ranking')}
        className="mt-[35px] w-full rounded-md bg-button-default px-6 py-3 font-bold text-white hover:bg-button-hover active:bg-button-active"
        type="button"
      >
        확인
      </button>
    </>
  );
}
