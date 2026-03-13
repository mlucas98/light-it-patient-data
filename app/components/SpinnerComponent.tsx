type SpinnerProps = {
  size?: number;
  className?: string;
};

export default function SpinnerComponent({
  size = 24,
  className = "",
}: SpinnerProps) {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-2 border-slate-300 border-t-violet-600 ${className}`}
      style={{
        width: size,
        height: size,
      }}
    />
  );
}
