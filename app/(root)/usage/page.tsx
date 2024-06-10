import UsageChart from "@/components/UsageChart";
import { createSupabaseClient } from "@/utils/supabase";
import moment from "moment";
import Link from "next/link";
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
      <div className="w-full bg-stone-950 max-h-[91px] h-[91px] border-b border-stone-700 p-[1.4rem]">
        <h1 className="text-[22.4px] text-white flex space-x-[0.7rem] items-center h-full">
          <Link className="underline" href={"/"}>
            Dashboard
          </Link>
          <span className="text-stone-700 text-[32px] font-light">/</span>
          <Link className="underline" href={"/usage"}>
            Usage Overview
          </Link>
        </h1>
      </div>
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
