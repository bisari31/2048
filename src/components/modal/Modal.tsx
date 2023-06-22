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
            className={`${notoSans.className} fixed left-0 top-0 right-0 bottom-0 bg-black-rgba`}
          >
            <div
              className="shadow-2xl bg-bg p-10 rounded-md justify-center items-center flex-col flex absolute top-1/2 left-1/2 min-w-[350px] -translate-x-1/2 -translate-y-1/2"
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
