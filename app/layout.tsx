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
  title: "Betalt.net - Lønn & Skattekalkulator",
  description: "Lønn & skattekalkulator. Beregn netto årslønn, månedslønn, feriepenger og utbetalt per måned.",
  keywords: ["lønn", "skatt", "kalkulator", "lønnskalkulator", "skattekalkulator", "feriepenger", "nettolønn", "månedslønn", "utbetalt", "utbetalt per måned"],
  icons: {
    icon: "/favicon.ico"
  },
  alternates: {
    canonical: "https://betalt.net",
  },
  openGraph: {
    title: "Betalt.net - Lønn & Skattekalkulator",
    description: "Beregn utbetalt lønn.",
    url: "https://betalt.net/",
    siteName: "Betalt.net",
    images: [
      {
        url: "https://betalt.net/lonn-on-white.jpg",
        width: 1200,
        height: 575,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
