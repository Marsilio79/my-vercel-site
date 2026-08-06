import Image from "next/image"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-4 gap-10 md:gap-12">
          {/* Column 1 */}
          <div>
            <Image
              src="/gmgvisual-v02-assets/gmgvisual-logo-v2-black-transp.png"
              alt="GMG Visual Logo"
              width={200}
              height={134}
              className="h-44 md:h-32 w-auto mb-3 md:mb-8"
            />
            <p className="text-textMuted font-light leading-relaxed">
              Photography, videography, virtual tours and websites designed around your business.
            </p>
          </div>

          {/* Column 2 - Navigation */}
          <div>
            <p className="text-sm tracking-[0.2em] uppercase font-medium text-textPrimary mb-6">Navigation</p>
            <div className="flex flex-col space-y-3">
              <Link href="/#hero" className="text-left text-textMuted font-light hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/#videos" className="text-left text-textMuted font-light hover:text-primary transition-colors">
                Videos
              </Link>
              <Link href="/#photos" className="text-left text-textMuted font-light hover:text-primary transition-colors">
                Photos
              </Link>
              <Link href="/#about" className="text-left text-textMuted font-light hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/#packages" className="text-left text-textMuted font-light hover:text-primary transition-colors">
                Packages
              </Link>
              <Link
                href="/#request-quote"
                className="text-left text-textMuted font-light hover:text-primary transition-colors"
              >
                Request a Quote
              </Link>
            </div>
          </div>

          {/* Column 3 - Solutions */}
          <div>
            <p className="text-sm tracking-[0.2em] uppercase font-medium text-textPrimary mb-6">Solutions</p>
            <div className="flex flex-col space-y-3">
              <Link href="/#videos" className="text-left text-textMuted font-light hover:text-primary transition-colors">
                Videography
              </Link>
              <Link href="/#photos" className="text-left text-textMuted font-light hover:text-primary transition-colors">
                Photography
              </Link>
              <Link
                href="/#google-maps-360"
                className="text-left text-textMuted font-light hover:text-primary transition-colors"
              >
                Google Maps &amp; 360° Virtual Tours
              </Link>
              <Link
                href="/#custom-virtual-tours"
                className="text-left text-textMuted font-light hover:text-primary transition-colors"
              >
                Custom Virtual Tours
              </Link>
              <Link href="/#websites" className="text-left text-textMuted font-light hover:text-primary transition-colors">
                Websites
              </Link>
            </div>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <p className="text-sm tracking-[0.2em] uppercase font-medium text-textPrimary mb-6">Contact</p>
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-textMuted/70 mb-1">Email</p>
                <Link
                  href="mailto:gianmarcomaccabrunogiometti@gmail.com"
                  className="text-textMuted font-light hover:text-primary transition-colors text-sm"
                >
                  gianmarcomaccabrunogiometti@gmail.com
                </Link>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-textMuted/70 mb-1">
                  <Link
                    href="https://wa.me/84369007610"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    WhatsApp
                  </Link>{" "}
                  /{" "}
                  <Link
                    href="https://zalo.me/84369007610"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    Zalo
                  </Link>
                </p>
                <p className="text-textMuted font-light">+84 369 007 610</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-textMuted/70 mb-1">LinkedIn</p>
                <Link
                  href="https://www.linkedin.com/in/gmgvisual/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-textMuted font-light hover:text-primary transition-colors"
                >
                  LinkedIn Profile
                </Link>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-textMuted/70 mb-1">YouTube</p>
                <Link
                  href="https://www.youtube.com/c/LafresiaMediaProductions/videos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-textMuted font-light hover:text-primary transition-colors"
                >
                  YouTube Channel
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-16 md:mt-20 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-textMuted font-light text-sm text-center sm:text-left">
            © 2026 GMG Visual.
            <br />
            All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="text-textMuted font-light text-sm hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookie-policy"
              className="text-textMuted font-light text-sm hover:text-primary transition-colors"
            >
              Cookie Policy
            </Link>
            <Link
              href="/terms-conditions"
              className="text-textMuted font-light text-sm hover:text-primary transition-colors"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
