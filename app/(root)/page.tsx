import Button from "@/components/Button";
import Code from "@/components/dashboard/Code";
import {
  landingPageFormatSchemaExample,
  landingPageRawDataExample,
  landingPageResponseExample,
} from "@/examples/steps";
import PricingSection from "@/sections/PricingSection";
import { createSupabaseClient } from "@/utils/supabase";
import Link from "next/link";
import posthog from "posthog-js";
import { FaArrowDownLong, FaArrowRightLong } from "react-icons/fa6";
import { LuFileJson } from "react-icons/lu";

type LoginPageProps = {
  searchParams: {
    ref?: string;
  };
};

export default async function LandingPage({ searchParams }: LoginPageProps) {
  if (searchParams.ref === "producthunt") {
    posthog.capture("ProductHunt Visit");
  }

  const { data } = await createSupabaseClient().auth.getUser();

  return (
    <div className="max-w-screen h-auto overflow-x-hidden bg-stone-950">
      <div className="fixed bottom-2.5 left-1/2 -translate-x-1/2 z-[100]">
        <a
          href="https://www.producthunt.com/posts/data2json?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-data2json"
          target="_blank"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=463024&theme=dark"
            alt="Data2Json - API&#0032;for&#0032;Developers&#0032;–&#0032;Transform&#0032;Raw&#0032;Data&#0032;into&#0032;Structured&#0032;JSON | Product Hunt"
            width="220"
            height="54"
          />
        </a>
      </div>

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
              <Link
                href={
                  "/dashboard" +
                  (searchParams.ref ? `?ref=${searchParams.ref}` : "")
                }
              >
                <Button className="bg-white text-stone-950">Dashboard</Button>
              </Link>
            ) : (
              <Link
                href={
                  "/login" +
                  (searchParams.ref ? `?ref=${searchParams.ref}` : "")
                }
              >
                <Button className="bg-white text-stone-950">Login</Button>
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

        <PricingSection />
      </div>

      <footer className="border-t border-stone-700 p-[1.4rem] flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0">
        <div className="text-white">Copyright &copy; 2024.</div>
        <div className="text-white flex gap-1.5 md:gap-3 flex-col md:flex-row">
          <Link
            href={"/policies/privacy-policy"}
            className="hover:underline underline-offset-2 decoration-dotted underline md:no-underline"
          >
            Privacy Policy
          </Link>
          <Link
            href={"/policies/terms-and-conditions"}
            className="hover:underline underline-offset-2 decoration-dotted underline md:no-underline"
          >
            Terms &amp; Conditions
          </Link>
          <Link
            href={"/policies/cancellation-and-refund"}
            className="hover:underline underline-offset-2 decoration-dotted underline md:no-underline"
          >
            Cancellation &amp; Refund
          </Link>
        </div>
      </footer>
    </div>
  );
}
