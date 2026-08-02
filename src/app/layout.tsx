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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://github.com/Dev-Nurul08"),
  title: {
    default: "Nurul Shaikh | Full-Stack Developer & Software Architect",
    template: "%s | Nurul Shaikh"
  },
  description:
    "Official portfolio of Nurul Shaikh — Full-Stack Developer & Software Architect specializing in Node.js, React, Next.js, TypeScript, MongoDB, and modern high-performance web systems.",
  keywords: [
    "Nurul Shaikh",
    "Nurul Shaikh Full-Stack Developer",
    "Nurul Shaikh Developer",
    "Nurul Shaikh Portfolio",
    "Nurul Shaikh Software Engineer",
    "Full-Stack Developer",
    "Full Stack Developer",
    "Full-Stack Web Developer",
    "Nurul Shaikh Software Architect",
    "Nurul Shaikh React Developer",
    "Nurul Shaikh Node.js Developer",
    "Software Engineer Portfolio",
    "Nurul OS",
    "Developer Kernel",
    "SaaS Portfolio",
    "Three.js Portfolio",
    "Web Application Design"
  ],
  authors: [{ name: "Nurul Shaikh", url: "https://github.com/Dev-Nurul08" }],
  creator: "Nurul Shaikh",
  publisher: "Nurul Shaikh",
  verification: {
    google: "WGBTeJL_0aLpNmsXo1gMmRU5HvKBrO-IPU6xh7BtK30",
  },
  openGraph: {
    title: "Nurul Shaikh | Full-Stack Developer & Software Architect",
    description: "Explore the personal operating system and full-stack software development work of Nurul Shaikh.",
    url: "https://github.com/Dev-Nurul08",
    siteName: "Nurul Shaikh - Full-Stack Developer",
    images: [
      {
        url: "/profile.png",
        width: 800,
        height: 800,
        alt: "Nurul Shaikh - Full-Stack Developer",
      },
    ],
    type: "website",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: "Nurul Shaikh | Full-Stack Developer",
    description: "Explore the personal operating system and full-stack software development work of Nurul Shaikh.",
    images: ["/profile.png"],
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://github.com/Dev-Nurul08#person",
      "name": "Nurul Shaikh",
      "alternateName": ["Nurul", "Dev-Nurul08"],
      "jobTitle": "Full-Stack Developer",
      "description": "Nurul Shaikh is a Full-Stack Developer & Software Architect specializing in Node.js, React, Next.js, and scalable web architecture.",
      "url": "https://github.com/Dev-Nurul08",
      "sameAs": [
        "https://github.com/Dev-Nurul08",
        "https://www.linkedin.com/in/nurul-shaikh/",
        "https://wakatime.com/@Dev_Nurul08",
        "https://leetcode.com/u/Fr_Nurul/"
      ],
      "knowsAbout": [
        "Full-Stack Development",
        "Software Architecture",
        "React",
        "Next.js",
        "Node.js",
        "TypeScript",
        "MongoDB",
        "Backend Engineering"
      ]
    },
    {
      "@type": "WebSite",
      "name": "Nurul Shaikh - Full-Stack Developer",
      "url": "https://github.com/Dev-Nurul08",
      "author": {
        "@type": "Person",
        "name": "Nurul Shaikh"
      },
      "description": "Official portfolio and software development work of Nurul Shaikh, Full-Stack Developer."
    }
  ]
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
      <head>
        <meta name="google-site-verification" content="WGBTeJL_0aLpNmsXo1gMmRU5HvKBrO-IPU6xh7BtK30" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full" suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
