interface Props {
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PaginationControlComponent({
  page,
  totalPages,
  setPage,
}: Props) {
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => setPage((p: number) => Math.max(p - 1, 1))}
        disabled={page === 1}
        className="px-3 py-1 rounded font-bold text-violet-600 cursor-pointer disabled:opacity-40"
      >
        {"<<"}
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`px-3 py-1 rounded text-violet-300 cursor-pointer ${
            p === page ? "font-bold text-violet-600" : "hover:text-violet-400"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        disabled={page === totalPages}
        className="px-3 py-1 rounded font-bold text-violet-600 cursor-pointer disabled:opacity-40"
      >
        {">>"}
      </button>
    </div>
  );
}
