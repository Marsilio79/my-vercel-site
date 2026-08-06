import type React from "react"
import type { Metadata, Viewport } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const siteUrl = "https://www.gmgvisual.com"
const siteName = "GMG Visual"
const title = "GMG Visual | Photography, Videography, Virtual Tours & Websites"
const description =
  "Professional photography, videography, Google Maps & 360° virtual tours and websites designed to help businesses build a consistent digital presence."
const ogImage = "https://www.gmgvisual.com/gmgvisual-v02-assets/graphok.jpg"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${siteName}`,
  },
  description,
  applicationName: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title,
    description,
    locale: "en_US",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "GMG Visual — Photography, Videography & Virtual Tours",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F5F7F8",
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteName,
  image: ogImage,
  url: siteUrl,
  telephone: "+84369007610",
  email: "gianmarcomaccabrunogiometti@gmail.com",
  description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hoi An",
    addressCountry: "VN",
  },
  areaServed: "Vietnam",
  sameAs: [
    "https://www.linkedin.com/in/gmgvisual/",
    "https://www.youtube.com/c/LafresiaMediaProductions/videos",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <head>
        <link rel="preconnect" href="https://img.youtube.com" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
