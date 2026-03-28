export default function Loading() {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center px-4 py-24">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-10 w-10 animate-spin rounded-full border-2 border-foreground/20 border-t-foreground"
          aria-hidden
        />
        <p className="text-sm text-foreground/60">불러오는 중…</p>
      </div>
    </div>
  );
}
