"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type DiaryActionState = { error?: string } | null;

export async function createDiary(
  _prevState: DiaryActionState,
  formData: FormData
): Promise<DiaryActionState> {
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const mood = String(formData.get("mood") ?? "").trim();
  const written_at = String(formData.get("written_at") ?? "").trim();

  if (!title || !content || !mood || !written_at) {
    return { error: "제목, 내용, 날짜, 기분을 모두 입력해 주세요." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase.from("diaries").insert({
    user_id: user.id,
    title,
    content,
    mood,
    written_at,
  });

  if (error) {
    console.error("[createDiary]", error.message);
    return { error: "일기 저장에 실패했습니다. 잠시 후 다시 시도해 주세요." };
  }

  revalidatePath("/diaries");
  redirect("/diaries");
}

export async function updateDiary(
  _prevState: DiaryActionState,
  formData: FormData
): Promise<DiaryActionState> {
  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const mood = String(formData.get("mood") ?? "").trim();
  const written_at = String(formData.get("written_at") ?? "").trim();

  if (!id || !title || !content || !mood || !written_at) {
    return { error: "필수 항목을 모두 입력해 주세요." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase
    .from("diaries")
    .update({ title, content, mood, written_at })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("[updateDiary]", error.message);
    return { error: "일기 수정에 실패했습니다. 잠시 후 다시 시도해 주세요." };
  }

  revalidatePath("/diaries");
  revalidatePath(`/diaries/${id}`);
  redirect(`/diaries/${id}`);
}

export async function deleteDiary(
  _prevState: DiaryActionState,
  formData: FormData
): Promise<DiaryActionState> {
  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    return { error: "삭제할 일기를 찾을 수 없습니다." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase
    .from("diaries")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("[deleteDiary]", error.message);
    return { error: "일기 삭제에 실패했습니다. 잠시 후 다시 시도해 주세요." };
  }

  revalidatePath("/diaries");
  redirect("/diaries");
}
