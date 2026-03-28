import Link from "next/link";
import { getDiaries } from "@/lib/data/diary";
import DiaryCard from "@/components/DiaryCard";

export default async function DiariesPage() {
  const diaries = await getDiaries();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">내 일기</h2>
        <Link
          href="/diaries/new"
          className="rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background hover:bg-foreground/90 transition-colors"
        >
          + 새 일기
        </Link>
      </div>

      {diaries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-5xl">📝</span>
          <p className="mt-4 text-lg font-medium">아직 작성한 일기가 없어요</p>
          <p className="mt-1 text-sm text-foreground/50">
            오늘의 이야기를 기록해 보세요
          </p>
          <Link
            href="/diaries/new"
            className="mt-6 rounded-lg bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:bg-foreground/90 transition-colors"
          >
            첫 일기 작성하기
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {diaries.map((diary) => (
            <DiaryCard key={diary.id} diary={diary} />
          ))}
        </div>
      )}
    </div>
  );
}
