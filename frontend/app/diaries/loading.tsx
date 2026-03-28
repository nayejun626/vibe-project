export default function DiariesLoading() {
  return (
    <div className="space-y-6 animate-pulse" aria-busy="true" aria-label="일기 목록 불러오는 중">
      <div className="flex items-center justify-between">
        <div className="h-7 w-28 rounded-md bg-foreground/10" />
        <div className="h-9 w-28 rounded-lg bg-foreground/10" />
      </div>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-foreground/10 p-4"
          >
            <div className="flex gap-3">
              <div className="h-9 w-9 shrink-0 rounded-xl bg-foreground/10" />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex justify-between gap-2">
                  <div className="h-4 max-w-[12rem] w-[40%] rounded bg-foreground/10" />
                  <div className="h-3 w-16 rounded bg-foreground/10" />
                </div>
                <div className="h-3 w-full rounded bg-foreground/5" />
                <div className="h-3 w-4/5 rounded bg-foreground/5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
