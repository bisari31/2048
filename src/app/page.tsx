import Board from '@/components/Board';
import Header from '@/components/Header';

export default function page() {
  return (
    <div className="w-full h-full flex flex-col  justify-center">
      <Header />
      <Board />
    </div>
  );
}
