import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { ModalType } from '@/types/board';
import { UserScore } from '@/types/score';
import LeftChevron from '@/assets/left-chevron.svg';
import RightChevron from '@/assets/right-chevron.svg';

import SkeletonScore from '../loading/SkeletonScore';

const getBgClassName = (i: number) => {
  if (i === 1) return 'bg-button-default';
  if (i === 2) return 'bg-button-2';
  if (i === 3) return 'bg-button-3';
  return 'bg-button-4';
};

const LIMIT = 7;

export default function Ranking({
  onModalClose,
}: {
  onModalClose: (type: ModalType) => void;
}) {
  const supabase = createClientComponentClient();

  const [users, setUsers] = useState<UserScore[]>();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const offset = (page - 1) * LIMIT;
  const totalPages = users?.length ? Math.ceil(users.length / LIMIT) : 1;

  useEffect(() => {
    const getScore = async () => {
      try {
        setLoading(true);
        const { data, error, status } = await supabase
          .from('score')
          .select('*')
          .order('score', { ascending: false });
        if (error && status !== 406) {
          throw error;
        }
        if (data) setUsers(data);
      } catch (err) {
        alert('error loading score data');
      } finally {
        setLoading(false);
      }
    };
    getScore();
  }, [supabase]);

  return (
    <>
      <ul className="flex min-h-[328px] w-full flex-col gap-2">
        {loading ? (
          <SkeletonScore limit={LIMIT} />
        ) : (
          users?.slice(offset, offset + LIMIT).map((n, i) => (
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
          ))
        )}
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
