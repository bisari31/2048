'use client';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector, useOutsideClick } from '@/hooks';
import {
  generateCard,
  getStorageData,
  reset,
  test,
} from '@/redux/slices/boardSlice';
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
    <header className="w-[324px] md:w-[526px]">
      <div className="flex flex-col md:flex-row md:justify-between">
        <div>
          <h1 className="text-title font-black text-xl md:text-3xl cursor-default">
            2048
          </h1>
          <button
            className="text-title font-black underline text-sm "
            onClick={() => handleModalToggle('howToPlay')}
          >
            how to play?
          </button>
        </div>
        <div className="flex md:items-end flex-col gap-0 md:gap-8">
          <div className="flex gap-x-3 mt-5 md:m-0">
            <Score type="SCORE" />
            <Score type="BEST" />
          </div>
          <div className="flex gap-x-3 md:gap-5 text-[13px] md:text-sm text-white mt-5 md:mt-0">
            {/* <button
              onClick={() => dispatch(test())}
              className="left-[50px] absolute bg-button-default hover:bg-button-hover text-inherit font-bold active:bg-button-active px-3 py-4 rounded-md"
            >
              Test
            </button> */}
            <button
              onClick={() => handleModalToggle('ranking')}
              className="h-full md:h-fit bg-button-default hover:bg-button-hover active:bg-button-active font-bold text-inherit px-3 py-4 rounded-md"
            >
              Ranking
            </button>
            <button
              onClick={handleReset}
              className="h-full md:h-fit bg-button-default hover:bg-button-hover active:bg-button-active font-bold text-inherit px-3 py-4 rounded-md"
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
