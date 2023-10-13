import { forwardRef } from 'react';
import { Noto_Sans_KR } from 'next/font/google';

import { ModalType } from '@/types/board';

import HowToPlay from './HowToPlay';
import Ranking from './Ranking';
import GameOver from './GameOver';
import Portal from '@/common/Portal';

const notoSans = Noto_Sans_KR({ subsets: ['latin'], weight: ['500'] });

interface Porps {
  selectedModal: ModalType;
  isModalOpen: boolean;
  onModalClose: (type: ModalType) => void;
}

export default forwardRef(function Modal(
  { isModalOpen, selectedModal, onModalClose }: Porps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <>
      {isModalOpen && (
        <Portal>
          <div
            className={`${notoSans.className} fixed bottom-0 left-0 right-0 top-0 bg-black-rgba`}
          >
            <div
              className="absolute left-1/2 top-1/2 flex w-10/12 min-w-[350px] max-w-[526px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center overflow-hidden rounded-md bg-bg p-10 shadow-2xl"
              ref={ref}
            >
              {selectedModal === 'howToPlay' && (
                <HowToPlay onModalClose={onModalClose} />
              )}
              {selectedModal === 'ranking' && (
                <Ranking onModalClose={onModalClose} />
              )}
              {selectedModal === 'gameOver' && (
                <GameOver onModalClose={onModalClose} />
              )}
            </div>
          </div>
        </Portal>
      )}
    </>
  );
});
