import Board from '@/components/Board';
import Header from '@/components/Header';

export default function page() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-y-2/4 -translate-x-2/4">
      <Header />
      <Board />
    </div>
  );
}
