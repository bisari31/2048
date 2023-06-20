import { forwardRef } from 'react';
import { Noto_Sans_KR } from 'next/font/google';

const notoSans = Noto_Sans_KR({ subsets: ['latin'], weight: ['500'] });

interface Props {
  onModalClose: () => void;
}

export default forwardRef(function Modal(
  { onModalClose }: Props,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 bg-black-rgba">
      <div
        className="shadow-2xl bg-bg p-10 rounded-md justify-center items-center flex-col flex absolute top-1/2 left-1/2 min-w-[350px] -translate-x-1/2 -translate-y-1/2"
        ref={ref}
      >
        <p
          className={`${notoSans.className} text-center text-score text-[18px] `}
        >
          키보드 방향키나 화면 드래그로 숫자를 재배치하며
          <br />
          같은 숫자들이 만나면 점수가 증가합니다.
          <br />
          <strong>2048</strong>을 만들면 게임이 종료됩니다!
        </p>
        <button
          className="w-full mt-[35px] rounded-md bg-title py-3 px-6 font-bold text-bg hover:bg-[#f44857]"
          type="button"
          onClick={onModalClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
});
