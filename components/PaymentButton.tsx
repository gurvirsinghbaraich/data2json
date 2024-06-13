"use client";
import axios from "axios";
import { toast } from "sonner";
import Button, { ButtonProps } from "./Button";

type PaymentButtonProps = ButtonProps & {
  link: string;
  payload: any;
};

export default function PaymentButton({
  children,
  ...props
}: PaymentButtonProps) {
  const fetchApi = async function () {
    toast.info("Please wait...");
    const request = axios.post(props.link, props.payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = (await request).data;
    toast.info("Redirecting to " + response.paymentLink);

    const link = document.createElement("a");
    link.href = response.paymentLink;
    link.click();
  };

  return (
    <Button
      onClick={fetchApi}
      className="bg-stone-950 text-white w-max rounded"
    >
      {children}
    </Button>
  );
}
