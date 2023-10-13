import { Oval } from 'react-loader-spinner';

export default function Loading() {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center  justify-center bg-black/70">
      <Oval width={80} color="#fff" secondaryColor="#ddd" />
    </div>
  );
}
