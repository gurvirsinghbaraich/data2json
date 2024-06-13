import { SignUpButton } from "@/components/SignUpButton";
import { createSupabaseClient } from "@/utils/supabase";
import Link from "next/link";
import { redirect } from "next/navigation";
import { emailSignUp } from "./actions";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: { error: string; _email: string; _password: string };
}) {
  const { data } = await createSupabaseClient().auth.getUser();

  if (data.user) {
    return redirect("/dashboard");
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
            {searchParams._email && (
              <span className="text-xs text-red-500">
                {searchParams._email}
              </span>
            )}
            {searchParams.error && !searchParams._email && (
              <span className="text-xs text-red-500">{searchParams.error}</span>
            )}
          </div>

          <div className="flex flex-col space-y-1.5">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              className="bg-stone-100 focus:ring-4 focus:ring-gray-200 outline-none rounded-lg p-3 border-2 border-stone-200"
            />
            {searchParams._password && (
              <span className="text-xs text-red-500">
                {searchParams._password}
              </span>
            )}
          </div>
        </div>

        <SignUpButton />

        <div className="text-xs text-right">
          <span>
            Have an account?{" "}
            <Link href={"/login"} className="underline">
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export const dynamic = "force-dynamic";
