import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/provider/QueryProvider";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  ),
  title: "PixelLink | URL Shortener",
  description: "PixelLink is a modern, ultra-fast URL shortener with real-time analytics and pixel-perfect design.",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "PixelLink | URL Shortener",
    description: "Shorten URLs instantly with pixel-perfect precision, custom aliases, and live click tracking.",
    images: ["/logo.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "PixelLink | URL Shortener",
    description: "Shorten URLs instantly with pixel-perfect precision, custom aliases, and live click tracking.",
    images: ["/logo.svg"],
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
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">

        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
