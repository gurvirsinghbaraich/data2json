import LoginButton from "@/components/LoginButton";
import { createSupabaseClient } from "@/utils/supabase";
import Link from "next/link";
import { redirect } from "next/navigation";

type LoginPageProps = {
  searchParams: {
    ref?: string;
    error?: string;
  };
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { data } = await createSupabaseClient().auth.getUser();

  if (data.user) {
    return redirect(
      "/dashboard" + (searchParams.ref ? `?ref=${searchParams.ref}` : "")
    );
  }

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex space-y-1 flex-col bg-white rounded-md p-4 max-w-xs">
        <h1 className="text-2xl font-medium">Login</h1>
        <p className="text-stone-600 leading-5 text-sm">
          Enter your email below to login to your account.
        </p>
      </div>

      <form className="max-w-xs w-full p-4 border flex flex-col space-y-4 bg-white rounded-md">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="m@exmaple.com"
              className="bg-stone-100 focus:ring-4 focus:ring-gray-200 outline-none rounded-lg p-3 border-2 border-stone-200"
            />

            {searchParams.error && (
              <span className="text-rose-500 text-xs">
                {searchParams.error === "INVALID_CREDENTIALS" &&
                  "Email or password is incorrect!"}
              </span>
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
          </div>
        </div>

        <LoginButton fromProductHunt={searchParams.ref === "producthunt"} />

        <div className="text-xs text-right">
          <span>
            Have an account?{" "}
            <Link
              href={
                "/sign-up" +
                (searchParams.ref ? `?ref=${searchParams.ref}` : "")
              }
              className="underline"
            >
              Sign Up
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
