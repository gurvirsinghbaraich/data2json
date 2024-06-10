import { logoutUser } from "@/app/(root)/action";

export async function GET() {
  await logoutUser();
}
