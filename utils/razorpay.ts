import Razorpay from "razorpay";

export default function createRazorpayClient() {
  return new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY!,
    key_secret: process.env.RAZORPAY_API_SECRET!,
  });
}
