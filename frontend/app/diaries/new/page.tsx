import DiaryForm from "@/components/DiaryForm";

export default function NewDiaryPage() {
  return (
    <div className="space-y-8">
      <h2 className="rounded-[2rem] border border-slate-200/80 bg-card px-6 py-5 text-xl font-bold tracking-tight text-slate-900 shadow-sm sm:px-8 sm:py-6 sm:text-2xl">
        새 일기 작성
      </h2>
      <DiaryForm />
    </div>
  );
}
