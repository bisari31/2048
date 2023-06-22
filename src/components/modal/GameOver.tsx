import { useFocus } from '@/hooks';
import { generateCard, reset } from '@/redux/boardSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { ModalType } from '@/types/board';
import { FormEvent, useEffect, useState } from 'react';

export default function GameOver({
  onModalClose,
}: {
  onModalClose: (type: ModalType) => void;
}) {
  const { score } = useAppSelector(({ board }) => board);
  const dispatch = useAppDispatch();
  const inputRef = useFocus<HTMLInputElement>();
  const [nickname, setNickname] = useState('');

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem('nickname', nickname);

    const res = await fetch('http://localhost:5000/ranking', {
      method: 'POST',
      body: JSON.stringify({
        nickname,
        score,
      }),
    });
    const data = await res.json();
    if (data) {
      onModalClose('gameOver');
      dispatch(reset());
      dispatch(generateCard(2));
    }
  };

  useEffect(() => {
    const nickname = localStorage.getItem('nickname');
    if (nickname) setNickname(nickname);
  }, []);

  return (
    <>
      <h2 className="text-lg font-bold text-score text-center">{score}점</h2>
      <input
        ref={inputRef}
        className="mt-[35px] w-full bg-score rounded-md py-3 px-6 border-none text-white placeholder-gray-300 outline-none"
        placeholder="닉네임 (한글,영문,숫자 2~12자)"
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <button
        onClick={handleSave}
        className="w-[400px] mt-[35px] rounded-md bg-button-default py-3 px-6 font-bold text-white hover:bg-button-hover active:bg-button-active"
        type="submit"
      >
        저장
      </button>
    </>
  );
}
