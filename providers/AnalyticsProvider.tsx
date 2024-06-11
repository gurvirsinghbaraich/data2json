"use client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

export default function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  if (
    process.env.NEXT_PUBLIC_POSTHOG_KEY &&
    process.env.NEXT_PUBLIC_POSTHOG_HOST
  ) {
    if (typeof window !== "undefined") {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        person_profiles: "identified_only",
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      });
    }

    return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
  }
  return children;
}
