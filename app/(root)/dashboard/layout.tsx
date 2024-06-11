import { createSupabaseClient } from "@/utils/supabase";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaCog } from "react-icons/fa";
import { MdDashboard, MdDataUsage } from "react-icons/md";

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

  const { data: apiKey } = await supabase
    .from("keys")
    .select()
    .eq("user_id", data.user.id)
    .single();

  return (
    <main className="w-screen max-h-screen bg-[rgb(23,24,25)] grid grid-cols-[364px_1fr] grid-rows-1 overflow-hidden">
      <div className="bg-stone-950 grid grid-cols-1 grid-rows-[91px_1fr] border-r border-stone-700">
        <div className="border-b border-stone-700 text-white p-[1.4rem] overflow-hidden flex items-center space-x-[0.7rem] cursor-pointer">
          <div className="size-[2.8rem] rounded-full bg-slate-800 flex items-center text-[22.4px] justify-center">
            {data.user.email![0].toUpperCase()}
          </div>
          <span className="text-[22.4px]">
            {data.user.email!.split("@")[0]}
          </span>
        </div>

        <div className="p-[1.4rem] grid grid-cols-1 grid-rows-[1fr_60px]">
          <div className="flex flex-col space-y-[1.4rem]">
            <Link href={"/dashboard"}>
              <div className="w-full text-white flex space-x-[0.35rem] items-center bg-stone-900 hover:bg-stone-800 p-3 rounded">
                <MdDashboard fontSize={24} />
                <span className="text-[22.4px]">Dashboard</span>
              </div>
            </Link>

            <Link href={"/dashboard/usage"}>
              <div className="w-full text-white flex space-x-[0.35rem] items-center bg-stone-900 hover:bg-stone-800 p-3 rounded">
                <MdDataUsage fontSize={24} />
                <span className="text-[22.4px]">Usage</span>
              </div>
            </Link>
          </div>

          <Link href={"/dashboard/settings"}>
            <div className="border-t border-stone-700 text-white p-[1.4rem] overflow-hidden">
              <div className="flex items-center space-x-[0.7rem] cursor-pointer">
                <FaCog size={24} />
                <span className="text-[22.4px]">Settings</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="min-h-screen overflow-y-auto">{children}</div>
    </main>
  );
}
