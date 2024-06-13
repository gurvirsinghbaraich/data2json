"use client";

import posthog from "posthog-js";
import Button from "./Button";

type SignUpButtonProps = {
  fromProductHunt?: boolean;
};

export const SignUpButton = function ({ fromProductHunt }: SignUpButtonProps) {
  return (
    <Button
      onClick={() => {
        if (fromProductHunt) {
          posthog.capture("ProductHunt User Signed Up");
        }
      }}
      className="bg-stone-800 hover:bg-stone-900 rounded-md text-white"
    >
      Sign Up
    </Button>
  );
};
