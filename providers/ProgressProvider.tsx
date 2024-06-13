"use client";

import NextTopLoader from "nextjs-toploader";

export default function ProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NextTopLoader />
      {children}
    </>
  );
}
