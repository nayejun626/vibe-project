"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useSearchParams, type ReadonlyURLSearchParams } from "next/navigation";
import { login, type AuthActionState } from "@/lib/actions/auth";

const initialState: AuthActionState = null;

function bannerFromSearchParams(searchParams: ReadonlyURLSearchParams) {
  const message = searchParams.get("message");
  const err = searchParams.get("error");
  if (message === "confirm_email") {
    return "가입하신 이메일로 인증 링크를 보냈습니다. 메일함을 확인한 뒤 로그인해 주세요.";
  }
  if (err === "auth") {
    return "인증에 실패했습니다. 다시 시도해 주세요.";
  }
  return null;
}

export function LoginForm() {
  const searchParams = useSearchParams();
  const [state, formAction, isPending] = useActionState(login, initialState);
  const banner = bannerFromSearchParams(searchParams);

  return (
    <div className="flex min-h-full items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-[2rem] border border-slate-200/80 bg-card p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] sm:p-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">📒 나만의 일기장</h1>
          <p className="mt-2 text-sm text-muted">
            로그인하고 오늘의 이야기를 기록하세요
          </p>
        </div>

        {banner && (
          <p
            role="status"
            className="rounded-2xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm text-slate-800"
          >
            {banner}
          </p>
        )}

        <form action={formAction} className="space-y-5">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-primary/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ring-focus)]"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-primary/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ring-focus)]"
              />
            </div>
          </div>

          {state?.error && (
            <p role="alert" className="text-sm text-rose-600">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-full bg-accent px-4 py-3.5 text-sm font-semibold text-accent-foreground shadow-md transition-all duration-200 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "로그인 중…" : "로그인"}
          </button>
        </form>

        <p className="text-center text-sm text-muted">
          아직 계정이 없으신가요?{" "}
          <Link
            href="/signup"
            className="font-semibold text-primary underline-offset-4 transition-colors duration-200 hover:text-primary/80 hover:underline"
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
