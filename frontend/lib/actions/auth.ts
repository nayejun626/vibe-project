"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthActionState = {
  error?: string;
} | null;

async function getAppOrigin(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  if (host) {
    return `${proto}://${host}`;
  }
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
}

function mapAuthError(message: string, context: "login" | "signup"): string {
  const m = message.toLowerCase();

  if (
    m.includes("invalid login credentials") ||
    m.includes("invalid_credentials") ||
    m.includes("invalid email or password")
  ) {
    return "이메일 또는 비밀번호가 올바르지 않습니다.";
  }

  if (m.includes("email not confirmed")) {
    return "이메일 인증을 완료한 뒤 로그인해 주세요.";
  }

  if (
    m.includes("user already registered") ||
    m.includes("already been registered") ||
    m.includes("already exists")
  ) {
    return "이미 가입된 이메일입니다. 로그인해 주세요.";
  }

  if (m.includes("password") && m.includes("least")) {
    return "비밀번호가 너무 짧습니다. 더 긴 비밀번호를 사용해 주세요.";
  }

  if (m.includes("signup") && m.includes("disabled")) {
    return "현재 회원가입이 비활성화되어 있습니다.";
  }

  if (context === "signup") {
    return message || "회원가입에 실패했습니다.";
  }

  return message || "로그인에 실패했습니다.";
}

export async function login(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "이메일과 비밀번호를 입력해 주세요." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: mapAuthError(error.message, "login") };
  }

  revalidatePath("/", "layout");
  redirect("/diaries");
}

export async function signup(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!email || !password) {
    return { error: "이메일과 비밀번호를 입력해 주세요." };
  }

  if (password !== confirmPassword) {
    return { error: "비밀번호가 일치하지 않습니다." };
  }

  const supabase = await createClient();
  const origin = await getAppOrigin();
  const emailRedirectTo = `${origin}/auth/callback`;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo },
  });

  if (error) {
    return { error: mapAuthError(error.message, "signup") };
  }

  revalidatePath("/", "layout");

  if (data.session) {
    redirect("/diaries");
  }

  redirect("/login?message=confirm_email");
}

export async function logout(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
