import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/pages/Navbar/Navbar";
import { Footer } from "@/components/pages/Footer/Footer";
import { AnimatedCursor } from "@/components/ui/AnimatedCursor";
// import { StarBackground } from "@/components/pages/Background/Starbackground";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vedangdhuri.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Full-Stack Software Engineer | Vedang Dhuri",
    template: "%s | Vedang Dhuri",
  },
  description:
    "Vedang Dhuri is a Full-Stack Software Engineer building modern web applications, interactive experiences, and practical software projects.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Vedang Dhuri",
    "Portfolio",
    "Full Stack Developer",
    "Software Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "AI Engineer",
  ],
  authors: [{ name: "Vedang Dhuri" }],
  creator: "Vedang Dhuri",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Vedang Dhuri | Full Stack Developer & AI Engineer",
    description:
      "Explore projects, experience, and interactive web applications by Vedang Dhuri.",
    siteName: "Vedang Dhuri Portfolio",
    images: [
      {
        url: `${siteUrl}/img/top_icon.png`,
        width: 1200,
        height: 630,
        alt: "Vedang Dhuri Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vedang Dhuri | Full Stack Developer & AI Engineer",
    description:
      "Full Stack Developer & AI Engineer building high-performance web applications.",
    images: [`${siteUrl}/img/top_icon.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: `${process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_VERIFICATION_TOKEN}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Vedang Dhuri",
      url: siteUrl,
      jobTitle: "Full Stack Developer & AI Engineer",
      sameAs: [
        "https://github.com/vedangdhuri",
        "https://www.linkedin.com/in/vedang-dhuri-b03280348",
        "https://www.instagram.com/vedang.dhuri.69",
        "https://www.facebook.com/vedang.dhuri.69/",
        "https://discord.com/users/767682446959050753",
        "https://x.com/VedangDhuri69",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Vedang Dhuri Portfolio",
      description:
        "Portfolio of Vedang Dhuri, Full Stack Developer and AI Engineer.",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/img/top_icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} ${bricolage.variable} ${jetbrainsMono.variable} font-sans bg-black text-white overflow-x-hidden`}
      >
        <AnimatedCursor />
        {/* <StarBackground /> */}
        <Navbar />
        <main className="min-h-screen overflow-x-hidden">{children}</main>
        <Footer />
        <Analytics />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}

