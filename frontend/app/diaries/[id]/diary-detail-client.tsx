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
    <div className="space-y-8">
      <Link
        href="/diaries"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-all duration-200 hover:text-primary"
      >
        ← 목록으로
      </Link>

      <article className="space-y-6">
        <div className="rounded-[2rem] border border-slate-200/80 bg-primary px-6 py-7 text-primary-foreground shadow-lg shadow-primary/20 sm:px-8 sm:py-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-3xl leading-none backdrop-blur-sm" role="img" aria-label="mood">
                {diary.mood}
              </span>
              <div>
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{diary.title}</h2>
                <time className="mt-1 block text-sm font-medium text-primary-foreground/75 tabular-nums">{diary.written_at}</time>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200/80 bg-card p-6 shadow-sm sm:p-8">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
            {diary.content}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-1">
          <Link
            href={`/diaries/${diary.id}/edit`}
            className="inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-md transition-all duration-200 hover:bg-emerald-400"
          >
            수정
          </Link>
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="inline-flex rounded-full border border-rose-200 bg-white px-5 py-2.5 text-sm font-medium text-rose-600 shadow-sm transition-all duration-200 hover:border-rose-300 hover:bg-rose-50"
          >
            삭제
          </button>
        </div>
      </article>

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-[2px]">
          <div className="mx-4 w-full max-w-sm space-y-4 rounded-[1.5rem] border border-slate-200/80 bg-card p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] sm:p-8">
            <h3 className="text-lg font-bold text-slate-900">정말 삭제하시겠습니까?</h3>
            <p className="text-sm text-muted">
              삭제된 일기는 복구할 수 없습니다.
            </p>
            {deleteState?.error && (
              <p role="alert" className="text-sm text-rose-600">
                {deleteState.error}
              </p>
            )}
            <form action={deleteAction} className="flex gap-3 pt-2">
              <input type="hidden" name="id" value={diary.id} />
              <button
                type="submit"
                disabled={isDeletePending}
                className="flex-1 rounded-full bg-rose-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeletePending ? "삭제 중…" : "삭제"}
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50"
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
