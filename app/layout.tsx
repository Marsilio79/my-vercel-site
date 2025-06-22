import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "GMGVisual - Gianmarco Maccabruno Giometti",
  description: "Professional Videographer, Photographer & Editor based in Vietnam",
  generator: "v0.dev",
  viewport: "width=device-width, initial-scale=1.0",
  // Error boundary meta tags
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/your-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
