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
    <form action={formAction} className="space-y-6">
      {isEdit && initialData && (
        <input type="hidden" name="id" value={initialData.id} />
      )}
      <input type="hidden" name="mood" value={mood} />

      <div>
        <label htmlFor="mood" className="block text-sm font-medium mb-2">
          오늘의 기분
        </label>
        <MoodSelector value={mood} onChange={setMood} />
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1.5">
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
          className="w-full rounded-lg border border-foreground/20 bg-background px-3.5 py-2.5 text-sm placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/30"
        />
      </div>

      <div>
        <label htmlFor="written_at" className="block text-sm font-medium mb-1.5">
          날짜
        </label>
        <input
          id="written_at"
          name="written_at"
          type="date"
          required
          value={writtenAt}
          onChange={(e) => setWrittenAt(e.target.value)}
          className="w-full rounded-lg border border-foreground/20 bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/30"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-1.5">
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
          className="w-full rounded-lg border border-foreground/20 bg-background px-3.5 py-2.5 text-sm leading-relaxed placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/30 resize-none"
        />
      </div>

      {state?.error && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {state.error}
        </p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background hover:bg-foreground/90 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "저장 중…" : isEdit ? "수정 완료" : "저장하기"}
        </button>
        {isEdit && returnPath && (
          <button
            type="button"
            onClick={() => router.push(returnPath)}
            className="rounded-lg border border-foreground/20 px-4 py-2.5 text-sm font-medium hover:bg-foreground/5 transition-colors"
          >
            취소
          </button>
        )}
      </div>
    </form>
  );
}
