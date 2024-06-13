import { getPlanId } from "@/lib/getPlanId";
import createRazorpayClient from "@/utils/razorpay";
import { createSupabaseClient } from "@/utils/supabase";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";
import { parse, string } from "valibot";

export async function POST(request: NextRequest) {
  const supabase = createSupabaseClient();
  const { data } = await supabase.auth.getUser();

  try {
    const jsonPayload = await request.json();
    const planName = parse(string(), jsonPayload?.plan);

    if (!data.user) {
      return NextResponse.json({
        paymentLink: "/sign-up?plan=" + planName,
      });
    }

    const client = createRazorpayClient();
    const planId = getPlanId(planName);

    const existingPlan = await supabase
      .from("subscriptions")
      .select()
      .eq("user_id", data.user.id);

    if (existingPlan.data != null && existingPlan.data.length > 0) {
      const subscription = await client.subscriptions.update(
        existingPlan.data[0].subscription_id,
        {
          plan_id: planId.planId,
        }
      );

      return NextResponse.json({
        paymentLink: subscription.short_url,
      });
    }

    const subscription = await client.subscriptions.create({
      plan_id: planId.planId,
      total_count: planId.totalCount,
      customer_notify: 1,
      expire_by: moment().add("10", "minutes").unix(),
      notes: {
        credits: planId.credits,
      },
    });

    await supabase.from("subscriptions").insert({
      user_id: data.user.id,
      plan: planName,
      subscription_id: subscription.id,
    });

    return NextResponse.json({
      paymentLink: subscription.short_url,
    });
  } catch (error) {
    if ((error as any)?.error?.description) {
      return NextResponse.json(
        {
          data: null,
          error: (error as any)?.error?.description,
        },
        {
          status: 200,
        }
      );
    }

    return NextResponse.json(
      {
        data: null,
        error: "Bad Request",
      },
      {
        status: 400,
      }
    );
  }
}
