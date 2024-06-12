"use client";
import { cn } from "@/lib/cn";
import { ButtonHTMLAttributes, DetailedHTMLProps, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { onPending?: Function };

export default function Button({
  className,
  children,
  onPending,
  ...props
}: ButtonProps) {
  const { pending } = useFormStatus();

  useEffect(
    function () {
      if (pending) {
        if (typeof onPending === "function") {
          onPending?.();
        } else {
          toast.info("Please wait...", {
            position: "bottom-right",
          });
        }
      }
    },
    [pending, onPending]
  );

  return (
    <button
      {...props}
      disabled={pending}
      className={cn("p-3 cursor-pointer disabled:opacity-75", className)}
    >
      {pending ? "Loading..." : children}
    </button>
  );
}
