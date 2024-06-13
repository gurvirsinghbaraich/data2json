"use server";

import { getPlanId } from "@/lib/getPlanId";
import createRazorpayClient from "@/utils/razorpay";
import { createSupabaseClient } from "@/utils/supabase";
import moment from "moment";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  ValiError,
  isValiError,
  minLength,
  object,
  optional,
  parse,
  pipe,
  string,
} from "valibot";

export async function emailSignUp(formData: FormData) {
  const supabase = createSupabaseClient();
  const schema = object({
    plan: optional(string()),
    email: pipe(string(), minLength(1, "Required.")),
    password: pipe(string(), minLength(1, "Required.")),
  });

  try {
    const { email, password, plan } = parse(schema, {
      email: formData.get("email"),
      password: formData.get("password"),
      plan: formData.get("plan"),
    });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return redirect("/sign-up?error=" + error.message);
    }

    if (["free", "pro", "enterprise"].includes(plan as string) && data.user) {
      const razorpay = createRazorpayClient();
      const planDetails = getPlanId(plan!);

      const subscription = await razorpay.subscriptions.create({
        customer_notify: 1,
        plan_id: planDetails.planId,
        total_count: planDetails.totalCount,
        expire_by: moment().add("10", "minutes").unix(),
        notes: {
          credits: planDetails.credits,
        },
      });

      await supabase.from("subscriptions").insert({
        user_id: data.user.id,
        subscription_id: subscription.id,
      });

      revalidatePath("/dashboard", "layout");
      revalidatePath("/dashboard", "page");
      return redirect(subscription.short_url);
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
