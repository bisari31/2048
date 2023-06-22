'use client';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useOutsideClick } from '@/hooks';
import { generateCard, getStorageData, reset, test } from '@/redux/boardSlice';
import { getBestScore, getGrid, getScore } from '@/utils/storage';
import { ModalType } from '@/types/board';

import Score from './Score';
import Modal from './modal/Modal';

export default function Header() {
  const { isGameOver } = useAppSelector(({ board }) => board);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState<ModalType>('howToPlay');
  const modalRef = useOutsideClick(setIsModalOpen);
  const dispatch = useAppDispatch();

  const handleModalToggle = (type: ModalType) => {
    setIsModalOpen((prev) => !prev);
    setSelectedModal(type);
  };

  const handleReset = () => {
    dispatch(reset());
    dispatch(generateCard(2));
  };

  useEffect(() => {
    const best = getBestScore();
    const score = getScore();
    const grid = getGrid();
    console.log({ best, score, grid });
    if (best || score || grid?.length)
      dispatch(getStorageData({ best, score, grid }));
  }, [dispatch]);

  useEffect(() => {
    if (isGameOver) {
      setIsModalOpen(true);
      setSelectedModal('gameOver');
    }
  }, [isGameOver]);

  return (
    <header>
      <div className="flex justify-between">
        <div>
          <h1 className="text-title font-black text-3xl cursor-default">
            2048
          </h1>
          <button
            className="text-title font-black underline text-sm "
            onClick={() => handleModalToggle('howToPlay')}
          >
            how to play?
          </button>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex gap-x-3">
            <Score type="SCORE" />
            <Score type="BEST" />
          </div>
          <div className="flex gap-5">
            <button
              onClick={() => dispatch(test())}
              className="right-[250px] absolute mt-11 bg-button-default hover:bg-button-hover active:bg-button-active text-white text-sm font-bold px-3 py-4 rounded-md w-fit"
            >
              Test
            </button>
            <button
              onClick={() => handleModalToggle('ranking')}
              className="mt-11 bg-button-default hover:bg-button-hover active:bg-button-active text-white text-sm font-bold px-3 py-4 rounded-md w-fit"
            >
              Ranking
            </button>
            <button
              onClick={handleReset}
              className="mt-11 bg-button-default hover:bg-button-hover active:bg-button-active text-white text-sm font-bold px-3 py-4 rounded-md w-fit"
            >
              New Game
            </button>
          </div>
        </div>
      </div>
      <Modal
        selectedModal={selectedModal}
        isModalOpen={isModalOpen}
        ref={modalRef}
        onModalClose={handleModalToggle}
      />
    </header>
  );
}
