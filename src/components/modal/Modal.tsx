import { ReactNode, forwardRef } from 'react';
import { Noto_Sans_KR } from 'next/font/google';

const notoSans = Noto_Sans_KR({ subsets: ['latin'], weight: ['500'] });

export default forwardRef(function Modal(
  { children }: { children: ReactNode },
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <div
      className={`${notoSans.className} fixed left-0 top-0 right-0 bottom-0 bg-black-rgba`}
    >
      <div
        className="shadow-2xl bg-bg p-10 rounded-md justify-center items-center flex-col flex absolute top-1/2 left-1/2 min-w-[350px] -translate-x-1/2 -translate-y-1/2"
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
});
