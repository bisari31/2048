import Score from './Score';

export default function Header() {
  return (
    <header>
      <div className="flex justify-between">
        <div>
          <h1 className="text-title font-black text-3xl cursor-default">
            2048
          </h1>
          <button className="text-title font-black underline text-sm ">
            how to play?
          </button>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex gap-x-3">
            <Score type="SCORE" />
            <Score type="BEST" />
          </div>
          <button className="mt-11 bg-button text-white text-sm font-bold px-3 py-4 rounded-md w-fit">
            New Game
          </button>
        </div>
      </div>
    </header>
  );
}
