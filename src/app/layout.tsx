import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

// Load Inter font for non-Apple devices
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Computer Engineering Graduate | Built Hardware, Software & a Startup | Embedded Systems & Computer Vision | Professional Portfolio",
    template: "%s | Lander  Azarcon Portfolio"
  },
  description: "Professional portfolio of Lander Joshua Azarcon - Computer Engineering Graduate and Founder of Vision Forge. Showcasing a Computer Vision–based gesture recognition system (Abacus GesturePRO), embedded systems hardware prototypes with custom PCB design, innovation center leadership experience, and product development from validation to IP filing. Available for full-time engineering opportunities in the Philippines.",

keywords: [
  "Lander Joshua Azarcon",
  "Computer Engineer",
  "AI Engineer",
  "Computer Vision",
  "Embedded Systems Developer",
  "Machine Learning",
  "Arduino Developer",
  "PCB Design",
  "Hardware Prototyping",
  "Startup Founder",
  "Vision Forge",
  "Gesture Recognition",
  "Image Processing",
  "Engineering Portfolio",
  "Tech Portfolio Philippines",
  "Software Development",
  "Python Developer",
  "C++ Developer",
  "Networking",
  "Cisco Certified",
  "Innovation Center",
  "Product Development",
  "Professional Portfolio",
  "Engineering Graduate Philippines"
  ],
  authors: [
    {
      name: "Lander Joshua Azarcon",
      url: "https://portfolio.landerazarcon.com/",
    },
  ],
  creator: "Lander Joshua Azarcon",
  publisher: "Lander Joshua Azarcon",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio.anujjainbatu.tech/",
    title: "Anuj Jain - Full-stack Python Developer & AI Engineer | Professional Portfolio",
    description: "Professional portfolio showcasing AI-powered projects, IoT systems, and full-stack development. SIH 2025 Finalist with 25+ automation projects. Available for internships.",
    siteName: "Anuj Jain Portfolio",
    images: [
      {
        url: "https://portfolio.anujjainbatu.tech/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Anuj Jain - Professional Portfolio with AI Chatbot",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anuj Jain - Full-stack Python Developer & AI Engineer",
    description: "Professional portfolio showcasing AI projects, IoT systems, and automation solutions. SIH 2025 Finalist available for internships.",
    creator: "@anujainbatu",
    site: "@anujainbatu",
    images: [{
      url: "https://portfolio.anujjainbatu.tech/portfolio.png",
      alt: "Anuj Jain Professional Portfolio"
    }],
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      }
    ],
    shortcut: "/favicon.ico?v=2",
    apple: "/apple-touch-icon.svg?v=2",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://portfolio.anujjainbatu.tech/",
  },
  category: "technology",
  classification: "Portfolio Website",
  other: {
    "google-site-verification": "your-google-verification-code-here",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="canonical" href="https://portfolio.anujjainbatu.tech/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Anuj Jain",
              "jobTitle": "Full-stack Python Developer & AI Engineer",
              "url": "https://portfolio.anujjainbatu.tech/",
              "image": "https://portfolio.anujjainbatu.tech/profile.jpeg",
              "sameAs": [
                "https://github.com/anujjainbatu",
                "https://linkedin.com/in/anujjainbatu",
                "https://x.com/anujainbatu"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance"
              },
              "alumniOf": {
                "@type": "Organization",
                "name": "SATI"
              },
              "knowsAbout": [
                "Python Development",
                "AI Engineering",
                "Machine Learning",
                "IoT Systems",
                "Web Development",
                "Automation",
                "Full Stack Development"
              ],
              "description": "Full-stack Python Developer & AI Engineer with expertise in building AI-powered solutions, IoT systems, and automation tools. SIH 2025 Finalist with 25+ delivered projects."
            })
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <main className="flex min-h-screen flex-col">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}