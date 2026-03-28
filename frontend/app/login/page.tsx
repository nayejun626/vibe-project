import { Suspense } from "react";
import { LoginForm } from "./login-form";

function LoginFallback() {
  return (
    <div className="flex min-h-full items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">📒 나만의 일기장</h1>
          <p className="mt-2 text-sm text-muted">
            로그인하고 오늘의 이야기를 기록하세요
          </p>
        </div>
        <div className="h-48 animate-pulse rounded-[2rem] border border-slate-200/80 bg-card shadow-sm" aria-hidden />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}
