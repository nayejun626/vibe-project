import "server-only";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Diary } from "@/lib/types";

export async function getDiaries(): Promise<Diary[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data, error } = await supabase
    .from("diaries")
    .select("*")
    .eq("user_id", user.id)
    .order("written_at", { ascending: false });

  if (error) {
    console.error("[getDiaries]", error.message);
    return [];
  }

  return (data ?? []) as Diary[];
}

export async function getDiary(id: string): Promise<Diary | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data, error } = await supabase
    .from("diaries")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("[getDiary]", error.message);
    return null;
  }

  return data as Diary | null;
}
