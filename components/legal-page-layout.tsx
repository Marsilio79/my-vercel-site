import type React from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export function LegalPageLayout({
  title,
  lastUpdated,
  intro,
  children,
}: {
  title: string
  lastUpdated: string
  intro: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="pt-32 md:pt-40 px-6 pb-24 md:pb-32">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-textPrimary leading-[1.1] mb-6">
            {title}
          </h1>
          <p className="text-sm text-textMuted font-light mb-10">Last updated: {lastUpdated}</p>
          <p className="text-lg text-textMuted font-light leading-relaxed mb-16 max-w-2xl">{intro}</p>

          <div className="space-y-12 md:space-y-16">{children}</div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

export function LegalSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="pt-12 md:pt-16 border-t border-gray-200 first:pt-0 first:border-t-0">
      <h2 className="font-heading text-2xl md:text-3xl font-medium tracking-wide text-textPrimary mb-5">{title}</h2>
      <div className="text-textMuted font-light leading-relaxed space-y-4">{children}</div>
    </section>
  )
}
