import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "GMGVisual - Gianmarco Maccabruno Giometti",
  description: "Professional Videographer, Photographer & Editor based in Vietnam",
  generator: "v0.dev",
  viewport: "width=device-width, initial-scale=1.0",
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
      </head>
      <body>{children}</body>
    </html>
  )
}
