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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nurulos.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nurul Shaikh | Top Full-Stack Web Developer in Navsari, Gujarat & India",
    template: "%s | Nurul Shaikh — Web Developer"
  },
  description:
    "Official portfolio of Nurul Shaikh, top-rated Full-Stack Web Developer & Software Architect based in Navsari, Gujarat, India. Specializing in Python, FastAPI, Next.js, React 19, Node.js, REST APIs, and AI Agentic automation worldwide. Hire Nurul Shaikh for high-performance software systems.",
  keywords: [
    "Nurul Shaikh",
    "Nurul Shaikh Web Developer",
    "Nurul Shaikh Full-Stack Developer",
    "Nurul Shaikh Developer",
    "Nurul Shaikh Navsari",
    "Nurul Shaikh Gujarat",
    "Nurul Shaikh India",
    "Nurul Shaikh Portfolio",
    "Nurul Shaikh Software Engineer",
    "Nurul Shaikh Backend Developer",
    "Nurul Shaikh React Developer",
    "Nurul Shaikh Node.js Developer",
    "Nurul Shaikh Python Developer",
    "Nurul Shaikh FastAPI",
    "Nurul Shaikh GitHub",
    "Web Developer in Navsari",
    "Best Web Developer in Navsari",
    "Full Stack Developer in Navsari",
    "Web Developer in Gujarat",
    "Full Stack Developer in Gujarat",
    "Web Developer India",
    "Full Stack Developer India",
    "Freelance Web Developer Navsari",
    "Freelance Web Developer Gujarat",
    "Software Engineer Navsari",
    "Software Engineer Gujarat",
    "Python FastAPI Developer Gujarat",
    "Next.js React Developer India",
    "AI Agent Developer India",
    "Dev-Nurul08",
    "shaikhnurul8200@gmail.com"
  ],
  authors: [{ name: "Nurul Shaikh", url: SITE_URL }],
  creator: "Nurul Shaikh",
  publisher: "Nurul Shaikh",
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: ["google4ecab634e4906461", "WGBTeJL_0aLpNmsXo1gMmRU5HvKBrO-IPU6xh7BtK30"],
  },
  openGraph: {
    title: "Nurul Shaikh | Top Full-Stack Web Developer in Navsari, Gujarat & India",
    description:
      "Explore production projects, system architecture, certified backend credentials, and AI solutions by Nurul Shaikh — Full-Stack Web Developer based in Navsari, Gujarat, India.",
    url: SITE_URL,
    siteName: "Nurul Shaikh — Full-Stack Web Developer",
    images: [
      {
        url: "/profile.png",
        width: 800,
        height: 800,
        alt: "Nurul Shaikh - Full-Stack Developer in Navsari, Gujarat, India",
      },
    ],
    type: "website",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: "Nurul Shaikh | Full-Stack Web Developer in Navsari, Gujarat & India",
    description:
      "Explore production projects, system architecture, certified backend credentials, and AI solutions by Nurul Shaikh — Full-Stack Web Developer based in Navsari, Gujarat, India.",
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
      "@id": `${SITE_URL}/#person`,
      "name": "Nurul Shaikh",
      "alternateName": ["Nurul", "Dev-Nurul08", "Nurul Mozahidulislam Shaikh", "Shaikh Nurul"],
      "givenName": "Nurul",
      "familyName": "Shaikh",
      "jobTitle": "Full-Stack Web Developer & Software Architect",
      "description":
        "Nurul Shaikh is a top Full-Stack Web Developer and Software Architect based in Navsari, Gujarat, India. Specializing in Python, FastAPI, Node.js, Express, React, Next.js, MongoDB, PostgreSQL, and autonomous AI Agent systems.",
      "url": SITE_URL,
      "image": `${SITE_URL}/profile.png`,
      "email": "mailto:shaikhnurul8200@gmail.com",
      "telephone": "+91-9274490242",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Navsari",
        "addressRegion": "Gujarat",
        "addressCountry": "IN",
        "postalCode": "396445"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 20.9467,
        "longitude": 72.9520
      },
      "sameAs": [
        "https://github.com/Dev-Nurul08",
        "https://www.linkedin.com/in/nurul-shaikh/",
        "https://wakatime.com/@Dev_Nurul08",
        "https://leetcode.com/u/Fr_Nurul/"
      ],
      "knowsAbout": [
        "Full-Stack Web Development",
        "Web Development Navsari",
        "Web Development Gujarat",
        "Software Architecture",
        "Backend Engineering",
        "Python & FastAPI",
        "Node.js & Express.js",
        "React 19 & Next.js",
        "TypeScript",
        "MongoDB & PostgreSQL",
        "RESTful API Design",
        "Autonomous AI Agents",
        "Three.js & WebGL"
      ],
      "alumniOf": [
        {
          "@type": "EducationalOrganization",
          "name": "National Skill Development Corporation (NSDC) & Skill India"
        },
        {
          "@type": "EducationalOrganization",
          "name": "Red & White Multimedia Education"
        }
      ],
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Full-Stack Web Developer",
        "occupationLocation": {
          "@type": "City",
          "name": "Navsari, Gujarat, India"
        }
      }
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      "name": "Nurul Shaikh - Web Development & Software Engineering Services",
      "url": SITE_URL,
      "image": `${SITE_URL}/profile.png`,
      "telephone": "+91-9274490242",
      "email": "shaikhnurul8200@gmail.com",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Navsari",
        "addressRegion": "Gujarat",
        "addressCountry": "IN",
        "postalCode": "396445"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 20.9467,
        "longitude": 72.9520
      },
      "areaServed": [
        "Navsari",
        "Surat",
        "Gujarat",
        "India",
        "Worldwide"
      ],
      "serviceType": [
        "Full-Stack Web Application Development",
        "Custom RESTful API Architecture",
        "AI Agent & LLM Automation",
        "Interactive 3D WebGL Web Experiences",
        "E-Commerce & SaaS Development"
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "name": "Nurul Shaikh Portfolio",
      "url": SITE_URL,
      "author": {
        "@type": "Person",
        "name": "Nurul Shaikh"
      },
      "description":
        "Official portfolio, production projects, backend architectures, credentials, and contact portal of Nurul Shaikh — Web Developer in Navsari, Gujarat, India."
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      "url": SITE_URL,
      "name": "Nurul Shaikh — Full-Stack Developer Profile",
      "mainEntity": {
        "@id": `${SITE_URL}/#person`
      }
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
        <meta name="google-site-verification" content="google4ecab634e4906461" />
        <meta name="google-site-verification" content="WGBTeJL_0aLpNmsXo1gMmRU5HvKBrO-IPU6xh7BtK30" />
        <link rel="canonical" href={SITE_URL} />
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
