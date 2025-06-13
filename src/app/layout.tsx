import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Whispers in the Soil - Horror Resource Management Game",
  description: "Enter a plague-ravaged village as the last mourner. Manage resources, perform sacred rites, and face supernatural encounters in this atmospheric horror game.",
  keywords: "horror game, resource management, browser game, atmospheric, supernatural, plague village",
  authors: [{ name: "Whispers in the Soil Dev Team" }],
  openGraph: {
    title: "Whispers in the Soil",
    description: "A horror resource management game where you are the last mourner in a plague-ravaged village",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Whispers in the Soil",
    description: "A horror resource management game where you are the last mourner in a plague-ravaged village",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
