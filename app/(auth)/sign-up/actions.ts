"use server";

import { createSupabaseClient } from "@/utils/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  ValiError,
  isValiError,
  minLength,
  object,
  parse,
  pipe,
  string,
} from "valibot";

export async function emailSignUp(formData: FormData) {
  const supabase = createSupabaseClient();
  const schema = object({
    email: pipe(string(), minLength(1, "Required.")),
    password: pipe(string(), minLength(1, "Required.")),
  });

  try {
    const { email, password } = parse(schema, {
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return redirect("/sign-up?error=" + error.message);
    }

    revalidatePath("/dashboard", "layout");
    revalidatePath("/dashboard", "page");

    return redirect("/dashboard");
  } catch (error) {
    if (isValiError(error)) {
      const issues = {
        email: "",
        password: "",
      };

      (error as ValiError<typeof schema>).issues.map((issue) => {
        // @ts-ignore
        issues[issue.path![0].key] = issue.message;
      });

      return redirect(
        `/sign-up?_email=${issues.email}&_password=${issues.password}`
      );
    }

    return redirect("/sign-up?error=" + (error as Error).message);
  }
}
