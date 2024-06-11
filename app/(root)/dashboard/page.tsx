import Code from "@/components/dashboard/Code";
import { exampleCodeForStep2, exampleCodeForStep3 } from "@/examples/steps";
import { createSupabaseClient } from "@/utils/supabase";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.auth.getUser();

  if (error != null) {
    redirect("/login");
  }

  const { data: apiKey } = await supabase
    .from("keys")
    .select()
    .eq("user_id", data.user.id)
    .single();

  return (
    <div className="w-full h-full">
      <div className="bg-slate-800 p-[5.6rem] w-full h-[45vh] min-h-[240px] relative overflow-hidden">
        <div className="absolute pointer-events-none -bottom-0 leading-[5rem] -left-5 text-slate-400/5 text-[14rem] font-bold">
          Data2Json
        </div>

        <div className="relative max-w-[39.2rem] text-white flex flex-col space-y-4">
          <h2 className="text-[4.2rem] truncate">
            Welcome, {data.user.email!.split("@")[0]}!
          </h2>
          <p className="text-[22.4px] text-balance">
            Your Data, Refined. Instantly transform raw input into structured
            JSON with our cutting-edge API. Get started now and elevate your
            data processing capabilities!
          </p>
        </div>
      </div>

      <div className="p-[5.6rem]">
        <ol className="overflow-hidden space-y-[2.8rem]">
          <li className="relative flex-1 after:content-[''] z-10 after:w-[0.175rem] after:h-full after:bg-gray-200 after:inline-block after:absolute after:-bottom-11 after:left-4 lg:after:left-5">
            <a className="flex items-start font-medium w-full">
              <span className="size-[2.8rem] bg-slate-50 relative z-20 rounded-full flex justify-center items-center mr-[1.05rem] text-[1.225rem] text-black">
                1.
              </span>
              <div className="block">
                <div className="flex flex-col space-y-2">
                  <h4 className="text-3xl text-white font-normal mt-1">
                    Get Your API Key
                  </h4>
                  <p className="text-base font-light text-slate-300 max-w-[28rem]">
                    After signing up, generate your API key from the dashboard.
                  </p>

                  <Code
                    showLineNumbers={false}
                    code={
                      apiKey
                        ? apiKey.key
                        : "Generate your API key from settings."
                    }
                  />
                </div>
              </div>
            </a>
          </li>

          <li className="relative flex-1 after:content-[''] z-10 after:w-[0.175rem] after:h-full after:bg-gray-200 after:inline-block after:absolute after:-bottom-11 after:left-4 lg:after:left-5">
            <a className="flex items-start font-medium w-full">
              <span className="size-[2.8rem] bg-slate-50 relative z-20 rounded-full flex justify-center items-center mr-[1.05rem] text-[1.225rem] text-black">
                2.
              </span>
              <div className="block">
                <div className="flex flex-col space-y-2">
                  <h4 className="text-3xl text-white font-normal mt-1">
                    Integrate the API
                  </h4>
                  <p className="text-base font-light text-slate-300 max-w-[28rem]">
                    Use the API key to integrate our service into your
                    application.
                  </p>

                  <Code showLineNumbers={false} code={exampleCodeForStep2} />
                </div>
              </div>
            </a>
          </li>

          <li className="relative flex-1 after:content-[''] z-10 after:w-[0.175rem] after:h-full after:bg-gray-200 after:inline-block after:absolute after:-bottom-11 after:left-4 lg:after:left-5">
            <a className="flex items-start font-medium w-full">
              <span className="size-[2.8rem] bg-slate-50 relative z-20 rounded-full flex justify-center items-center mr-[1.05rem] text-[1.225rem] text-black">
                3.
              </span>
              <div className="block">
                <div className="flex flex-col space-y-2">
                  <h4 className="text-3xl text-white font-normal mt-1">
                    Testing the API
                  </h4>
                  <p className="text-base font-light text-slate-300 max-w-[28rem]">
                    Send a test request to ensure the API returns the desired
                    JSON output.
                  </p>

                  <Code showLineNumbers={false} code={exampleCodeForStep3} />
                </div>
              </div>
            </a>
          </li>
        </ol>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
