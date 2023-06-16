const colors: { [key: number]: { bg: string; fontSize: string } } = {
  0: { bg: 'bg-bg', fontSize: 'text-2xl' },
  2: { bg: 'bg-card-2', fontSize: 'text-2xl' },
  4: { bg: 'bg-card-4', fontSize: 'text-2xl' },
  8: { bg: 'bg-card-8', fontSize: 'text-2xl' },
  16: { bg: 'bg-card-16', fontSize: 'text-2xl' },
  32: { bg: 'bg-card-32', fontSize: 'text-2xl' },
  64: { bg: 'bg-card-64', fontSize: 'text-2xl' },
  128: { bg: 'bg-card-128', fontSize: 'text-xl' },
  256: { bg: 'bg-card-256', fontSize: 'text-xl' },
  512: { bg: 'bg-card-512', fontSize: 'text-xl' },
  1024: { bg: 'bg-card-1024', fontSize: 'text-md' },
  2048: { bg: 'bg-card-2048', fontSize: 'text-md' },
  4096: { bg: 'bg-card-4096', fontSize: 'text-md' },
};

export default function Card({ num }: { num: number }) {
  return (
    <div
      className={`w-[113px] h-[113px] rounded-md flex justify-center items-center  font-bold text-white ${colors[num].bg} ${colors[num].fontSize}`}
    >
      {num === 0 ? '' : num}
    </div>
  );
}
