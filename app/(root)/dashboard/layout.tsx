import Sidebar from "@/components/dashboard/Sidebar";
import createRazorpayClient from "@/utils/razorpay";
import { createSupabaseClient } from "@/utils/supabase";
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
      const { status } = await razorpay.subscriptions.fetch(
        subscription.subscription_id
      );

      if (status !== "active") {
        await supabase
          .from("subscriptions")
          .update({ status })
          .eq("user_id", data.user.id)
          .eq("subscription_id", subscription.subscription_id);
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
