import Button from "@/components/Button";
import { createSupabaseClient } from "@/utils/supabase";
import Link from "next/link";
import { LuFileJson } from "react-icons/lu";

export default async function LandingPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await createSupabaseClient().auth.getUser();

  return (
    <div className="max-w-screen h-auto overflow-x-hidden bg-stone-950">
      {/* <div className="fixed bottom-2.5 left-1/2 -translate-x-1/2 z-[100]">
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
      </div> */}

      <div className="w-full max-h-[91px] min-h-[91px] text-white">
        <div className="flex items-center justify-between z-20 bg-stone-950 fixed top-[45.5px] -translate-y-1/2 right-0 left-0 border-b p-[1.4rem] border-stone-700">
          <Link href={"/"}>
            <div className="flex items-center space-x-[0.7rem]">
              <LuFileJson size={24} />
              <span className="text-[1.4rem]">Data2Json</span>
            </div>
          </Link>

          <div className="flex items-center space-x-[1rem] flex-col sm:flex-row">
            <Link
              href={"/blog"}
              className="border hover:bg-stone-800 p-3 border-stone-600 hover:bg-"
            >
              Blog
            </Link>

            <Link
              href={"#pricing"}
              className="border hover:bg-stone-800 p-3 border-stone-600 hover:bg-"
            >
              Pricing
            </Link>

            {data.user ? (
              <Link href={"/dashboard"}>
                <Button className="bg-white text-stone-950">Dashboard</Button>
              </Link>
            ) : (
              <Link href={"/login"}>
                <Button className="bg-white text-stone-950">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {children}

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
