export default function Card({ num }: { num: number }) {
  return (
    <div
      className={`bg-bg w-[113px] h-[113px] rounded-md flex justify-center items-center left-0 top-0 text-xl font-bold text-white ${
        num ? `bg-card-${num}` : `bg-bg`
      }`}
    >
      {num === 0 ? '' : num}
    </div>
  );
}
