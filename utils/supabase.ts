import { Database } from "@/lib/database.types";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createSupabaseClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_API_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {}
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {}
        },
      },
    }
  );
}
