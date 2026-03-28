export default function Loading() {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center bg-background px-4 py-24">
      <div className="flex flex-col items-center gap-4 rounded-[2rem] border border-slate-200/80 bg-card px-10 py-12 shadow-sm">
        <div
          className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-primary"
          aria-hidden
        />
        <p className="text-sm font-medium text-muted">불러오는 중…</p>
      </div>
    </div>
  );
}
