export default function SkeletonScore({ limit }: { limit: number }) {
  return (
    <>
      {Array(limit)
        .fill('')
        .map((a, i) => (
          <li
            key={i}
            className="loading relative flex h-full w-full justify-between overflow-hidden rounded-md bg-button-4 px-5 py-2"
          >
            <span>&nbsp;</span>
          </li>
        ))}
    </>
  );
}
