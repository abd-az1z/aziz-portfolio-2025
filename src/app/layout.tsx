import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Abdul Aziz Portfolio",
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  description: "Abdul Aziz Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-background text-neutral-100 antialiased text-base md:text-[16px]">
        <div className="flex min-h-dvh flex-col">
          <Header />
          {children}
          <Footer />
        </div>  
      </body>
    </html>
  );
}
