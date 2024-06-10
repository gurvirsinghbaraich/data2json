import { createSupabaseClient } from "@/utils/supabase";
import Link from "next/link";
import { redirect } from "next/navigation";
import { emailSignUp } from "./actions";

export default async function SignUpPage() {
  const { data } = await createSupabaseClient().auth.getUser();

  if (data.user) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex space-y-1 flex-col bg-white rounded-md p-4 max-w-xs">
        <h1 className="text-2xl font-medium">Sign Up</h1>
        <p className="text-stone-600 leading-5 text-sm">
          Enter your email and password to create your account.
        </p>
      </div>

      <form
        action={emailSignUp}
        className="max-w-xs w-full p-4 border flex flex-col space-y-4 bg-white rounded-md"
      >
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="m@exmaple.com"
              className="bg-stone-100 focus:ring-4 focus:ring-gray-200 outline-none rounded-lg p-3 border-2 border-stone-200"
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              className="bg-stone-100 focus:ring-4 focus:ring-gray-200 outline-none rounded-lg p-3 border-2 border-stone-200"
            />
          </div>
        </div>

        <div className="text-xs text-right">
          <span>
            Have an account?{" "}
            <Link href={"/sign-up"} className="underline">
              Login
            </Link>
          </span>
        </div>
        <button className="bg-stone-800 hover:bg-stone-900 p-3 rounded-md cursor-pointer text-white">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export const dynamic = "force-dynamic";
