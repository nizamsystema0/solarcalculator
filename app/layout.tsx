import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm-plex",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Solar Savings Calculator Philippines | Nizam Systema",
  description:
    "Estimate your solar system size, cost, potential electricity savings, and payback period based on your monthly electricity bill in the Philippines.",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Solar Savings Calculator Philippines",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  description:
    "A solar savings calculator for estimating solar system size, cost, potential savings, and payback period in the Philippines.",
  author: {
    "@type": "Organization",
    name: "Nizam Systema",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${ibmPlexSans.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}