import Link from "next/link";
import { getDiaries } from "@/lib/data/diary";
import DiaryCard from "@/components/DiaryCard";

export default async function DiariesPage() {
  const diaries = await getDiaries();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-[2rem] bg-primary px-6 py-6 text-primary-foreground shadow-lg shadow-primary/20 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8 sm:py-7">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">내 일기</h2>
        <Link
          href="/diaries/new"
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-md transition-all duration-200 hover:bg-emerald-400 hover:shadow-lg active:scale-[0.98]"
        >
          + 새 일기
        </Link>
      </div>

      {diaries.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[2rem] border border-slate-200/80 bg-card px-6 py-20 text-center shadow-sm">
          <span className="text-5xl">📝</span>
          <p className="mt-4 text-lg font-semibold text-slate-900">아직 작성한 일기가 없어요</p>
          <p className="mt-1 text-sm text-muted">
            오늘의 이야기를 기록해 보세요
          </p>
          <Link
            href="/diaries/new"
            className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-md transition-all duration-200 hover:bg-emerald-400 hover:shadow-lg active:scale-[0.98]"
          >
            첫 일기 작성하기
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {diaries.map((diary) => (
            <DiaryCard key={diary.id} diary={diary} />
          ))}
        </div>
      )}
    </div>
  );
}
