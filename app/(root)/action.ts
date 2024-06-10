"use server";
import { createSupabaseClient } from "@/utils/supabase";
import { redirect } from "next/navigation";

export async function logoutUser() {
  const supabase = createSupabaseClient();
  await supabase.auth.signOut();

  redirect("/login");
}
