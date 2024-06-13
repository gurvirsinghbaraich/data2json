import Sidebar from "@/components/dashboard/Sidebar";
import createRazorpayClient from "@/utils/razorpay";
import { createSupabaseClient } from "@/utils/supabase";
import Link from "next/link";
import { redirect } from "next/navigation";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function DashboardLayout({
  children,
}: Readonly<DashboardLayoutProps>) {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    redirect("/login");
  }

  const subscriptions = await supabase
    .from("subscriptions")
    .select()
    .eq("user_id", data.user.id);

  if (subscriptions.data != null && subscriptions.data.length > 0) {
    const subscription = subscriptions.data[0];

    if (subscription.status !== "active") {
      const razorpay = createRazorpayClient();
      const { status, short_url, notes } = await razorpay.subscriptions.fetch(
        subscription.subscription_id
      );

      if (status === "active") {
        await supabase
          .from("subscriptions")
          .update({ status })
          .eq("user_id", data.user.id)
          .eq("subscription_id", subscription.subscription_id);

        await supabase.from("tokens").insert({
          user_id: data.user.id,
          credits: notes?.credits as string,
        });
      } else {
        return (
          <div className="overflow-x-hidden">
            <div className="w-full min-h-[46px] max-h-[46px]">
              <div className="fixed top-0 left-0 right-0 z-[100] min-h-[46px] max-h-[46px] bg-red-600 text-white flex items-center justify-center">
                <span>
                  Dear {data.user.email!.split("@")[0]}, your subscription is
                  currently inactive, please complete the procedure at
                </span>
                &nbsp;
                <Link className="underline animate-pulse" href={short_url}>
                  activation link
                </Link>
                .
              </div>
            </div>
            <main className="w-screen max-h-screen bg-[rgb(23,24,25)] grid grid-cols-[auto_1fr] grid-rows-1 overflow-hidden">
              <Sidebar data={data} />
              <div className="min-h-screen overflow-y-auto">{children}</div>
            </main>
          </div>
        );
      }
    }
  }

  return (
    <main className="w-screen max-h-screen bg-[rgb(23,24,25)] grid grid-cols-[auto_1fr] grid-rows-1 overflow-hidden">
      <Sidebar data={data} />
      <div className="min-h-screen overflow-y-auto">{children}</div>
    </main>
  );
}
