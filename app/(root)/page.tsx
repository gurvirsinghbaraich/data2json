import Code from "@/components/dashboard/Code";
import {
  landingPageFormatSchemaExample,
  landingPageRawDataExample,
  landingPageResponseExample,
} from "@/examples/steps";
import { createSupabaseClient } from "@/utils/supabase";
import millify from "millify";
import Link from "next/link";
import {
  FaArrowDownLong,
  FaArrowRightLong,
  FaCircleCheck,
} from "react-icons/fa6";
import { LuFileJson } from "react-icons/lu";

export default async function LandingPage() {
  const { data } = await createSupabaseClient().auth.getUser();

  return (
    <div className="max-w-screen h-auto overflow-x-hidden bg-stone-950">
      <div className="w-full max-h-[91px] min-h-[91px] text-white">
        <div className="flex items-center justify-between z-20 bg-stone-950 fixed top-[45.5px] -translate-y-1/2 right-0 left-0 border-b p-[1.4rem] border-stone-700">
          <Link href={"/"}>
            <div className="flex items-center space-x-[0.7rem]">
              <LuFileJson size={24} />
              <span className="text-[1.4rem]">Data2Json</span>
            </div>
          </Link>

          <div className="flex items-center space-x-[1rem]">
            <Link
              href={"#pricing"}
              className="border hover:bg-stone-800 p-3 border-stone-600 hover:bg-"
            >
              Pricing
            </Link>

            {data.user ? (
              <Link href={"/dashboard"}>
                <button className="bg-white p-3 text-stone-950">
                  Dashboard
                </button>
              </Link>
            ) : (
              <Link href={"/login"}>
                <button className="bg-white p-3 text-stone-950">Login</button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="pb-32 h-full">
        <div className="grid grid-cols-1 gird-rows-1 h-auto min-h-screen">
          <div className="lg:py-48 py-24 bg-slate-900">
            <div className="w-max mx-auto flex space-y-8 flex-col lg:w-auto max-w-[80%]">
              <h1 className="text-white text-2xl text-balance lg:text-7xl font-bold">
                Effortlessly Convert Raw Data to Dynamic JSON.
              </h1>
              <p className="text-base lg:text-2xl text-stone-200">
                Never worry about processing data again with our reliable and
                scalable API for developers.
              </p>
            </div>
          </div>

          <div className="w-max mx-auto border rounded-full my-12 p-4">
            <FaArrowDownLong className="text-white" size={24} />
          </div>

          <div className="grid w-full place-items-center gap-4 xl:grid-cols-[1fr_50px_1fr_50px_1fr] h-max xl:grid-rows-1 grid-cols-1 max-w-[80%] xl:max-w-a xl:max-w-max mx-auto md:px-[5.6rem]">
            <div className="w-full">
              <div className="p-4 border-b bg-stone-100 text-center border-stone-400">
                Input Raw Data
              </div>
              <div className="flex border-b border-stone-400 bg-stone-100">
                <div className="border-r border-stone-400 p-3 py-4">
                  <span className="bg-orange-400 text-white p-2">POST</span>
                </div>
                <div className="p-4 truncate">
                  <span className="underline">
                    https://api.data2json.xyz/v1
                  </span>
                </div>
              </div>
              <div className="h-auto overflow-x-hidden overflow-y-auto bg-white">
                <Code
                  theme={"github"}
                  code={landingPageRawDataExample}
                  showLineNumbers={false}
                />
              </div>
            </div>

            <div className="w-full h-full rotate-90 xl:rotate-0 flex items-center justify-center">
              <FaArrowRightLong className="text-white" size={32} />
            </div>

            <div className="w-full">
              <div className="p-4 bg-stone-100 border-b text-center border-stone-400">
                Specify Format Schema
              </div>
              <div className="flex border-b bg-stone-100 border-stone-400">
                <div className="border-r border-stone-400 p-3 py-4">
                  <span className="bg-orange-400 text-white p-2">POST</span>
                </div>
                <div className="p-4 truncate">
                  <span className="underline">
                    https://api.data2json.xyz/v1
                  </span>
                </div>
              </div>
              <div className="h-auto overflow-x-hidden overflow-y-auto">
                <Code
                  theme={"github"}
                  code={landingPageFormatSchemaExample}
                  showLineNumbers={false}
                />
              </div>
            </div>

            <div className="w-full rotate-90 xl:rotate-0 h-full flex items-center justify-center">
              <FaArrowRightLong className="text-white" size={32} />
            </div>

            <div className="w-full">
              <div className="p-4 border-b text-center border-stone-400 bg-stone-100">
                API Response
              </div>
              <div className="flex border-b border-stone-400 bg-stone-100">
                <div className="border-r border-stone-400 p-3 py-4">
                  <span className="bg-orange-400 text-white p-2">POST</span>
                </div>
                <div className="p-4 truncate">
                  <span className="underline">
                    https://api.data2json.xyz/v1
                  </span>
                </div>
              </div>
              <div className="h-auto overflow-x-hidden overflow-y-auto bg-white">
                <Code
                  theme={"github"}
                  code={landingPageResponseExample}
                  showLineNumbers={false}
                />
              </div>
            </div>
          </div>
        </div>

        <Link href={"/#pricing"}>
          <div className="w-max mx-auto border rounded-full my-12 p-4">
            <FaArrowDownLong className="text-white" size={24} />
          </div>
        </Link>

        <div id="pricing" className="xl:scale-125 my-[calc(91px)] p-[1.4rem]">
          <div className="w-max md:max-w-7xl mx-auto">
            <h2 className="text-white text-center text-7xl py-24 font-bold">
              Pricing
            </h2>

            <div className="flex items-center md:grid md:grid-cols-2 lg:flex md:gap-[1.4rem] lg:gap-0 space-y-[1.4rem] md:space-y-0 lg:space-x-[1.4rem] mx-auto w-max flex-col lg:flex-row">
              <div className="max-w-xs bg-[#f2b2d7] p-[1.4rem] rounded-lg flex flex-col space-y-[1.4rem]">
                <span>Simple</span>
                <h3 className="text-[2.625rem] leading-10 font-bold">Free</h3>
                <p className="text-stone-800">
                  Free plan for all users, except for the verification fee. *
                </p>

                <ul className="flex flex-col space-y-3">
                  <li className="flex space-x-2 items-center">
                    <FaCircleCheck size={18} />
                    <span>{millify(30000)} tokens per month</span>
                  </li>

                  <li className="flex space-x-2 items-center">
                    <FaCircleCheck size={18} />
                    <span>10 requests per minute.</span>
                  </li>

                  <li className="flex space-x-2 items-center">
                    <FaCircleCheck size={18} />
                    <span>500 API calls per month.</span>
                  </li>
                </ul>

                <button className="bg-stone-950 text-white p-3 w-max rounded">
                  Continue with $0.015/month
                </button>
              </div>

              <div className="max-w-xs bg-[#7fe1d6] p-[1.4rem] rounded-lg flex flex-col space-y-[1.4rem]">
                <div className="flex items-center justify-between">
                  <div>Weekly</div>
                  <label className="bg-indigo-500 text-white w-max p-2 text-xs rounded animate-pulse">
                    Most Popular
                  </label>
                </div>
                <h3 className="text-[2.625rem] leading-10 font-bold">Pro</h3>
                <p className="text-stone-800">
                  Ideal for small to start-ups and small businesses.
                </p>

                <ul className="flex flex-col space-y-3">
                  <li className="flex space-x-2 items-center">
                    <FaCircleCheck size={18} />
                    <span>{millify(100000)} tokens per month</span>
                  </li>

                  <li className="flex space-x-2 items-center">
                    <FaCircleCheck size={18} />
                    <span>100 requests per minute.</span>
                  </li>

                  <li className="flex space-x-2 items-center">
                    <FaCircleCheck size={18} />
                    <span>3000 API calls per month.</span>
                  </li>
                </ul>

                <button className="bg-stone-950 text-white p-3 w-max rounded">
                  Continue with $3/week
                </button>
              </div>

              <div className="max-w-xs bg-[#febc00] p-[1.4rem] rounded-lg flex flex-col space-y-[1.4rem]">
                <span>Monthly</span>
                <h3 className="text-[2.625rem] leading-10 font-bold">
                  Enterprise
                </h3>
                <p className="text-stone-800">
                  Ideal for fast-paced development teams.
                </p>

                <ul className="flex flex-col space-y-3">
                  <li className="flex space-x-2 items-center">
                    <FaCircleCheck size={18} />
                    <span>{millify(2500000)} tokens per month</span>
                  </li>

                  <li className="flex space-x-2 items-center">
                    <FaCircleCheck size={18} />
                    <span>1000 requests per minute.</span>
                  </li>

                  <li className="flex space-x-2 items-center">
                    <FaCircleCheck size={18} />
                    <span>Unlimited API calls per month.</span>
                  </li>
                </ul>

                <button className="bg-stone-950 text-white p-3 w-max rounded">
                  Continue with $20/month
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-stone-700 p-[1.4rem] flex flex-col md:flex-row items-center justify-between">
        <div className="text-white">Copyright &copy; 2024.</div>
        <div className="text-white flex gap-3">
          <Link href={"/policies/privacy-policy"}>Privacy Policy</Link>
          <Link href={"/policies/terms-and-conditions"}>
            Terms &amp; Conditions
          </Link>
          <Link href={"/policies/cancellation-and-refund"}>
            Cancellation &amp; Refund
          </Link>
        </div>
      </footer>
    </div>
  );
}
