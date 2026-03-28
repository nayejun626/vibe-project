"use client";

import { useEffect } from "react";

export default function DiariesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-6 py-12">
      <div className="mx-4 w-full max-w-md rounded-[2rem] border border-slate-200/80 bg-card px-8 py-10 text-center shadow-sm">
        <p className="text-lg font-semibold text-slate-900">일기를 불러오지 못했습니다</p>
        <p className="mt-2 text-sm text-muted">
          잠시 후 다시 시도해 주세요.
        </p>
      </div>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-md transition-all duration-200 hover:bg-emerald-400"
      >
        다시 시도
      </button>
    </div>
  );
}
