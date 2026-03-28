import Link from "next/link";
import { getDiary } from "@/lib/data/diary";
import DiaryDetailClient from "./diary-detail-client";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function DiaryDetailPage({ params }: PageProps) {
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

  return <DiaryDetailClient diary={diary} />;
}
