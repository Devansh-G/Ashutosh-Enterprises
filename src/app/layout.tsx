import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { company } from "@/lib/site-config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${company.name} — ${company.tagline}`,
    template: `%s | ${company.name}`,
  },
  description:
    "Authorized channel partner for Siemens, Polycab, Phoenix Contact, Eaton and more. Complete industrial electrical and control panel supply with pan-India delivery.",
  keywords: [
    "electrical control panels",
    "industrial electrical supply",
    "switchgear distributor",
    "Siemens authorized partner",
    "ACB MCCB MCB supplier",
    "panel builder components",
  ],
  openGraph: {
    title: `${company.name} — ${company.tagline}`,
    description:
      "Complete industrial electrical solutions from 10+ global brands, under one roof.",
    type: "website",
    locale: "en_IN",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={inter.variable}>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
