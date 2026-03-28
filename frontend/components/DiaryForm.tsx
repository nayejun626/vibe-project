"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import MoodSelector from "./MoodSelector";
import { Diary } from "@/lib/types";
import {
  createDiary,
  updateDiary,
  type DiaryActionState,
} from "@/lib/actions/diary";

interface DiaryFormProps {
  initialData?: Diary;
  returnPath?: string;
}

const initialState: DiaryActionState = null;

export default function DiaryForm({ initialData, returnPath }: DiaryFormProps) {
  const router = useRouter();
  const isEdit = !!initialData;

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [mood, setMood] = useState(initialData?.mood ?? "");
  const [writtenAt, setWrittenAt] = useState(
    initialData?.written_at ?? new Date().toISOString().split("T")[0]
  );

  const [state, formAction, isPending] = useActionState(
    isEdit ? updateDiary : createDiary,
    initialState
  );

  return (
    <form action={formAction} className="space-y-6 rounded-[2rem] border border-slate-200/80 bg-card p-6 shadow-sm sm:p-8">
      {isEdit && initialData && (
        <input type="hidden" name="id" value={initialData.id} />
      )}
      <input type="hidden" name="mood" value={mood} />

      <div>
        <label htmlFor="mood" className="mb-2 block text-sm font-medium text-slate-700">
          오늘의 기분
        </label>
        <MoodSelector value={mood} onChange={setMood} />
      </div>

      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-slate-700">
          제목
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="일기 제목을 입력하세요"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-primary/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ring-focus)]"
        />
      </div>

      <div>
        <label htmlFor="written_at" className="mb-1.5 block text-sm font-medium text-slate-700">
          날짜
        </label>
        <input
          id="written_at"
          name="written_at"
          type="date"
          required
          value={writtenAt}
          onChange={(e) => setWrittenAt(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-900 transition-all duration-200 focus:border-primary/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ring-focus)]"
        />
      </div>

      <div>
        <label htmlFor="content" className="mb-1.5 block text-sm font-medium text-slate-700">
          내용
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="오늘 하루를 기록해 보세요..."
          className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm leading-relaxed text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-primary/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ring-focus)]"
        />
      </div>

      {state?.error && (
        <p role="alert" className="text-sm text-rose-600">
          {state.error}
        </p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground shadow-md transition-all duration-200 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "저장 중…" : isEdit ? "수정 완료" : "저장하기"}
        </button>
        {isEdit && returnPath && (
          <button
            type="button"
            onClick={() => router.push(returnPath)}
            className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:border-primary/25 hover:bg-slate-50"
          >
            취소
          </button>
        )}
      </div>
    </form>
  );
}
