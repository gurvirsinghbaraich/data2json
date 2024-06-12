import Breadcrumb from "@/components/dashboard/Breadcrumb";
import { createSupabaseClient } from "@/utils/supabase";
import { redirect } from "next/navigation";
import { logoutUser } from "../../action";
import { generateAPIKey } from "./actions";

export default async function SettingsPage() {
  const supabase = createSupabaseClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return redirect("/login");
  }

  const { data: apiKey } = await supabase
    .from("keys")
    .select()
    .eq("user_id", data.user.id)
    .single();

  return (
    <div>
      <Breadcrumb />

      <div className="p-[2.8rem] flex flex-col gap-16 2xl:gap-12 2xl:grid 2xl:grid-cols-2">
        <div className="flex flex-col space-y-5">
          <h3 className="text-white text-2xl">Personal Information</h3>

          <div className="border border-stone-700 bg-stone-900 p-[2rem] flex flex-col space-y-8">
            <div className="grid grid-cols-3 2xl:grid-cols-2 gap-[2rem]">
              <div className="flex flex-col gap-2.5">
                <label htmlFor="email" className="text-white">
                  Full Name
                </label>
                <input
                  type="email"
                  className="p-3 bg-stone-300 outline-none focus:ring-4 focus:ring-stone-400"
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <label htmlFor="email" className="text-white">
                  Email
                </label>
                <input
                  type="email"
                  className="p-3 bg-stone-300 outline-none focus:ring-4 focus:ring-stone-400"
                  value={data.user.email}
                  readOnly
                />
              </div>

              <div></div>
            </div>

            <div className="grid grid-cols-[1fr_2fr] 2xl:grid-cols-1 gap-[2rem]">
              <div className="flex flex-col gap-2.5">
                <label htmlFor="email" className="text-white">
                  Address Line 1
                </label>
                <input
                  type="email"
                  className="p-3 bg-stone-300 outline-none focus:ring-4 focus:ring-stone-400"
                  defaultValue={data.user.phone}
                />
              </div>

              <div className="grid grid-cols-2 gap-[2rem]">
                <div className="flex flex-col gap-2.5">
                  <label htmlFor="email" className="text-white">
                    Address Line 2
                  </label>
                  <input
                    type="email"
                    className="p-3 bg-stone-300 outline-none focus:ring-4 focus:ring-stone-400"
                  />
                </div>
                <div className="flex flex-col gap-2.5">
                  <label htmlFor="email" className="text-white">
                    Phone Number
                  </label>
                  <input
                    type="email"
                    className="p-3 bg-stone-300 outline-none focus:ring-4 focus:ring-stone-400"
                    defaultValue={data.user.phone}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-5">
          <h3 className="text-white text-2xl">API Key(s)</h3>

          <div className="border border-stone-700 bg-stone-900 p-[2rem] flex flex-col space-y-8">
            <div className="grid gap-[2rem]">
              <div className="flex flex-col gap-2.5">
                <label htmlFor="api_key" className="text-white">
                  API Key
                </label>

                {apiKey ? (
                  <input
                    type="text"
                    className="w-full bg-gray-100 p-3 text-slate-90"
                    readOnly
                    value={apiKey.key}
                  />
                ) : (
                  <form>
                    <button
                      formAction={generateAPIKey}
                      className="bg-orange-600/80 p-3 text-white cursor-pointer w-full"
                    >
                      Generate API Key
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <form>
        <button
          formAction={logoutUser}
          className="fixed right-5 bottom-5 bg-red-500/75 p-3 text-white"
        >
          Logout
        </button>
      </form>
    </div>
  );
}
