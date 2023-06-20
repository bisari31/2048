import { forwardRef } from 'react';

export default forwardRef(function Modal(
  _,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 bg-black-rgba">
      <div
        className="absolute top-1/2 left-1/2 bg-white w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2"
        ref={ref}
      >
        Modal
      </div>
    </div>
  );
});
