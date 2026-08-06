"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const navItems = [
  { label: "Home", href: "/#hero" },
  { label: "Videos", href: "/#videos" },
  { label: "Photos", href: "/#photos" },
  { label: "Packages", href: "/#packages" },
  { label: "About", href: "/#about" },
]

const mobileNavItems = [
  { label: "Home", href: "/#hero" },
  { label: "Videos", href: "/#videos" },
  { label: "Photos", href: "/#photos" },
  { label: "About", href: "/#about" },
  { label: "Packages", href: "/#packages" },
  { label: "Request a Quote", href: "/#request-quote" },
]

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !isMobileMenuOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (typeof window === "undefined" || !isMobileMenuOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMobileMenuOpen])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-surface/90 backdrop-blur-sm border-highlight">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-0">
          <Link href="/" className="flex items-center">
            <Image
              src="/gmgvisual-v02-assets/gmgvisual-logo-v2-black-transp.png"
              alt="GMG Visual Logo"
              width={200}
              height={134}
              className="h-16 md:h-20 w-auto"
              priority
            />
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors font-light hover:text-primary text-textMuted"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#request-quote"
              className="transition-colors font-light hover:text-primary text-textMuted"
            >
              Contact
            </Link>
          </div>

          {!isMobileMenuOpen && (
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden flex items-center justify-center w-10 h-10 -mr-2 transition-colors duration-300 text-textPrimary"
              aria-label="Open menu"
              aria-expanded={false}
              aria-controls="mobile-nav-panel"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      {/* Compact floating mobile dropdown: fixed to the viewport, top-right, below the navbar */}
      <div
        ref={mobileMenuRef}
        id="mobile-nav-panel"
        className="md:hidden shadow-xl"
        style={{
          position: "fixed",
          top: "76px",
          right: "16px",
          width: "190px",
          height: "auto",
          background: "#ffffff",
          borderRadius: "16px",
          padding: "18px",
          zIndex: 9999,
          transformOrigin: "top right",
          opacity: isMobileMenuOpen ? 1 : 0,
          transform: isMobileMenuOpen ? "scale(1)" : "scale(0.96)",
          transition: "opacity 200ms ease-out, transform 200ms ease-out",
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
        }}
      >
        <div className="flex flex-col items-start">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="self-end flex items-center justify-center w-6 h-6 -mr-1 -mt-1 mb-2 text-textPrimary hover:text-primary transition-colors"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "17px",
            }}
          >
            {mobileNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ fontSize: "16px" }}
                className="font-light tracking-wide text-textPrimary hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
