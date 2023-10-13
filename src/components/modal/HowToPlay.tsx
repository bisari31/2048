import { ModalType } from '@/types/board';

export default function HowToPlay({
  onModalClose,
}: {
  onModalClose: (type: ModalType) => void;
}) {
  return (
    <>
      <p className="text-center text-[18px] text-score">
        키보드 방향키나 화면 드래그로 숫자를 재배치하며
        <br />
        같은 숫자들이 만나면 점수가 증가합니다.
        <br />
        <strong className="text-s mr-1 font-bold text-card-2048">2048</strong>을
        만들면 게임이 종료됩니다!
      </p>
      <button
        className="mt-[35px] w-full rounded-md bg-button-default px-6 py-3 font-bold text-white hover:bg-button-hover active:bg-button-active"
        type="button"
        onClick={() => onModalClose('howToPlay')}
      >
        확인
      </button>
    </>
  );
}
