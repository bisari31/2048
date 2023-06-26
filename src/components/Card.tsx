const colors: { [key: number]: { bg: string; fontSize: string[] } } = {
  0: { bg: 'bg-bg', fontSize: ['md:text-2xl', 'text-lg'] },
  2: { bg: 'bg-card-2', fontSize: ['md:text-2xl', 'text-lg'] },
  4: { bg: 'bg-card-4', fontSize: ['md:text-2xl', 'text-lg'] },
  8: { bg: 'bg-card-8', fontSize: ['md:text-2xl', 'text-lg'] },
  16: { bg: 'bg-card-16', fontSize: ['md:text-2xl', 'text-lg'] },
  32: { bg: 'bg-card-32', fontSize: ['md:text-2xl', 'text-lg'] },
  64: { bg: 'bg-card-64', fontSize: ['md:text-2xl', 'text-lg'] },
  128: { bg: 'bg-card-128', fontSize: ['md:text-xl', 'text-[30px]'] },
  256: { bg: 'bg-card-256', fontSize: ['md:text-xl', 'text-[30px]'] },
  512: { bg: 'bg-card-512', fontSize: ['md:text-xl', 'text-[30px]'] },
  1024: { bg: 'bg-card-1024', fontSize: ['md:text-md', 'text-[25px]'] },
  2048: { bg: 'bg-card-2048', fontSize: ['md:text-md', 'text-[25px]'] },
};

export default function Card({ num }: { num: number }) {
  return (
    <div
      className={`rounded-md flex justify-center items-center font-bold text-white ${colors[num].bg} ${colors[num].fontSize[0]} ${colors[num].fontSize[1]}`}
    >
      {num === 0 ? '' : num}
    </div>
  );
}
