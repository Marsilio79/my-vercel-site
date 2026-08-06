import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="pt-32 md:pt-40 px-6 pb-24 md:pb-32 flex items-center justify-center min-h-[70vh]">
        <div className="max-w-xl text-center">
          <p className="text-sm tracking-[0.2em] uppercase font-medium text-textPrimary mb-4">404</p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-textPrimary leading-[1.1] mb-6">
            Page Not Found
          </h1>
          <p className="text-lg text-textMuted font-light leading-relaxed mb-10">
            The page you're looking for doesn't exist or may have moved.
          </p>
          <Link
            href="/"
            className="inline-block text-sm tracking-[0.2em] uppercase font-medium text-textPrimary border-b border-textPrimary/30 hover:border-textPrimary pb-1 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
