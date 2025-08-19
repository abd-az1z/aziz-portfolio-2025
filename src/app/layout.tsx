import type { Metadata } from "next";
import "./globals.css";


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
      <body className="min-h-dvh bg-neutral-950 text-neutral-100 antialiased text-base md:text-[16px]">
        <div className="flex min-h-dvh flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
