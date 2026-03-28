"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { login, type AuthActionState } from "@/lib/actions/auth";

const initialState: AuthActionState = null;

export function LoginForm() {
  const searchParams = useSearchParams();
  const [state, formAction, isPending] = useActionState(login, initialState);
  const [banner, setBanner] = useState<string | null>(null);

  useEffect(() => {
    const message = searchParams.get("message");
    const err = searchParams.get("error");
    if (message === "confirm_email") {
      setBanner(
        "가입하신 이메일로 인증 링크를 보냈습니다. 메일함을 확인한 뒤 로그인해 주세요."
      );
      return;
    }
    if (err === "auth") {
      setBanner("인증에 실패했습니다. 다시 시도해 주세요.");
      return;
    }
    setBanner(null);
  }, [searchParams]);

  return (
    <div className="flex min-h-full items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">📒 나만의 일기장</h1>
          <p className="mt-2 text-sm text-foreground/60">
            로그인하고 오늘의 이야기를 기록하세요
          </p>
        </div>

        {banner && (
          <p
            role="status"
            className="rounded-lg border border-foreground/15 bg-foreground/5 px-3 py-2 text-sm text-foreground/80"
          >
            {banner}
          </p>
        )}

        <form action={formAction} className="space-y-5">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-foreground/20 bg-background px-3.5 py-2.5 text-sm placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/30"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-foreground/20 bg-background px-3.5 py-2.5 text-sm placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/30"
              />
            </div>
          </div>

          {state?.error && (
            <p role="alert" className="text-sm text-red-600 dark:text-red-400">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "로그인 중…" : "로그인"}
          </button>
        </form>

        <p className="text-center text-sm text-foreground/60">
          아직 계정이 없으신가요?{" "}
          <Link
            href="/signup"
            className="font-medium text-foreground underline underline-offset-4 hover:text-foreground/80"
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
