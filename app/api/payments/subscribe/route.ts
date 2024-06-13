import createRazorpayClient from "@/utils/razorpay";
import { createSupabaseClient } from "@/utils/supabase";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";
import { parse, string } from "valibot";

const getPlanId = (
  planName: string
): { planId: string; totalCount: number; credits: number } => {
  switch (planName) {
    case "free":
      return {
        totalCount: 12,
        credits: 30000,
        planId: process.env.FREE_PLAN_ID!,
      };
    case "pro":
      return {
        totalCount: 52,
        credits: 100000,
        planId: process.env.PRO_PLAN_ID!,
      };
    case "enterprise":
      return {
        totalCount: 12,
        credits: 2500000,
        planId: process.env.ENTERPRISE_PLAN_ID!,
      };
    default:
      return {
        totalCount: 12,
        credits: 30000,
        planId: process.env.FREE_PLAN_ID!,
      };
  }
};

export async function POST(request: NextRequest) {
  const supabase = createSupabaseClient();
  const { data } = await supabase.auth.getUser();

  try {
    if (!data.user) {
      return NextResponse.json(
        {
          data: null,
          error: "Unauthenticated",
        },
        {
          status: 401,
        }
      );
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

    const jsonPayload = await request.json();
    const planName = parse(string(), jsonPayload?.plan);
    const planId = getPlanId(planName);

    // Creating a new subscription
    const client = createRazorpayClient();

    const subscription = await client.subscriptions.create({
      plan_id: planId.planId,
      total_count: planId.totalCount,
      customer_notify: 1,
      expire_by: moment().add("10", "minutes").unix(),
    });

    await supabase.from("subscriptions").insert({
      user_id: data.user.id,
      subscription_id: subscription.id,
    });

    await supabase.from("tokens").insert({
      user_id: data.user.id,
      credits: planId.credits.toString(),
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
