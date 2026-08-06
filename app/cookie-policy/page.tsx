import type { Metadata } from "next"
import Link from "next/link"
import { LegalPageLayout, LegalSection } from "@/components/legal-page-layout"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How GMG Visual uses cookies on this website.",
  alternates: {
    canonical: "/cookie-policy",
  },
}

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      lastUpdated="August 2026"
      intro="A short note on cookies — what they are, and how this website might use them."
    >
      <LegalSection title="What Cookies Are">
        <p>
          Cookies are small files a website can store on your device to help it function, remember preferences, or
          understand how it's being used. Most websites use them in some form.
        </p>
      </LegalSection>

      <LegalSection title="How We Use Them">
        <p>Cookies on this site, where used, fall into a few simple categories:</p>
        <ul className="list-disc list-inside space-y-2 pt-2">
          <li>Essential functionality — keeping the site working as it should</li>
          <li>Analytics — understanding, in general terms, how the site is used</li>
          <li>Performance — helping pages load faster and more reliably</li>
          <li>Future improvements — as the site evolves</li>
        </ul>
      </LegalSection>

      <LegalSection title="Analytics">
        <p>
          We don't currently run analytics on this website. If that changes in the future, this policy will apply
          to whatever analytics tools we introduce, and we'll update this page to reflect it.
        </p>
      </LegalSection>

      <LegalSection title="Questions">
        <p>
          If you have any questions about this Cookie Policy, reach out at{" "}
          <Link
            href="mailto:gianmarcomaccabrunogiometti@gmail.com"
            className="text-textPrimary hover:text-primary transition-colors"
          >
            gianmarcomaccabrunogiometti@gmail.com
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPageLayout>
  )
}
