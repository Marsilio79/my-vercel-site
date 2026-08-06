import type { Metadata } from "next"
import Link from "next/link"
import { LegalPageLayout, LegalSection } from "@/components/legal-page-layout"

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms that govern the use of this website and GMG Visual's services.",
  alternates: {
    canonical: "/terms-conditions",
  },
}

export default function TermsConditionsPage() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      lastUpdated="August 2026"
      intro="These are the terms that apply when you use this website or work with GMG Visual. Straightforward, and worth a read."
    >
      <LegalSection title="Website Ownership">
        <p>
          This website is owned and operated by GMG Visual. By using it, you agree to the terms outlined on this
          page.
        </p>
      </LegalSection>

      <LegalSection title="Intellectual Property">
        <p>
          All photographs, videos, graphics, text and other content on this website remain the property of GMG
          Visual, unless otherwise stated. Nothing here may be copied, reproduced or reused without written
          permission.
        </p>
      </LegalSection>

      <LegalSection title="Quotations">
        <p>
          Project quotations are estimates only, based on the information provided at the time. A quotation becomes
          valid once it has been formally accepted in writing.
        </p>
      </LegalSection>

      <LegalSection title="Project Delivery">
        <p>
          Timelines are agreed upfront but depend on close collaboration — including the timely delivery of any
          materials, feedback or approvals needed from the client's side to keep a project moving.
        </p>
      </LegalSection>

      <LegalSection title="Third-Party Links">
        <p>
          This website links to external platforms and websites for convenience. GMG Visual is not responsible for
          the content, accuracy or practices of any third-party site.
        </p>
      </LegalSection>

      <LegalSection title="Liability">
        <p>
          We make every reasonable effort to keep the information on this website accurate and current, but we
          can't guarantee that every page is complete or fully up to date at all times.
        </p>
      </LegalSection>

      <LegalSection title="Questions">
        <p>
          If anything here needs clarifying, reach out at{" "}
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
