import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "nanushi — AI & Web Development Solutions",
  description:
    "We build intelligent digital solutions for modern businesses. Custom AI applications, full-stack web platforms, mobile apps, and bespoke software tailored to your needs.",
  keywords: [
    "AI development",
    "web development",
    "mobile app development",
    "custom software",
    "React Native",
    "Next.js",
    "AI integration",
    "LLM",
    "chatbots",
  ],
  authors: [{ name: "nanushi" }],
  openGraph: {
    title: "nanushi — AI & Web Development Solutions",
    description:
      "We build intelligent digital solutions for modern businesses. Custom AI applications, full-stack web platforms, and mobile apps.",
    type: "website",
    locale: "en_US",
    siteName: "nanushi",
  },
  icons: {
    icon: [
      {
        url: "/favicons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/favicons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/favicons/safari-pinned-tab.svg",
        color: "#FF6B2B",
      },
    ],
  },
  manifest: "/favicons/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
            <Navbar />
            {children}
            <Footer />
            <Analytics />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
