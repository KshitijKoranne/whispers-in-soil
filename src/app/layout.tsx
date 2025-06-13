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
  metadataBase: new URL('https://whispers-in-soil.vercel.app'),
  title: "Whispers in the Soil (Beta) - Horror Resource Management Game",
  description: "Enter a plague-ravaged village as the last mourner. Manage resources, perform sacred rites, and face supernatural encounters in this atmospheric horror game.",
  keywords: "horror game, resource management, browser game, atmospheric, supernatural, plague village",
  authors: [{ name: "Kshitij Koranne" }],
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'android-chrome', url: '/android-chrome-192x192.png', sizes: '192x192' },
      { rel: 'android-chrome', url: '/android-chrome-512x512.png', sizes: '512x512' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: "Whispers in the Soil (Beta)",
    description: "A horror resource management game where you are the last mourner in a plague-ravaged village",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Whispers in the Soil - Horror Game',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Whispers in the Soil (Beta)",
    description: "A horror resource management game where you are the last mourner in a plague-ravaged village",
    images: ['/logo.png'],
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
