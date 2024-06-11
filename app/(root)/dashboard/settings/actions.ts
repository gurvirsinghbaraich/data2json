"use server";

import { createSupabaseClient } from "@/utils/supabase";
import { generateApiKey } from "generate-api-key";
import { revalidatePath } from "next/cache";

export async function generateAPIKey() {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error("Unauthenticated!");
  }

  const { data: key } = await supabase
    .from("keys")
    .select()
    .eq("user_id", data.user.id)
    .single();

  if (!key?.key) {
    let apiKey = generateApiKey({
      method: "string",
      min: 24,
      max: 32,
      batch: 1,
    })[0];

    const { error: insertError } = await supabase.from("keys").insert({
      key: apiKey,
      user_id: data.user.id,
    });

    if (insertError) {
      throw new Error(insertError.message);
    }

    revalidatePath("/", "layout");

    revalidatePath("/", "page");
    revalidatePath("/dashboard/settings", "page");
  }
}
