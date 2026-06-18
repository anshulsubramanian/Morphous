import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Studio Morphous — Product & Interior Design",
  description:
    "Studio Morphous is a premium multidisciplinary design practice crafting collectible objects and timeless spaces through product design, furniture, interior design, and spatial styling.",
  openGraph: {
    title: "Studio Morphous",
    description: "Crafting collectible objects and timeless spaces.",
    siteName: "Studio Morphous",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="grain">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
