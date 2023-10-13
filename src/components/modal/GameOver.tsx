import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { useAppDispatch, useAppSelector, useFocus } from '@/hooks';
import { generateCard, reset } from '@/redux/slices/boardSlice';
import { ModalType } from '@/types/board';

const nicknameRegex = /^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]{2,12}$/;

export default function GameOver({
  onModalClose,
}: {
  onModalClose: (type: ModalType) => void;
}) {
  const supabase = createClientComponentClient();
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
    try {
      const { error, status } = await supabase
        .from('score')
        .insert({ nickname, score });

      if (status === 201) {
        onModalClose('gameOver');
        dispatch(reset());
        dispatch(generateCard(2));
      }
      if (error) {
        throw error;
      }
    } catch (err) {
      alert('score insert error');
    }
  };

  useEffect(() => {
    const nickname = localStorage.getItem('nickname');
    if (nickname) setNickname(nickname);
  }, []);

  return (
    <>
      <form action="" onSubmit={handleSave} className="flex w-full flex-col">
        <h2 className="text-center text-lg font-bold text-score">{score}점</h2>
        <input
          ref={inputRef}
          className={`${
            !isNicknameValid ? `border-2 border-title` : 'border-none'
          } 
          mt-[35px] rounded-md bg-button-4 px-6 py-3  text-white placeholder-gray-300 outline-none`}
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
          <p className="mt-[10px] text-center text-title">
            닉네임이 올바르지 않습니다. (한글,영문,숫자 2~12자)
          </p>
        )}
        <button
          className="active:bg-button-activ mt-[35px] w-full rounded-md bg-button-default px-6 py-3 font-bold text-white hover:bg-button-hover"
          type="submit"
        >
          저장
        </button>
      </form>
    </>
  );
}
