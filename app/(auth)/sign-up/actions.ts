"use server";

import { createSupabaseClient } from "@/utils/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function emailSignUp(formData: FormData) {
  const supabase = createSupabaseClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return redirect("/sign-up");
  }

  revalidatePath("/", "layout");
  return redirect("/");
}
