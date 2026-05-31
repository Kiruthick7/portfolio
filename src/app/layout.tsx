import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SITE } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s — Kiruthick B`,
  },
  description: SITE.description,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: "#171717",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Schema.org Person & ProfilePage Structured Data (Task 8) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://kiruthick.dev/#person",
                  "name": "Kiruthick B",
                  "jobTitle": "Software Developer",
                  "worksFor": {
                    "@type": "Organization",
                    "name": "HST Global"
                  },
                  "alumniOf": {
                    "@type": "EducationalOrganization",
                    "name": "VIT Vellore"
                  },
                  "url": "https://kiruthick.dev",
                  "sameAs": [
                    "https://github.com/Kiruthick7",
                    "https://linkedin.com/in/kiruthick",
                    "https://kiruthick-builds.hashnode.dev"
                  ],
                  "knowsAbout": [
                    "Software Engineering",
                    "Backend Development",
                    "Cloud Ingestion Pipelines",
                    "Data Engineering",
                    "AI Engineering",
                    "Generative AI Applications",
                    "Google Cloud Platform (GCP)",
                    "Amazon Web Services (AWS)",
                    "Terraform",
                    "Python",
                    "FastAPI"
                  ]
                },
                {
                  "@type": "ProfilePage",
                  "@id": "https://kiruthick.dev/#profile",
                  "url": "https://kiruthick.dev",
                  "mainEntity": {
                    "@id": "https://kiruthick.dev/#person"
                  },
                  "description": "Professional engineering portfolio for Kiruthick B. Highlighting cloud-native backends, data systems, and Top 15 Google Agentic Premier League AI tools."
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} min-h-screen antialiased`}>
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                }
              } catch (e) {}
            `,
          }}
        />
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <SpeedInsights />
      </body>
    </html>
  );
}
