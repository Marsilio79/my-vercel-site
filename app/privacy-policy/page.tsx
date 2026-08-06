import type { Metadata } from "next"
import Link from "next/link"
import { LegalPageLayout, LegalSection } from "@/components/legal-page-layout"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How GMG Visual collects, uses and protects your information.",
  alternates: {
    canonical: "/privacy-policy",
  },
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="August 2026"
      intro="This page explains what information we collect, why we collect it, and how we look after it. We've kept it as short and clear as the rest of the site."
    >
      <LegalSection title="Information We Collect">
        <p>
          When you reach out through our Request a Quote form, we ask for a few details so we can understand your
          project and get back to you properly:
        </p>
        <ul className="list-disc list-inside space-y-2 pt-2">
          <li>Name</li>
          <li>Business / Brand</li>
          <li>Email</li>
          <li>Phone number (optional)</li>
          <li>Project description</li>
          <li>Timeline</li>
          <li>Budget (optional)</li>
          <li>Reference links (website, Instagram, Pinterest, or similar)</li>
        </ul>
        <p className="pt-2">
          That's it. We don't ask for anything we don't need, and optional fields are exactly that — optional.
        </p>
      </LegalSection>

      <LegalSection title="How We Use It">
        <p>The information you share with us is used only to:</p>
        <ul className="list-disc list-inside space-y-2 pt-2">
          <li>Respond to your enquiry</li>
          <li>Prepare an accurate quotation</li>
          <li>Communicate with you about your project</li>
          <li>Improve how we work with clients over time</li>
        </ul>
        <p className="pt-2">We don't use it for anything beyond that.</p>
      </LegalSection>

      <LegalSection title="We Don't Sell Your Data">
        <p>
          Your personal information is never sold, rented or shared with third parties for marketing purposes.
          Full stop.
        </p>
      </LegalSection>

      <LegalSection title="Your Rights">
        <p>
          You can ask to see what information we hold about you, have it corrected, or have it deleted at any
          time. Just reach out to us at{" "}
          <Link
            href="mailto:gianmarcomaccabrunogiometti@gmail.com"
            className="text-textPrimary hover:text-primary transition-colors"
          >
            gianmarcomaccabrunogiometti@gmail.com
          </Link>{" "}
          and we'll take care of it.
        </p>
      </LegalSection>

      <LegalSection title="Third-Party Links">
        <p>
          This website links out to services like YouTube, LinkedIn and WhatsApp, and occasionally to other
          third-party websites. Once you leave our site, their own privacy policies apply — we're not responsible
          for how those platforms handle your data.
        </p>
      </LegalSection>

      <LegalSection title="Questions">
        <p>
          If anything here isn't clear, or you'd like to know more about how your information is handled, get in
          touch at{" "}
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
