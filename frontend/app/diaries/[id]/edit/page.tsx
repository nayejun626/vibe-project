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
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="text-5xl">🔍</span>
        <p className="mt-4 text-lg font-medium">일기를 찾을 수 없어요</p>
        <Link
          href="/diaries"
          className="mt-6 text-sm font-medium underline underline-offset-4 text-foreground/60 hover:text-foreground"
        >
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">일기 수정</h2>
      <DiaryForm initialData={diary} returnPath={`/diaries/${diary.id}`} />
    </div>
  );
}
