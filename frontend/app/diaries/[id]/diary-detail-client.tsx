"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { deleteDiary, type DiaryActionState } from "@/lib/actions/diary";
import type { Diary } from "@/lib/types";

const deleteInitialState: DiaryActionState = null;

export default function DiaryDetailClient({ diary }: { diary: Diary }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteState, deleteAction, isDeletePending] = useActionState(
    deleteDiary,
    deleteInitialState
  );

  return (
    <div className="space-y-6">
      <Link
        href="/diaries"
        className="inline-flex items-center gap-1 text-sm text-foreground/50 hover:text-foreground transition-colors"
      >
        ← 목록으로
      </Link>

      <article className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="text-3xl leading-none" role="img" aria-label="mood">
              {diary.mood}
            </span>
            <div>
              <h2 className="text-xl font-bold">{diary.title}</h2>
              <time className="text-sm text-foreground/50">{diary.written_at}</time>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-foreground/10 p-5">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/80">
            {diary.content}
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <Link
            href={`/diaries/${diary.id}/edit`}
            className="rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background hover:bg-foreground/90 transition-colors"
          >
            수정
          </Link>
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
          >
            삭제
          </button>
        </div>
      </article>

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="mx-4 w-full max-w-sm rounded-2xl bg-background p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold">정말 삭제하시겠습니까?</h3>
            <p className="text-sm text-foreground/60">
              삭제된 일기는 복구할 수 없습니다.
            </p>
            {deleteState?.error && (
              <p role="alert" className="text-sm text-red-600 dark:text-red-400">
                {deleteState.error}
              </p>
            )}
            <form action={deleteAction} className="flex gap-3 pt-2">
              <input type="hidden" name="id" value={diary.id} />
              <button
                type="submit"
                disabled={isDeletePending}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeletePending ? "삭제 중…" : "삭제"}
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 rounded-lg border border-foreground/20 px-4 py-2.5 text-sm font-medium hover:bg-foreground/5 transition-colors"
              >
                취소
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
