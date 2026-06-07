import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Nurul OS v1.0 - Developer",
    template: "%s | Nurul OS"
  },
  description:
    "A premium, SaaS-style personal operating system and portfolio showcase for Nurul Shaikh, Developer. Highlighting expertise in Node.js, React, and systems architecture.",
  keywords: [
    "Nurul Shaikh",
    "Developer",
    "Node.js Developer",
    "React Developer",
    "MongoDB",
    "Software Engineer Portfolio",
    "Nurul OS",
    "SaaS Portfolio",
    "Three.js Portfolio",
    "Web Application Design"
  ],
  authors: [{ name: "Nurul Shaikh", url: "https://github.com/Dev-Nurul08" }],
  creator: "Nurul Shaikh",
  openGraph: {
    title: "Nurul OS v1.0 - Developer Portfolio",
    description: "Explore the personal operating system and development works of Nurul Shaikh.",
    url: "http://localhost:3001",
    siteName: "Nurul OS",
    type: "website",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: "Nurul OS v1.0 - Developer",
    description: "Explore the personal operating system and development works of Nurul Shaikh.",
    creator: "@Dev_Nurul08"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full" suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
