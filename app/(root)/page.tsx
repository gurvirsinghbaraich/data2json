import Code from "@/components/dashboard/Code";
import {
  landingPageFormatSchemaExample,
  landingPageRawDataExample,
  landingPageResponseExample,
} from "@/examples/steps";
import PricingSection from "@/sections/PricingSection";
import Link from "next/link";
import { FaArrowDownLong, FaArrowRightLong } from "react-icons/fa6";

export default async function LandingPage() {
  return (
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
                <span className="underline">https://api.data2json.xyz/v1</span>
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
                <span className="underline">https://api.data2json.xyz/v1</span>
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
                <span className="underline">https://api.data2json.xyz/v1</span>
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
  );
}
