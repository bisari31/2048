import { useFocus } from '@/hooks';
import { generateCard, reset } from '@/redux/boardSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { ModalType } from '@/types/board';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

const nicknameRegex = /^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]{2,12}$/;

export default function GameOver({
  onModalClose,
}: {
  onModalClose: (type: ModalType) => void;
}) {
  const { score } = useAppSelector(({ board }) => board);
  const dispatch = useAppDispatch();
  const inputRef = useFocus<HTMLInputElement>();
  const [nickname, setNickname] = useState('');
  const [isNicknameValid, setIsNicknameValid] = useState(true);
  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!nicknameRegex.test(e.target.value)) {
      setIsNicknameValid(false);
    } else {
      setIsNicknameValid(true);
    }
    setNickname(e.target.value);
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!isNicknameValid) return;
    localStorage.setItem('nickname', nickname);
    const res = await fetch('http://localhost:5000/ranking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
      <form action="" onSubmit={handleSave} className="flex flex-col w-full">
        <h2 className="text-lg font-bold text-score text-center">{score}점</h2>
        <input
          ref={inputRef}
          className={`${
            !isNicknameValid ? `border-2 border-title` : 'border-none'
          } 
          mt-[35px] bg-button-4 rounded-md py-3 px-6 text-white placeholder-gray-300 outline-none`}
          placeholder="닉네임 (한글,영문,숫자 2~12자)"
          type="text"
          value={nickname}
          onChange={handleNicknameChange}
          onFocus={({ currentTarget }) =>
            currentTarget.setSelectionRange(
              currentTarget.value.length,
              currentTarget.value.length,
            )
          }
        />
        {!isNicknameValid && (
          <p className="mt-[10px] text-title text-center">
            닉네임이 올바르지 않습니다. (한글,영문,숫자 2~12자)
          </p>
        )}
        <button
          className="mt-[35px] w-full rounded-md bg-button-default py-3 px-6 font-bold text-white hover:bg-button-hover active:bg-button-active"
          type="submit"
        >
          저장
        </button>
      </form>
    </>
  );
}
