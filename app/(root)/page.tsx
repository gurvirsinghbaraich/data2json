import { createSupabaseClient } from "@/utils/supabase";
import millify from "millify";
import Link from "next/link";
import { FaCircleCheck } from "react-icons/fa6";
import { LuFileJson } from "react-icons/lu";

export default async function LandingPage() {
  const { data } = await createSupabaseClient().auth.getUser();

  return (
    <div className="w-screen h-screen overflow-hidden bg-stone-950">
      <div className="w-full max-h-[91px] min-h-[91px] overflow-hidden text-white">
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

      <div className="overflow-auto h-full">
        <div className="grid grid-cols-2 gird-rows-1 h-auto">
          <div></div>
          <div></div>
        </div>

        <div
          id="pricing"
          className="xl:scale-125 py-[calc(91px+1.4rem)] p-[1.4rem]"
        >
          <div className="w-max md:max-w-7xl mx-auto">
            <h2 className="text-white text-center text-7xl py-24 font-bold">
              Pricing
            </h2>

            <div className="flex items-center md:grid md:grid-cols-2 lg:flex md:gap-[1.4rem] lg:gap-0 space-y-[1.4rem] md:space-y-0 lg:space-x-[1.4rem] mx-auto w-max flex-col lg:flex-row">
              <div className="max-w-xs bg-[#f2b2d7] p-[1.4rem] rounded-lg flex flex-col space-y-[1.4rem]">
                <span>Simple</span>
                <h3 className="text-[2.625rem] leading-10 font-bold">Free</h3>
                <p className="text-stone-800">
                  Free plan for all users. Use will need to verify your payment
                  method to prevent abuse. *
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
                  Get Started Free
                </button>
              </div>

              <div className="max-w-xs bg-[#7fe1d6] p-[1.4rem] rounded-lg flex flex-col space-y-[1.4rem]">
                <span>Weekly</span>
                <h3 className="text-[2.625rem] leading-10 font-bold">Pro</h3>
                <p className="text-stone-800">
                  Ideal for small to start-ups. Use will need to verify your
                  payment method to prevent abuse. *
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
                  Ideal for fast-paced development teams. Payment verification
                  required to prevent abuse. *
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
    </div>
  );
}
