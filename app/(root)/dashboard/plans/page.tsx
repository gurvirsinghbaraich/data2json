import Breadcrumb from "@/components/dashboard/Breadcrumb";
import PricingSection from "@/sections/PricingSection";
import { createSupabaseClient } from "@/utils/supabase";
import { redirect } from "next/navigation";

export default async function Plans() {
  const supabase = createSupabaseClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return redirect("/login");
  }

  const subscription = await supabase
    .from("subscriptions")
    .select()
    .eq("user_id", data.user.id)
    .single();

  return (
    <div>
      <Breadcrumb />
      <PricingSection
        inDashboard
        plan={subscription.data !== null ? subscription.data.plan : undefined}
      />
    </div>
  );
}
