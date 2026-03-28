"use client";

import { useEffect } from "react";

export default function Error({
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
    <div className="flex min-h-full flex-1 flex-col items-center justify-center gap-6 px-4 py-24">
      <div className="text-center">
        <p className="text-lg font-semibold">문제가 발생했습니다</p>
        <p className="mt-2 max-w-sm text-sm text-foreground/60">
          잠시 후 다시 시도해 주세요. 문제가 계속되면 페이지를 새로고침해 주세요.
        </p>
      </div>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-lg bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:bg-foreground/90 transition-colors"
      >
        다시 시도
      </button>
    </div>
  );
}
