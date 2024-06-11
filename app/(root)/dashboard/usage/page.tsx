import Breadcrumb from "@/components/Breadcrumb";
import UsageChart from "@/components/UsageChart";
import { createSupabaseClient } from "@/utils/supabase";
import moment from "moment";
import { redirect } from "next/navigation";

// const UsageChart = dynamic(() => import("@/components/UsageChart"), {
//   ssr: false,
// });

export default async function UsagePage() {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return redirect("/login");
  }

  const { data: tokensUsed } = await supabase
    .from("tokens_used")
    .select()
    .gte("created_at", moment().startOf("month").utc())
    .lte("created_at", moment().endOf("month").utc());

  return (
    <div>
      <Breadcrumb currentUrl="/dashboard/usage" />
      <div className="p-[5.6rem] w-full h-full overflow-hidden overflow-y-auto">
        <UsageChart
          tokensUsed={tokensUsed!.map((token) => ({
            id: token.id,
            used: token.used,
            created_at: token.created_at,
          }))}
        />
      </div>
    </div>
  );
}
