export default function HowToPlay({
  onModalClose,
}: {
  onModalClose: () => void;
}) {
  return (
    <>
      <p className="text-center text-score text-[18px]">
        키보드 방향키나 화면 드래그로 숫자를 재배치하며
        <br />
        같은 숫자들이 만나면 점수가 증가합니다.
        <br />
        <strong className="bg-card-2048 text-white rounded h-10 w-10 mr-1 font-normal inline-block leading-10 text-xs">
          2048
        </strong>
        을 만들면 게임이 종료됩니다!
      </p>
      <button
        className="w-full mt-[35px] rounded-md bg-button-default py-3 px-6 font-bold text-bg hover:bg-button-hover active:bg-button-active"
        type="button"
        onClick={onModalClose}
      >
        확인
      </button>
    </>
  );
}
