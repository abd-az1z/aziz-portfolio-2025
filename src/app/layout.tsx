import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Abdul Aziz - AI Platform Engineer",
  description:
    "Software engineer building production AI platforms: RAG pipelines, backend architecture, and SaaS infrastructure that stays secure when it ships. 8 months at Agentnomics.ai, 50+ PRs merged to production.",
  openGraph: {
    title: "Abdul Aziz - AI Platform Engineer",
    description:
      "RAG pipelines, backend architecture, and production SaaS. 50+ PRs merged at Agentnomics.ai.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdul Aziz - AI Platform Engineer",
    description:
      "RAG pipelines, backend architecture, and production SaaS. 50+ PRs merged at Agentnomics.ai.",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} min-h-dvh bg-background text-foreground antialiased`}
      >
        <div className="flex min-h-dvh flex-col">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
