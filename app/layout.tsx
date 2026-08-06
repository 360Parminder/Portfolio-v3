import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { PageGrid } from "./components/PageGrid";
import { ScrollToTop } from "./components/ScrollToTop";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://parminder.pro"), // Replace with your actual domain
  title: "Parminder Singh | Full Stack Developer",
  description: "A passionate full-stack developer building modern web and mobile applications.",
  openGraph: {
    title: "Parminder Singh | Full Stack Developer",
    description: "A passionate full-stack developer building modern web and mobile applications.",
    url: "https://parminder.pro",
    siteName: "Parminder Singh Portfolio",
    images: [
      {
        url: "/landing.png",
        width: 1200,
        height: 630,
        alt: "Parminder Singh - Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parminder Singh | Full Stack Developer",
    description: "A passionate full-stack developer building modern web and mobile applications.",
    images: ["/landing.png"],
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <ScrollToTop />
        <Navbar />
        <PageGrid>{children}</PageGrid>
        <Analytics />
      </body>
    </html>
  );
}
