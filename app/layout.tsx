import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: {
    default: "ATH | Aquanautic-Taucher Hamburg e.V.",
    template: "%s | ATH - Aquanautic-Taucher Hamburg e.V.",
  },
  description:
    "Aquanautic-Taucher Hamburg e.V. - Einer der aeltesten Tauchvereine Hamburgs. Tauchausbildung nach VDST/CMAS, Vereinstraining, Tauchspots und Gemeinschaft seit ueber 40 Jahren.",
  keywords: [
    "Tauchverein Hamburg",
    "Aquanautic Taucher Hamburg",
    "ATH",
    "Tauchen Hamburg",
    "VDST",
    "CMAS",
    "Tauchausbildung Hamburg",
    "Tauchsport Hamburg",
    "Tauchclub Hamburg",
    "Sporttauchen",
    "Tauchkurse Hamburg",
    "Freiwassertauchen",
    "Oortkatensee",
  ],
  authors: [{ name: "Aquanautic-Taucher Hamburg e.V." }],
  creator: "Aquanautic-Taucher Hamburg e.V.",
  publisher: "Aquanautic-Taucher Hamburg e.V.",
  metadataBase: new URL("https://ath-ev.de"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://ath-ev.de",
    siteName: "Aquanautic-Taucher Hamburg e.V.",
    title: "ATH | Aquanautic-Taucher Hamburg e.V.",
    description:
      "Einer der aeltesten Tauchvereine Hamburgs. Tauchausbildung, Training und Gemeinschaft seit ueber 40 Jahren.",
    images: [
      {
        url: "/quallen.png",
        width: 1200,
        height: 630,
        alt: "Aquanautic-Taucher Hamburg e.V.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ATH | Aquanautic-Taucher Hamburg e.V.",
    description:
      "Einer der aeltesten Tauchvereine Hamburgs. Tauchausbildung, Training und Gemeinschaft seit ueber 40 Jahren.",
    images: ["/quallen.png"],
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
  icons: {
    icon: "/favicon.gif",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f4f4" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
