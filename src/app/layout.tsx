import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { business } from "@/content/business";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileCallBar } from "@/components/MobileCallBar";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(business.baseUrl),
  title: {
    default: `${business.name} | Mobile Auto Glass Repair & Replacement in DFW`,
    template: `%s | ${business.name}`,
  },
  description:
    "Mobile auto glass repair and windshield replacement across the Dallas–Fort Worth metroplex. Same-day service, OEM/OEE glass, AGSC-certified technicians, lifetime warranty.",
  applicationName: business.name,
  openGraph: {
    type: "website",
    siteName: business.name,
    locale: "en_US",
    url: business.baseUrl,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-card text-ink">
        <LocalBusinessJsonLd />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <MobileCallBar />
      </body>
    </html>
  );
}
