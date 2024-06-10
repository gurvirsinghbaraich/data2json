import { createSupabaseClient } from "@/utils/supabase";
import Link from "next/link";
import { LuFileJson } from "react-icons/lu";

export default async function LandingPage() {
  const { data } = await createSupabaseClient().auth.getUser();

  return (
    <div className="w-screen h-screen overflow-hidden bg-stone-950">
      <div className="flex items-center justify-between w-full max-h-[91px] p-[1.4rem] text-white border-b border-stone-700">
        <div className="flex items-center space-x-[0.7rem]">
          <LuFileJson size={24} />
          <span className="text-[1.4rem]">Data2Json</span>
        </div>

        <div className="flex items-center space-x-[1rem]">
          <Link
            href={"/pricing"}
            className="border hover:bg-stone-800 p-3 border-stone-600 hover:bg-"
          >
            Pricing
          </Link>

          {data.user ? (
            <Link href={"/dashboard"}>
              <button className="bg-white p-3 text-stone-950">Dashboard</button>
            </Link>
          ) : (
            <Link href={"/login"}>
              <button className="bg-white p-3 text-stone-950">Login</button>
            </Link>
          )}
        </div>
      </div>

      <div>
        <div className="grid grid-cols-2 gird-rows-1">
          <div></div>
          <div>
            {/* <Code code={landingPageExample} showLineNumbers={false} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
