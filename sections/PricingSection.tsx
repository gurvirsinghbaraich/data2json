import PaymentButton from "@/components/PaymentButton";
import { cn } from "@/lib/cn";
import millify from "millify";
import { FaCircleCheck } from "react-icons/fa6";

type PricingSectionProps = {
  inDashboard?: boolean;
};

export default function PricingSection(props: PricingSectionProps) {
  return (
    <div
      id="pricing"
      className={cn(
        "p-[1.4rem]",
        !props.inDashboard && "xl:scale-125 my-[calc(91px)]"
      )}
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

            <PaymentButton
              link={"/api/payments/subscribe"}
              payload={{ plan: "free" }}
            >
              Continue with $0.015/month
            </PaymentButton>
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

            <PaymentButton
              link={"/api/payments/subscribe"}
              payload={{ plan: "pro" }}
            >
              Continue with $3/week
            </PaymentButton>
          </div>

          <div className="max-w-xs bg-[#febc00] p-[1.4rem] rounded-lg flex flex-col space-y-[1.4rem]">
            <span>Monthly</span>
            <h3 className="text-[2.625rem] leading-10 font-bold">Enterprise</h3>
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

            <PaymentButton
              link={"/api/payments/subscribe"}
              payload={{ plan: "enterprise" }}
            >
              Continue with $20/month
            </PaymentButton>
          </div>
        </div>
      </div>
    </div>
  );
}
