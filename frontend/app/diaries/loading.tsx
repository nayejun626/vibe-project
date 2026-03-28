export default function DiariesLoading() {
  return (
    <div className="space-y-8 animate-pulse" aria-busy="true" aria-label="일기 목록 불러오는 중">
      <div className="flex flex-col gap-4 rounded-[2rem] bg-primary/90 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-7">
        <div className="h-8 w-32 rounded-xl bg-white/20" />
        <div className="h-11 w-full rounded-full bg-white/25 sm:w-36" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-[1.5rem] border border-slate-200/80 bg-card p-5 shadow-sm"
          >
            <div className="flex gap-4">
              <div className="h-12 w-12 shrink-0 rounded-2xl bg-slate-100" />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex justify-between gap-2">
                  <div className="h-4 max-w-[12rem] w-[40%] rounded-lg bg-slate-100" />
                  <div className="h-3 w-16 rounded bg-slate-100" />
                </div>
                <div className="h-3 w-full rounded-lg bg-slate-50" />
                <div className="h-3 w-4/5 rounded-lg bg-slate-50" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
