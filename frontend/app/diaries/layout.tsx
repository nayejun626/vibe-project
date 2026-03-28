"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/lib/actions/auth";

export default function DiariesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-card/95 shadow-sm backdrop-blur-md md:sticky md:top-0 md:flex md:h-screen md:w-64 md:shrink-0 md:flex-col md:border-b-0 md:border-r md:border-slate-200/80 md:shadow-none">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4 md:mx-0 md:h-full md:max-w-none md:flex-1 md:flex-col md:items-stretch md:justify-between md:gap-8 md:px-6 md:py-8">
          <h1
            className="cursor-pointer text-lg font-bold tracking-tight text-slate-900 transition-all duration-200 hover:text-primary md:text-xl"
            onClick={() => router.push("/diaries")}
          >
            📒 나만의 일기장
          </h1>
          <form action={logout} className="md:mt-auto">
            <button
              type="submit"
              className="w-full rounded-xl border border-slate-200/90 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition-all duration-200 hover:border-primary/20 hover:bg-white hover:text-primary md:w-full"
            >
              로그아웃
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 md:px-10 md:py-10">
        {children}
      </main>
    </div>
  );
}
