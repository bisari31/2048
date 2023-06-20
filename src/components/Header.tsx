'use client';
import { useAppDispatch } from '@/redux/store';
import Score from './Score';
import { generateCard, reset } from '@/redux/boardSlice';
import Portal from '@/common/Portal';
import Modal from './Modal';
import { useState } from 'react';
import { useOutsideClick } from '@/hooks';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useOutsideClick(setIsModalOpen);
  const dispatch = useAppDispatch();

  const handleModalToggle = () => setIsModalOpen((prev) => !prev);
  const handleReset = () => {
    dispatch(reset());
    dispatch(generateCard(2));
  };

  return (
    <header>
      <div className="flex justify-between">
        <div>
          <h1 className="text-title font-black text-3xl cursor-default">
            2048
          </h1>
          <button
            className="text-title font-black underline text-sm"
            onClick={handleModalToggle}
          >
            how to play?
          </button>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex gap-x-3">
            <Score type="SCORE" />
            <Score type="BEST" />
          </div>
          <button
            onClick={handleReset}
            className="mt-11 bg-button text-white text-sm font-bold px-3 py-4 rounded-md w-fit"
          >
            New Game
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Portal>
          <Modal ref={modalRef} />
        </Portal>
      )}
    </header>
  );
}
