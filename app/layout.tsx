import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
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
      <body className={spaceGrotesk.className}>{children}</body>
    </html>
  );
}
