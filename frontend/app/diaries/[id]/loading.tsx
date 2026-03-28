export default function DiaryDetailLoading() {
  return (
    <div className="space-y-8 animate-pulse" aria-busy="true" aria-label="일기 불러오는 중">
      <div className="h-4 w-24 rounded-lg bg-slate-200" />
      <div className="rounded-[2rem] bg-primary/90 px-6 py-8 sm:px-8 sm:py-10">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 shrink-0 rounded-2xl bg-white/20" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-7 max-w-md rounded-lg bg-white/25" />
            <div className="h-4 w-28 rounded-lg bg-white/20" />
          </div>
        </div>
      </div>
      <div className="space-y-3 rounded-[1.5rem] border border-slate-200/80 bg-card p-6 shadow-sm sm:p-8">
        <div className="h-4 w-full rounded-lg bg-slate-100" />
        <div className="h-4 w-full rounded-lg bg-slate-100" />
        <div className="h-4 w-4/5 rounded-lg bg-slate-50" />
      </div>
      <div className="flex gap-3 pt-1">
        <div className="h-10 w-24 rounded-full bg-slate-200" />
        <div className="h-10 w-24 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}
