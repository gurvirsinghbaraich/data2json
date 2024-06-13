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

    const existingPlan = await supabase
      .from("subscriptions")
      .select()
      .eq("user_id", data.user.id);

    if (existingPlan.data!.length > 0) {
      return NextResponse.json(
        {
          data: null,
          error: "Already Subscribed",
        },
        {
          status: 400,
        }
      );
    }

    const planId = getPlanId(planName);

    // Creating a new subscription
    const client = createRazorpayClient();

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
      subscription_id: subscription.id,
    });

    return NextResponse.json({
      paymentLink: subscription.short_url,
    });
  } catch (error) {
    console.log((error as Error).message);

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
