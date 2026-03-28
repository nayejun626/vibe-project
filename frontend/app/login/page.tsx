import { Suspense } from "react";
import { LoginForm } from "./login-form";

function LoginFallback() {
  return (
    <div className="flex min-h-full items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">📒 나만의 일기장</h1>
          <p className="mt-2 text-sm text-foreground/60">
            로그인하고 오늘의 이야기를 기록하세요
          </p>
        </div>
        <div className="h-48 animate-pulse rounded-lg bg-foreground/5" aria-hidden />
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
