"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signup, type AuthActionState } from "@/lib/actions/auth";

const initialState: AuthActionState = null;

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(signup, initialState);

  return (
    <div className="flex min-h-full items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-[2rem] border border-slate-200/80 bg-card p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] sm:p-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">📒 나만의 일기장</h1>
          <p className="mt-2 text-sm text-muted">
            새 계정을 만들고 일기를 시작하세요
          </p>
        </div>

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
                autoComplete="new-password"
                placeholder="••••••••"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-primary/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ring-focus)]"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                비밀번호 확인
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                autoComplete="new-password"
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
            {isPending ? "가입 중…" : "가입하기"}
          </button>
        </form>

        <p className="text-center text-sm text-muted">
          이미 계정이 있으신가요?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary underline-offset-4 transition-colors duration-200 hover:text-primary/80 hover:underline"
          >
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
