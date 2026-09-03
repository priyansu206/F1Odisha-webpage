import type { Metadata } from "next";
import { Titillium_Web, Rajdhani } from "next/font/google";

import { UtilityBar } from "@/components/layout/UtilityBar";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SmoothScroll } from "@/components/SmoothScroll";

import "./globals.css";

const titillium = Titillium_Web({
  weight: ["400", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-titillium",
  display: "swap",
});

const rajdhani = Rajdhani({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
  display: "swap",
});

export const metadata: Metadata = {
  title: "F1 Odisha — From the Temple City to the Grid",
  description:
    "Odisha's fastest-growing Formula 1 fan community. Watch parties, sim racing, karting events — and a family that bleeds motorsport.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${titillium.variable} ${rajdhani.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <UtilityBar />
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <SmoothScroll />
      </body>
    </html>
  );
}
