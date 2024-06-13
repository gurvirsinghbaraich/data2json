"use client";

import { emailLogin } from "@/app/(auth)/login/actions";
import posthog from "posthog-js";
import Button from "./Button";

type LoginButtonProps = {
  fromProductHunt?: boolean;
};

const LoginButton = function ({ fromProductHunt }: LoginButtonProps) {
  return (
    <Button
      onClick={() => {
        if (fromProductHunt) {
          posthog.capture("ProductHunt Logged In");
        }
      }}
      formAction={emailLogin}
      className="bg-stone-800 hover:bg-stone-900 rounded-md text-white"
    >
      Login
    </Button>
  );
};

export default LoginButton;
