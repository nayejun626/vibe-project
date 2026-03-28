import Link from "next/link";
import { getDiary } from "@/lib/data/diary";
import DiaryForm from "@/components/DiaryForm";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditDiaryPage({ params }: PageProps) {
  const { id } = await params;
  const diary = await getDiary(id);

  if (!diary) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[2rem] border border-slate-200/80 bg-card px-6 py-20 text-center shadow-sm">
        <span className="text-5xl">🔍</span>
        <p className="mt-4 text-lg font-semibold text-slate-900">일기를 찾을 수 없어요</p>
        <Link
          href="/diaries"
          className="mt-6 text-sm font-semibold text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline"
        >
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="rounded-[2rem] border border-slate-200/80 bg-card px-6 py-5 text-xl font-bold tracking-tight text-slate-900 shadow-sm sm:px-8 sm:py-6 sm:text-2xl">
        일기 수정
      </h2>
      <DiaryForm initialData={diary} returnPath={`/diaries/${diary.id}`} />
    </div>
  );
}
