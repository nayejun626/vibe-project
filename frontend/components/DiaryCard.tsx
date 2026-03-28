"use client";

import Link from "next/link";
import { Diary } from "@/lib/types";

export default function DiaryCard({ diary }: { diary: Diary }) {
  return (
    <Link
      href={`/diaries/${diary.id}`}
      className="block rounded-xl border border-foreground/10 p-4 hover:bg-foreground/[0.03] transition-colors"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 text-2xl leading-none" role="img" aria-label="mood">
          {diary.mood}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate font-semibold">{diary.title}</h3>
            <time className="shrink-0 text-xs text-foreground/50">
              {diary.written_at}
            </time>
          </div>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-foreground/60">
            {diary.content}
          </p>
        </div>
      </div>
    </Link>
  );
}
