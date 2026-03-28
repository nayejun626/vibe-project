"use client";

import Link from "next/link";
import { Diary } from "@/lib/types";

export default function DiaryCard({ diary }: { diary: Diary }) {
  return (
    <Link
      href={`/diaries/${diary.id}`}
      className="block rounded-[1.5rem] border border-slate-200/80 bg-card p-5 shadow-sm transition-all duration-200 hover:border-primary/15 hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        <span className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-2xl leading-none shadow-inner" role="img" aria-label="mood">
          {diary.mood}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate text-base font-semibold tracking-tight text-slate-900">{diary.title}</h3>
            <time className="shrink-0 text-xs font-medium text-muted tabular-nums">
              {diary.written_at}
            </time>
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
            {diary.content}
          </p>
        </div>
      </div>
    </Link>
  );
}
