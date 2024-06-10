"use server";

import { createSupabaseClient } from "@/utils/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function emailLogin(formData: FormData) {
  const supabase = createSupabaseClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect("/login?error=INVALID_CREDENTIALS");
  }

  revalidatePath("/", "layout");
  return redirect("/dashboard");
}
