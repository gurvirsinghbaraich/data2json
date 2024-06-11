import Sidebar from "@/components/dashboard/Sidebar";
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

  const { data: apiKey } = await supabase
    .from("keys")
    .select()
    .eq("user_id", data.user.id)
    .single();

  return (
    <main className="w-screen max-h-screen bg-[rgb(23,24,25)] grid grid-cols-[auto_1fr] grid-rows-1 overflow-hidden">
      <Sidebar data={data} />
      <div className="min-h-screen overflow-y-auto">{children}</div>
    </main>
  );
}
