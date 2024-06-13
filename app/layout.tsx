import AnalyticsProvider from "@/providers/AnalyticsProvider";
import ProgressProvider from "@/providers/ProgressProvider";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Data2Json | API for Developers - Transform Raw Data into Structured JSON",
  metadataBase: new URL("https://www.data2json.xyz/"),

  openGraph: {
    title: "API for Developers - Transform Raw Data into Structured JSON",
    description:
      "Easily integrate our tool to transform raw data into structured JSON for your applications. Reliable, fast, and accurate. Start today with our flexible pricing model and streamline your data processing.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AnalyticsProvider>
        <body className={spaceGrotesk.className}>
          <ProgressProvider>
            <Toaster />
            {children}
          </ProgressProvider>
        </body>
      </AnalyticsProvider>
    </html>
  );
}
