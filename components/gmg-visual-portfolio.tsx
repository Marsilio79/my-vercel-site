"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Youtube, X, ArrowRight, Menu } from "lucide-react"
import { Carousel } from "@/components/carousel"
import { PhotoCarousel } from "@/components/photo-carousel"
import type { PhotoCategories } from "@/lib/photo-categories"

export default function GMGVisualPortfolio({
  photoCategories: folderPhotoCategories,
}: {
  photoCategories: PhotoCategories
}) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    try {
      checkMobile()
      window.addEventListener("resize", checkMobile)
      return () => window.removeEventListener("resize", checkMobile)
    } catch (error) {
      console.error("Error during mobile check:", error)
    }
  }, [])

  const [isNavScrolled, setIsNavScrolled] = useState(false)
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

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => setIsNavScrolled(window.scrollY > 20)

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const [approachStage, setApproachStage] = useState<"idle" | "lines" | "outline">("idle")
  const [approachGeometry, setApproachGeometry] = useState<{
    lines: { x1: number; y1: number; x2: number; y2: number; length: number }[]
    leftPath: string
    rightPath: string
    halfLength: number
  } | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const computeGeometry = () => {
      const container = document.getElementById("approach-visual")
      const box = document.getElementById("approach-headline-box")
      const words = [
        document.getElementById("discipline-0"),
        document.getElementById("discipline-1"),
        document.getElementById("discipline-2"),
        document.getElementById("discipline-3"),
      ]
      if (!container || !box || words.some((w) => !w)) return null

      const containerRect = container.getBoundingClientRect()
      const boxRect = box.getBoundingClientRect()
      const toRelative = (r: DOMRect) => ({
        left: r.left - containerRect.left,
        top: r.top - containerRect.top,
        width: r.width,
        height: r.height,
      })
      const boxRel = toRelative(boxRect)
      const targets = [0.12, 0.38, 0.62, 0.88]

      const lines = words.map((word, i) => {
        const wRel = toRelative(word!.getBoundingClientRect())
        const x1 = wRel.left + wRel.width / 2
        const y1 = wRel.top + wRel.height
        const x2 = boxRel.left + boxRel.width * targets[i]
        const y2 = boxRel.top
        return { x1, y1, x2, y2, length: Math.hypot(x2 - x1, y2 - y1) }
      })

      const r = Math.min(24, boxRel.height / 2, boxRel.width / 2)
      const x = boxRel.left
      const y = boxRel.top
      const w = boxRel.width
      const h = boxRel.height
      const cx = x + w / 2

      const rightPath = `M ${cx} ${y} L ${x + w - r} ${y} A ${r} ${r} 0 0 1 ${x + w} ${y + r} L ${x + w} ${y + h - r} A ${r} ${r} 0 0 1 ${x + w - r} ${y + h} L ${cx} ${y + h}`
      const leftPath = `M ${cx} ${y} L ${x + r} ${y} A ${r} ${r} 0 0 0 ${x} ${y + r} L ${x} ${y + h - r} A ${r} ${r} 0 0 0 ${x + r} ${y + h} L ${cx} ${y + h}`
      const halfLength = w + h - 4 * r + Math.PI * r

      return { lines, leftPath, rightPath, halfLength }
    }

    const element = document.getElementById("approach-visual")
    if (!element) return
    if (window.innerWidth < 768) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const geometry = computeGeometry()
          if (geometry) {
            const LINE_DURATION = 2800
            const PAUSE = 180
            setApproachGeometry(geometry)
            // Mount the lines/outline in their hidden state first, then flip the stage
            // on a later paint so the stroke-dashoffset change is a real transition
            // instead of popping straight into its finished state.
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                setApproachStage("lines")
                window.setTimeout(() => setApproachStage("outline"), LINE_DURATION + PAUSE)
              })
            })
          }
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(element)

    const handleResize = () => {
      setApproachStage((stage) => {
        if (stage === "outline") {
          const geometry = computeGeometry()
          if (geometry) setApproachGeometry(geometry)
        }
        return stage
      })
    }
    window.addEventListener("resize", handleResize)

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Mobile optimization - reduce heavy content
  const [mobileOptimized, setMobileOptimized] = useState(false)

  useEffect(() => {
    if (isMobile) {
      setMobileOptimized(true)
      // Disable smooth scrolling on mobile
      document.documentElement.style.scrollBehavior = "auto"
    } else {
      setMobileOptimized(false)
      document.documentElement.style.scrollBehavior = "smooth"
    }
  }, [isMobile])

  const [lightboxImage, setLightboxImage] = useState<{
    src: string
    alt: string
  } | null>(null)

  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set())

  const quoteInterestOptions = [
    "All In One",
    "Monthly Content",
    "Videography",
    "Photography",
    "Google Maps & 360° Virtual Tours",
    "Custom Virtual Tours",
    "Websites",
    "Something Else",
  ]

  const [quoteFormData, setQuoteFormData] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    interests: [] as string[],
    description: "",
    timeline: "",
    budget: "",
    refWebsite: "",
    refInstagram: "",
    refPinterest: "",
    refDrive: "",
    refOther: "",
  })

  const [quoteSubmitStatus, setQuoteSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const handleQuoteInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuoteFormData({
      ...quoteFormData,
      [e.target.name]: e.target.value,
    })
  }

  const toggleQuoteInterest = (option: string) => {
    setQuoteFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(option)
        ? prev.interests.filter((item) => item !== option)
        : [...prev.interests, option],
    }))
  }

  const handleQuoteTimelineChange = (value: string) => {
    setQuoteFormData({ ...quoteFormData, timeline: value })
  }

  const encodeFormData = (data: Record<string, string>) =>
    Object.keys(data)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join("&")

  const handleQuoteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setQuoteSubmitStatus("submitting")

    const form = e.currentTarget
    const honeypotValue = (form.elements.namedItem("bot-field") as HTMLInputElement | null)?.value || ""

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData({
          "form-name": "request-quote",
          "bot-field": honeypotValue,
          name: quoteFormData.name,
          business: quoteFormData.business,
          email: quoteFormData.email,
          phone: quoteFormData.phone,
          interests: quoteFormData.interests.join(", "),
          description: quoteFormData.description,
          timeline: quoteFormData.timeline,
          budget: quoteFormData.budget,
          refWebsite: quoteFormData.refWebsite,
          refInstagram: quoteFormData.refInstagram,
          refPinterest: quoteFormData.refPinterest,
          refDrive: quoteFormData.refDrive,
          refOther: quoteFormData.refOther,
        }),
      })

      if (!response.ok) {
        throw new Error(`Form submission failed with status ${response.status}`)
      }

      setQuoteSubmitStatus("success")
      setQuoteFormData({
        name: "",
        business: "",
        email: "",
        phone: "",
        interests: [],
        description: "",
        timeline: "",
        budget: "",
        refWebsite: "",
        refInstagram: "",
        refPinterest: "",
        refDrive: "",
        refOther: "",
      })
    } catch (error) {
      console.error("Error submitting quote request:", error)
      setQuoteSubmitStatus("error")
    }
  }

  const openLightbox = (src: string, alt: string) => {
    if (!mobileOptimized) {
      setLightboxImage({ src, alt })
    }
  }

  const closeLightbox = () => {
    setLightboxImage(null)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  const handleMobileNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false)
    scrollToSection(sectionId)
  }

  const mobileNavItems = [
    { label: "Home", id: "hero" },
    { label: "Videos", id: "videos" },
    { label: "Photos", id: "photos" },
    { label: "About", id: "about" },
    { label: "Packages", id: "packages" },
    { label: "Request a Quote", id: "request-quote" },
  ]

  const LazyIframe = ({ embedId, title }: { embedId: string; title: string }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [hasLoaded, setHasLoaded] = useState(false)

    useEffect(() => {
      if (typeof window === "undefined") return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasLoaded) {
            setIsVisible(true)
            setHasLoaded(true)
          }
        },
        { threshold: 0.1 },
      )

      const element = document.getElementById(`video-${embedId}`)
      if (element) observer.observe(element)

      return () => observer.disconnect()
    }, [embedId, hasLoaded])

    return (
      <div id={`video-${embedId}`} className="w-full h-full">
        {isVisible ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${embedId}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-2 mx-auto">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-sm">Click to load video</p>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Add this helper component after the LazyIframe component
  const YouTubeThumbnail = ({
    embedId,
    title,
    customThumbnail,
  }: { embedId: string; title: string; customThumbnail?: string }) => {
    const [thumbnailSrc, setThumbnailSrc] = useState(
      customThumbnail || `https://img.youtube.com/vi/${embedId}/maxresdefault.jpg`,
    )
    const [hasError, setHasError] = useState(false)

    const handleImageError = () => {
      if (!hasError && !customThumbnail) {
        setHasError(true)
        // Fallback to medium quality thumbnail
        setThumbnailSrc(`https://img.youtube.com/vi/${embedId}/hqdefault.jpg`)
      }
    }

    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
      // YouTube returns a 120x90 gray placeholder with HTTP 200 (not a 404) when
      // a maxresdefault thumbnail doesn't exist, so onError never fires for it.
      if (!hasError && !customThumbnail && e.currentTarget.naturalWidth === 120) {
        setHasError(true)
        setThumbnailSrc(`https://img.youtube.com/vi/${embedId}/hqdefault.jpg`)
      }
    }

    return (
      <Link
        href={`https://www.youtube.com/watch?v=${embedId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-full relative group"
      >
        <Image
          src={thumbnailSrc || "/placeholder.svg"}
          alt={title}
          width={480}
          height={270}
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover w-full h-full"
          loading="lazy"
          onError={customThumbnail ? undefined : handleImageError}
          onLoad={customThumbnail ? undefined : handleImageLoad}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </Link>
    )
  }

  // Sample video data
  const videoCategories = {
    showreels: [
      {
        id: 1,
        title: "Showreel 2025",
        embedId: "1symFDS2GDk",
      },
      {
        id: 2,
        title: "Showreel 2021",
        embedId: "Oo5_Xa_4yqg",
      },
      {
        id: 3,
        title: "Showreel 2019",
        embedId: "_Hr6ALsNjLs",
      },
      {
        id: 4,
        title: "Showreel 2017",
        embedId: "m0VRL0ouqUs",
      },
      {
        id: 5,
        title: "Showreel 2015",
        embedId: "OJyN0PMLSDg",
      },
    ],
    advertising: [
      {
        id: 1,
        title: "Tenere Advertising",
        embedId: "eGD0094HpfQ",
      },
      {
        id: 2,
        title: "Ninh Binh promotional Tv Show",
        embedId: "nSDYcfFZMrQ",
      },
      {
        id: 3,
        title: "Fat Pig Promo",
        embedId: "hjY2XDto55I",
        customThumbnail: "/images/video-thumbs/fat-pig-promo-thumb.jpg",
      },
      {
        id: 4,
        title: "Capichi & Chops Advertising",
        embedId: "vvfVzozD5VQ",
        customThumbnail: "/images/video-thumbs/capichi-chops-promo-thumb.jpg",
      },
      {
        id: 5,
        title: "New Mantra promo",
        embedId: "cgjz4P0QvzI",
      },
      {
        id: 6,
        title: "Piaggio Advertising",
        embedId: "BiFSmwQD82s",
      },
      {
        id: 7,
        title: "Plant Trees Advertising",
        embedId: "8Q1JnHOSVNY",
      },
      {
        id: 8,
        title: "F1h2o - Aqua bike Advertising",
        embedId: "FJqlT3j4ki4",
      },
      {
        id: 9,
        title: "3 Dragons Advertising",
        embedId: "KRSEHD9eM38",
      },
      {
        id: 10,
        title: "Em's Bakery",
        embedId: "obpDy4QTFrU",
      },
      {
        id: 11,
        title: "Chops Burger",
        embedId: "FYJ-cmnVTDc",
      },
      {
        id: 12,
        title: "Syse Restaurant",
        embedId: "HNRDOHulL_U",
      },
    ],
    events: [
      {
        id: 1,
        title: "National Day Argentina",
        embedId: "hsiykmzTsPg",
        customThumbnail: "/images/video-thumbs/argentina-event-thumb.jpg",
      },
      {
        id: 2,
        title: "Event Piaggio Hanoi",
        embedId: "GzYrgS0qD9o",
      },
      {
        id: 3,
        title: "Wine event Italy",
        embedId: "c96nRSlCMFI",
      },
      {
        id: 4,
        title: "Piazza Italia Hanoi",
        embedId: "KKmEhxQqbpI",
      },
      {
        id: 5,
        title: "Chops event Hanoi",
        embedId: "UDXWEXCV0fE",
        customThumbnail: "/images/video-thumbs/chops-event-thumb.jpg",
      },
      {
        id: 6,
        title: "Los Fuegos Event",
        embedId: "qYcwGUpUjok",
      },
      {
        id: 7,
        title: "Burlesque event Rome",
        embedId: "9jHWeHRdLqc",
      },
      {
        id: 8,
        title: "Cugini x Viettel event",
        embedId: "yaw6p79bP4g",
      },
      {
        id: 9,
        title: "Hill Station REC Hoi An",
        embedId: "-XgQnFF0kiM",
      },
      {
        id: 10,
        title: "Hub Hoi An",
        embedId: "GB1kMILcsQQ",
      },
      {
        id: 11,
        title: "Blake",
        embedId: "K_BouE__bsM",
      },
      {
        id: 12,
        title: "HOP Crepes",
        embedId: "RCFrIWpHQzw",
      },
    ],
    shortFilms: [
      {
        id: 1,
        title: "The Day After",
        description:
          "A promising young man, after a wild night, wakes up in an apartment with an important business appointment ahead.",
        embedId: "fyrp_Ut4_tM",
      },
      {
        id: 2,
        title: "Anima",
        description:
          "Anima tells the story of three Italians fleeing Yugoslav militiamen in 1945, paralleled by a modern-day girl named Alma who uncovers their forgotten past.",
        embedId: "pKiE7kPkmBk",
      },
      {
        id: 3,
        title: "Il Graffio",
        description:
          "This short film was made for the International Tour Film Fest 2015, was shot and edited in 5 days by a mini-crew of 3 people, using non-professional actors.",
        embedId: "a-q7FHpMZoY",
      },
    ],
    musicVideos: [
      {
        id: 1,
        title: "Thanh Lam - Tướng phu thê",
        embedId: "pxUlgWVpTJQ",
      },
      {
        id: 2,
        title: "Zane K - Black on Blue",
        embedId: "0afIyrEjDqk",
      },
      {
        id: 3,
        title: "True Lie - To ember and ashes",
        embedId: "xTZlP-jcSyU",
      },
      {
        id: 4,
        title: "Trinh Minh Hien - Starboy remix",
        embedId: "tnAA6t97P-A",
      },
      {
        id: 5,
        title: "Blein - Ancora un attimo",
        embedId: "9rhtfl4daLw",
      },
      {
        id: 6,
        title: "Enea Leone - Bach allegro BWV 1005",
        embedId: "KRDECe4ds5M",
        customThumbnail: "/images/video-thumbs/enea-leone-thumb.jpg",
      },
      {
        id: 7,
        title: "Bartender - Gross",
        embedId: "jktsqtfwfPU",
      },
      {
        id: 8,
        title: "Desource - This plague called love",
        embedId: "XJoSbZmKamI",
      },
      {
        id: 9,
        title: "Carro Bestiame - Lunga vita al becco",
        embedId: "e08r4JeCVYg",
      },
      {
        id: 10,
        title: "Nguoi Hanoi",
        embedId: "tfsh7l7e2kE",
      },
      {
        id: 11,
        title: "Trinh Minh Hien & DJ Natale",
        embedId: "vnpPf_kqeFA",
      },
      {
        id: 12,
        title: "Libera Orchestra Sotterranea",
        embedId: "YaAvRqRvdaQ",
      },
    ],
    stockFootage: [
      {
        id: 1,
        title: "Showreel Microstock Footages 1",
        description: "Professional stock footage showreel realized in Vietnam showcasing cinematic quality content.",
        embedId: "I-IgHp_Cruk",
      },
      {
        id: 2,
        title: "Showreel Microstock Footages 2",
        description: "High-quality stock footage for commercial and creative projects.",
        embedId: "wNKOeb3vCxY",
      },
      {
        id: 3,
        title: "Showreel Microstock Footages 3",
        description: "Professional stock footage collection for various media applications.",
        embedId: "X2e0rANAS_M",
      },
    ],
  }

  const photoCategories = {
    ...folderPhotoCategories,
    googleMaps: [
      {
        id: 1,
        src: "/images/360/1Agriturismo-360-new.webp",
        alt: "Aerial View - Italian Agriturismo Villa with Swimming Pool and Tuscan Countryside Panorama",
      },
      {
        id: 2,
        src: "/images/360/2Chops-Hoi-An-new.webp",
        alt: "Street View - Chops Restaurant, Hoi An Ancient Town with Traditional Lanterns and Colonial Architecture",
      },
      {
        id: 3,
        src: "/images/360/3-dragons-360.webp",
        alt: "Panoramic View - 3 Dragons Sports Bar & Restaurant with Waterfront Terrace and Evening Atmosphere",
      },
    ],
  }

  const virtualTourProjects = [
    {
      id: 1,
      title: "Annam Heritage",
      description: "An immersive walkthrough of Annam Heritage's elegant interiors and timeless architecture.",
      url: "https://annamvt.netlify.app",
      src: "/gmgvisual-v02-assets/card-vt/Annam-vt-card.webp",
    },
    {
      id: 2,
      title: "Tok Restaurant",
      description: "Step inside Tok Restaurant and explore its vibrant dining atmosphere from anywhere.",
      url: "https://tokvt2025.netlify.app",
      src: "/gmgvisual-v02-assets/card-vt/tok-vt-card.webp",
    },
    {
      id: 3,
      title: "HAIS International School Hoi An",
      description: "A virtual walkthrough of HAIS International School's campus and learning spaces.",
      url: "https://haisvt.netlify.app/",
      src: "/gmgvisual-v02-assets/card-vt/HAIS-vt-card.webp",
    },
    {
      id: 4,
      title: "Cugini Italian Restaurant",
      description: "Discover the warm, authentic ambiance of Cugini Italian Restaurant online.",
      url: "https://cuginivt.netlify.app",
      src: "/gmgvisual-v02-assets/card-vt/Cugini-vt-card.webp",
    },
    {
      id: 5,
      title: "Little Riverside Hoi An",
      description: "Explore the riverside charm and relaxed setting of Little Riverside Hoi An.",
      url: "https://littleriverside-virtualtour-2025.netlify.app",
      src: "/gmgvisual-v02-assets/card-vt/Little-Riverside-vt-card.webp",
    },
  ]

  const websiteProjects = [
    {
      id: 2,
      name: "Happy Drifting",
      description: "Authentic travel experiences, local discoveries and unforgettable adventures across Vietnam.",
      url: "https://www.happydrifting.com",
      logo: "/gmgvisual-v02-assets/loghi-websites/happy-drifting-logo-green.png",
    },
    {
      id: 1,
      name: "VS Humanity",
      description:
        "A purpose-driven apparel brand challenging conformity through bold design and meaningful storytelling.",
      url: "https://www.vshumanity.org",
      logo: "/gmgvisual-v02-assets/loghi-websites/vs-humanity-logo.jpg",
    },
    {
      id: 3,
      name: "Mai Wellbeing",
      description: "A holistic wellbeing project focused on balance, mindfulness and personal growth.",
      url: null,
      logo: "/gmgvisual-v02-assets/loghi-websites/mai-wellbeing-logo.png",
    },
  ]

  const renderVirtualTourCard = (project: (typeof virtualTourProjects)[number]) => (
    <Link key={project.id} href={project.url} target="_blank" rel="noopener noreferrer" className="group block h-full">
      <Card className="border-0 shadow-lg h-full hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-0 h-full flex flex-col">
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={project.src}
              alt={project.title}
              width={640}
              height={360}
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              loading={mobileOptimized ? "lazy" : "eager"}
              quality={mobileOptimized ? 60 : 85}
            />
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h4 className="text-xl font-light text-textPrimary mb-2">{project.title}</h4>
            <p className="text-textMuted font-light flex-1">{project.description}</p>
            <Button className="w-full bg-textPrimary text-white hover:bg-textPrimary/90 py-3 px-6 font-light tracking-wide rounded-lg transition-colors mt-6">
              Explore Tour
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )


  return (
    <div className="min-h-screen bg-background">
      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4" onClick={closeLightbox}>
          <div className="relative max-w-[95vw] max-h-[95vh]">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 md:-top-12 md:right-0 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="relative">
              <Image
                src={lightboxImage.src || "/placeholder.svg"}
                alt={lightboxImage.alt}
                width={1200}
                height={1200}
                className="max-w-full max-h-[95vh] object-contain"
                quality={100}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
          isNavScrolled
            ? "bg-surface/90 backdrop-blur-sm border-highlight"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-0">
            <Link href="/" className="flex items-center">
              <Image
                key={isNavScrolled ? "dark" : "light"}
                src={
                  isNavScrolled
                    ? "/gmgvisual-v02-assets/gmgvisual-logo-v2-black-transp.png"
                    : "/gmgvisual-v02-assets/gmgvisual-logo-v2-white-transp.png"
                }
                alt="GMG Visual Logo"
                width={200}
                height={134}
                className="h-16 md:h-20 w-auto"
                priority
              />
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="#hero"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("hero")
                }}
                className={`transition-colors font-light hover:text-primary ${
                  isNavScrolled ? "text-textMuted" : "text-white"
                }`}
              >
                Home
              </Link>
              <Link
                href="#videos"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("videos")
                }}
                className={`transition-colors font-light hover:text-primary ${
                  isNavScrolled ? "text-textMuted" : "text-white"
                }`}
              >
                Videos
              </Link>
              <Link
                href="#photos"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("photos")
                }}
                className={`transition-colors font-light hover:text-primary ${
                  isNavScrolled ? "text-textMuted" : "text-white"
                }`}
              >
                Photos
              </Link>
              <Link
                href="#packages"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("packages")
                }}
                className={`transition-colors font-light hover:text-primary ${
                  isNavScrolled ? "text-textMuted" : "text-white"
                }`}
              >
                Packages
              </Link>
              <Link
                href="#about"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("about")
                }}
                className={`transition-colors font-light hover:text-primary ${
                  isNavScrolled ? "text-textMuted" : "text-white"
                }`}
              >
                About
              </Link>
              <Link
                href="#request-quote"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("request-quote")
                }}
                className={`transition-colors font-light hover:text-primary ${
                  isNavScrolled ? "text-textMuted" : "text-white"
                }`}
              >
                Contact
              </Link>
            </div>

            {/* Mobile hamburger toggle */}
            {!isMobileMenuOpen && (
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className={`md:hidden flex items-center justify-center w-10 h-10 -mr-2 transition-colors duration-300 ${
                  isNavScrolled ? "text-textPrimary" : "text-white"
                }`}
                aria-label="Open menu"
                aria-expanded={false}
                aria-controls="mobile-nav-panel"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </nav>

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
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleMobileNavClick(item.id)
                }}
                style={{ fontSize: "16px" }}
                className="font-light tracking-wide text-textPrimary hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <main>
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen overflow-hidden">
        <video
          key={isMobile ? "mobile" : "desktop"}
          src={
            isMobile
              ? "/gmgvisual-v02-assets/gmgvisual-hero-mobile.mp4"
              : "/gmgvisual-v02-assets/gmgvisual-hero-desktop.mp4"
          }
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-transparent" />

        <div
          className={`absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 transition-opacity duration-500 ${
            isNavScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <span className="text-white text-[11px] md:text-xs tracking-[0.3em] uppercase font-light">Explore</span>
          <span className="w-px h-8 md:h-10 bg-primary origin-top animate-scroll-line" />
        </div>
      </section>

      {/* Introduction Section */}
      <section id="approach" className="pt-16 md:pt-24 pb-16 md:pb-20 px-6">
        <div className="max-w-[700px] mx-auto text-center">
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight text-textPrimary leading-[1.1] mb-8 md:mb-10">
            {"The Way You're Seen Matters."}
          </h1>
          <div className="space-y-6 text-lg md:text-xl text-textMuted font-light leading-relaxed mb-10 md:mb-12">
            <p>People discover your business long before they visit it.</p>
            <p>
              We help businesses, brands and creators build a digital presence through photography, videography,
              virtual tours and modern websites.
            </p>
          </div>
          <Link
            href="#videos"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("videos")
            }}
            className="group inline-flex items-center gap-4 border border-textPrimary/40 px-6 py-3 hover:border-textPrimary hover:bg-textPrimary transition-all duration-300"
          >
            <span className="text-xs tracking-[0.25em] uppercase font-medium text-textPrimary group-hover:text-white transition-colors duration-300">
              View Our Work
            </span>
            <ArrowRight className="w-4 h-4 text-textPrimary group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
          </Link>
        </div>
      </section>

      {/* Our Approach Section */}
      <section id="our-approach" className="pt-16 md:pt-20 pb-10 md:pb-14 px-6">
        <div className="max-w-6xl mx-auto">
          <div id="approach-visual" className="relative">
            <div
              id="approach-disciplines"
              className="hidden md:flex flex-wrap justify-between items-baseline gap-x-8 md:gap-x-10 gap-y-6 mb-16 md:mb-20"
            >
              <span
                id="discipline-0"
                className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal tracking-wide uppercase text-textMuted"
              >
                Videography
              </span>
              <span
                id="discipline-1"
                className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal tracking-wide uppercase text-textMuted"
              >
                Photography
              </span>
              <span
                id="discipline-2"
                className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal tracking-wide uppercase text-textMuted"
              >
                Virtual Tours
              </span>
              <span
                id="discipline-3"
                className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal tracking-wide uppercase text-textMuted"
              >
                Websites
              </span>
            </div>

            <div className="text-center">
              <div id="approach-headline-box" className="relative inline-block px-6 py-3 md:px-10 md:py-5">
                <h2 className="relative font-heading text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight text-textPrimary leading-[1.1]">
                  Everything in One Place
                </h2>
              </div>
              <p className="mt-2 md:mt-3 text-lg md:text-xl text-textMuted font-light">
                One creative partner for every stage of your digital presence.
              </p>
            </div>

            {approachGeometry && (
              <svg className="absolute inset-0 w-full h-full text-textPrimary pointer-events-none" aria-hidden="true">
                {approachGeometry.lines.map((line, i) => (
                  <line
                    key={i}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={line.length}
                    style={{
                      strokeDashoffset: approachStage === "idle" ? line.length : 0,
                      transition: "stroke-dashoffset 2800ms cubic-bezier(0.65, 0, 0.35, 1)",
                    }}
                  />
                ))}
                <path
                  d={approachGeometry.leftPath}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={approachGeometry.halfLength}
                  style={{
                    strokeDashoffset: approachStage === "outline" ? 0 : approachGeometry.halfLength,
                    transition: "stroke-dashoffset 2200ms cubic-bezier(0.65, 0, 0.35, 1)",
                  }}
                />
                <path
                  d={approachGeometry.rightPath}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={approachGeometry.halfLength}
                  style={{
                    strokeDashoffset: approachStage === "outline" ? 0 : approachGeometry.halfLength,
                    transition: "stroke-dashoffset 2200ms cubic-bezier(0.65, 0, 0.35, 1)",
                  }}
                />
              </svg>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10 md:gap-y-0 max-w-4xl mx-auto mt-16 md:mt-20">
            <div>
              <h3 className="font-heading text-xl sm:text-2xl font-medium tracking-wide text-textPrimary mb-3">Fast &amp; Flexible</h3>
              <p className="text-textMuted font-light leading-relaxed">
                Direct communication, efficient production and quick turnaround.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-xl sm:text-2xl font-medium tracking-wide text-textPrimary mb-3">Built to Make an Impression</h3>
              <p className="text-textMuted font-light leading-relaxed">
                {"Every project is designed to strengthen how you're seen online."}
              </p>
            </div>
            <div>
              <h3 className="font-heading text-xl sm:text-2xl font-medium tracking-wide text-textPrimary mb-3">Quality Over Quantity</h3>
              <p className="text-textMuted font-light leading-relaxed">
                A focused approach, crafted with care and built to last.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter Break */}
      <div className="w-full overflow-hidden py-10 md:py-16 select-none" aria-hidden="true">
        <div className="flex w-max whitespace-nowrap animate-marquee">
          <span className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tight uppercase text-textPrimary/10 pr-16">
            Videography — Photography — Virtual Tours — Websites —
          </span>
          <span className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tight uppercase text-textPrimary/10 pr-16">
            Videography — Photography — Virtual Tours — Websites —
          </span>
        </div>
      </div>

      {/* Video Portfolio Section */}
      <section id="videos" className="py-16 md:py-24 px-4 sm:px-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-textPrimary mb-8 md:mb-12">
              Selected Work
            </h2>
            <div className="w-24 h-px bg-gray-300 mx-auto" />
          </div>

          {/* Showreels */}
          <div className="mb-12 md:mb-20">
            <h3 className="font-heading text-xl sm:text-2xl font-medium tracking-wide text-textPrimary mb-8 md:mb-12 text-center">SHOWREELS</h3>
            <Carousel itemsPerView={{ mobile: 1, desktop: 3 }}>
              {videoCategories.showreels.map((video) => (
                <Card key={video.id} className="border-0 shadow-lg h-full">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      {mobileOptimized ? (
                        // Mobile: Show YouTube thumbnail with link
                        <YouTubeThumbnail embedId={video.embedId} title={video.title} />
                      ) : (
                        // Desktop: Full iframe
                        <LazyIframe embedId={video.embedId} title={video.title} />
                      )}
                    </div>
                    <div className="p-6 flex-1">
                      <h4 className="text-xl font-light text-textPrimary">{video.title}</h4>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </Carousel>
          </div>

          {/* Advertising & Promotionals */}
          <div className="mb-12 md:mb-20">
            <h3 className="font-heading text-xl sm:text-2xl font-medium tracking-wide text-textPrimary mb-8 md:mb-12 text-center">
              ADVERTISING &amp; PROMOTIONAL
            </h3>
            <Carousel itemsPerView={{ mobile: 1, desktop: 3 }}>
              {videoCategories.advertising.map((video) => (
                <Card key={video.id} className="border-0 shadow-lg h-full">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      {mobileOptimized ? (
                        // Mobile: Show YouTube thumbnail with link
                        <YouTubeThumbnail
                          embedId={video.embedId}
                          title={video.title}
                          customThumbnail={video.customThumbnail}
                        />
                      ) : (
                        // Desktop: Full iframe
                        <LazyIframe embedId={video.embedId} title={video.title} />
                      )}
                    </div>
                    <div className="p-6 flex-1">
                      <h4 className="text-xl font-light text-textPrimary">{video.title}</h4>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </Carousel>
          </div>

          {/* Events */}
          <div className="mb-12 md:mb-20">
            <h3 className="font-heading text-xl sm:text-2xl font-medium tracking-wide text-textPrimary mb-8 md:mb-12 text-center">EVENTS</h3>
            <Carousel itemsPerView={{ mobile: 1, desktop: 3 }}>
              {videoCategories.events.map((video) => (
                <Card key={video.id} className="border-0 shadow-lg h-full">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      {mobileOptimized ? (
                        // Mobile: Show YouTube thumbnail with link
                        <YouTubeThumbnail
                          embedId={video.embedId}
                          title={video.title}
                          customThumbnail={video.customThumbnail}
                        />
                      ) : (
                        // Desktop: Full iframe
                        <LazyIframe embedId={video.embedId} title={video.title} />
                      )}
                    </div>
                    <div className="p-6 flex-1">
                      <h4 className="text-xl font-light text-textPrimary">{video.title}</h4>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </Carousel>
          </div>

          {/* Short Films */}
          <div className="mb-12 md:mb-20">
            <h3 className="font-heading text-xl sm:text-2xl font-medium tracking-wide text-textPrimary mb-8 md:mb-12 text-center">SHORT FILMS</h3>
            <div className="grid md:grid-cols-3 gap-4 md:gap-8">
              {videoCategories.shortFilms.map((video) => (
                <Card key={video.id} className="border-0 shadow-lg h-full">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      {mobileOptimized ? (
                        // Mobile: Show YouTube thumbnail with link
                        <YouTubeThumbnail embedId={video.embedId} title={video.title} />
                      ) : (
                        // Desktop: Full iframe
                        <LazyIframe embedId={video.embedId} title={video.title} />
                      )}
                    </div>
                    <div className="p-6 flex-1">
                      <h4 className="text-xl font-light text-textPrimary mb-2">{video.title}</h4>
                      <p className="text-textMuted font-light">{video.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Music Videos */}
          <div className="mb-12 md:mb-20">
            <h3 className="font-heading text-xl sm:text-2xl font-medium tracking-wide text-textPrimary mb-8 md:mb-12 text-center">MUSIC VIDEOS</h3>
            <Carousel itemsPerView={{ mobile: 1, desktop: 3 }}>
              {videoCategories.musicVideos.map((video) => (
                <Card key={video.id} className="border-0 shadow-lg h-full">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      {mobileOptimized ? (
                        // Mobile: Show YouTube thumbnail with link
                        <YouTubeThumbnail
                          embedId={video.embedId}
                          title={video.title}
                          customThumbnail={video.customThumbnail}
                        />
                      ) : (
                        // Desktop: Full iframe
                        <LazyIframe embedId={video.embedId} title={video.title} />
                      )}
                    </div>
                    <div className="p-6 flex-1">
                      <h4 className="text-xl font-light text-textPrimary">{video.title}</h4>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </Carousel>
          </div>

          {/* Stock Footage */}
          <div className="mb-12 md:mb-20">
            <h3 className="font-heading text-xl sm:text-2xl font-medium tracking-wide text-textPrimary mb-8 md:mb-12 text-center">STOCK FOOTAGE</h3>
            <div className="text-center mb-8 md:mb-12">
              <p className="text-textMuted font-light text-lg max-w-4xl mx-auto leading-relaxed">
                We create high-quality stock footage for leading platforms such as Shutterstock, Pond5, and Adobe Stock.
                Our work spans cinematic visuals, dynamic scenes, and versatile content designed to meet the needs of
                agencies, brands, and content creators worldwide.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4 md:gap-8">
              {videoCategories.stockFootage.map((video) => (
                <Card key={video.id} className="border-0 shadow-lg h-full">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      {mobileOptimized ? (
                        // Mobile: Show YouTube thumbnail with link
                        <YouTubeThumbnail embedId={video.embedId} title={video.title} />
                      ) : (
                        // Desktop: Full iframe
                        <LazyIframe embedId={video.embedId} title={video.title} />
                      )}
                    </div>
                    <div className="p-6 flex-1">
                      <h4 className="text-base sm:text-xl font-light text-textPrimary mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                        {video.title}
                      </h4>
                      <p className="text-textMuted font-light">{video.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-12">
              <div className="flex justify-center gap-6 max-w-2xl mx-auto">
                <Link
                  href="https://www.shutterstock.com/g/Lafresia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 order-2 md:order-1"
                >
                  <Card className="border-0 shadow-lg h-full hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-0 h-full flex flex-col">
                      <div className="aspect-[2.5/1] bg-white rounded-lg overflow-hidden flex items-center justify-center p-3">
                        <Image
                          src="/images/platforms/shutterstock-logo-new.webp"
                          alt="Shutterstock - View Lafresia's Portfolio"
                          width={160}
                          height={64}
                          className="w-full max-w-[160px] h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 flex-1 text-center">
                        <h4 className="text-sm font-light text-textPrimary">View on Shutterstock</h4>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link
                  href="https://stock.adobe.com/it/contributor/206582126/Gianmarco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 order-1 md:order-2"
                >
                  <Card className="border-0 shadow-lg h-full hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-0 h-full flex flex-col">
                      <div className="aspect-[2.5/1] bg-white rounded-lg overflow-hidden flex items-center justify-center p-3">
                        <Image
                          src="/images/platforms/adobe-stock-logo-new.webp"
                          alt="Adobe Stock - View Gianmarco's Portfolio"
                          width={160}
                          height={64}
                          className="w-full max-w-[160px] h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 flex-1 text-center">
                        <h4 className="text-sm font-light text-textPrimary">View on Adobe Stock</h4>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link
                  href="https://www.pond5.com/artist/lafresiastockvideo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 order-3"
                >
                  <Card className="border-0 shadow-lg h-full hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-0 h-full flex flex-col">
                      <div className="aspect-[2.5/1] bg-white rounded-lg overflow-hidden flex items-center justify-center p-3">
                        <Image
                          src="/images/platforms/pond5-logo-new.webp"
                          alt="Pond5 - View Lafresia Stock Video's Portfolio"
                          width={160}
                          height={64}
                          className="w-full max-w-[160px] h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 flex-1 text-center">
                        <h4 className="text-sm font-light text-textPrimary">View on Pond5</h4>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16 md:mt-20 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-6 sm:gap-12">
            <Link
              href="https://www.youtube.com/c/LafresiaMediaProductions/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm md:text-base tracking-[0.2em] uppercase font-medium text-textPrimary border-b border-textPrimary/30 hover:border-textPrimary pb-1 transition-colors"
            >
              Explore the Portfolio
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="https://www.youtube.com/@LafresiaMediaProductions/shorts"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm md:text-base tracking-[0.2em] uppercase font-medium text-textPrimary border-b border-textPrimary/30 hover:border-textPrimary pb-1 transition-colors"
            >
              View Short-Form Content
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Photography Portfolio Section */}
      <section id="photos" className="py-16 md:py-24 px-4 sm:px-6 bg-highlight/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-textPrimary mb-8 md:mb-12">
              Photography
            </h2>
            <div className="w-24 h-px bg-gray-300 mx-auto" />
          </div>

          {/* Food & Hospitality */}
          <div className="mb-12 md:mb-20">
            <h3 className="font-heading text-xl sm:text-2xl font-medium tracking-wide text-textPrimary mb-8 md:mb-12 text-center">FOOD &amp; HOSPITALITY</h3>
            <PhotoCarousel itemsPerView={{ mobile: 1, desktop: 3 }}>
              {photoCategories.food.map((photo) => (
                <div key={photo.id} className="group cursor-pointer">
                  <div
                    className="aspect-square overflow-hidden rounded-lg"
                    onClick={() => openLightbox(photo.src || "/placeholder.svg", photo.alt)}
                  >
                    <Image
                      src={photo.src || "/placeholder.svg"}
                      alt={photo.alt}
                      width={400}
                      height={400}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      loading={mobileOptimized ? "lazy" : "eager"}
                      quality={mobileOptimized ? 60 : 85}
                    />
                  </div>
                </div>
              ))}
            </PhotoCarousel>
          </div>

          {/* Events */}
          <div className="mb-12 md:mb-20">
            <h3 className="font-heading text-xl sm:text-2xl font-medium tracking-wide text-textPrimary mb-8 md:mb-12 text-center">EVENTS</h3>
            <PhotoCarousel itemsPerView={{ mobile: 1, desktop: 3 }}>
              {photoCategories.events.map((photo) => (
                <div key={photo.id} className="group cursor-pointer">
                  <div
                    className="aspect-[4/5] overflow-hidden rounded-lg"
                    onClick={() => openLightbox(photo.src || "/placeholder.svg", photo.alt)}
                  >
                    <Image
                      src={photo.src || "/placeholder.svg"}
                      alt={photo.alt}
                      width={400}
                      height={500}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      loading={mobileOptimized ? "lazy" : "eager"}
                      quality={mobileOptimized ? 60 : 85}
                    />
                  </div>
                </div>
              ))}
            </PhotoCarousel>
          </div>

          {/* Portraits */}
          <div className="mb-12 md:mb-20">
            <h3 className="font-heading text-xl sm:text-2xl font-medium tracking-wide text-textPrimary mb-8 md:mb-12 text-center">PORTRAITS</h3>
            <PhotoCarousel itemsPerView={{ mobile: 1, desktop: 3 }}>
              {photoCategories.portraits.map((photo) => (
                <div key={photo.id} className="group cursor-pointer">
                  <div
                    className="aspect-[3/4] overflow-hidden rounded-lg"
                    onClick={() => openLightbox(photo.src || "/placeholder.svg", photo.alt)}
                  >
                    <Image
                      src={photo.src || "/placeholder.svg"}
                      alt={photo.alt}
                      width={400}
                      height={533}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      loading={mobileOptimized ? "lazy" : "eager"}
                      quality={mobileOptimized ? 60 : 85}
                    />
                  </div>
                </div>
              ))}
            </PhotoCarousel>
          </div>

          {/* Iris Photography */}
          <div>
            <h3 className="font-heading text-xl sm:text-2xl font-medium tracking-wide text-textPrimary mb-8 md:mb-12 text-center">IRIS PHOTOGRAPHY</h3>
            <div className="text-center mb-8">
              <p className="text-textMuted font-light text-lg max-w-4xl mx-auto leading-relaxed">
                Unique and personalized iris photography, capturing the intricate details and colors of the human eye.
              </p>
            </div>
            <PhotoCarousel itemsPerView={{ mobile: 1, desktop: 3 }}>
              {photoCategories.iris.map((photo) => (
                <div key={photo.id} className="group cursor-pointer">
                  <div
                    className="aspect-square overflow-hidden rounded-lg"
                    onClick={() => openLightbox(photo.src || "/placeholder.svg", photo.alt)}
                  >
                    <Image
                      src={photo.src || "/placeholder.svg"}
                      alt={photo.alt}
                      width={400}
                      height={400}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      loading={mobileOptimized ? "lazy" : "eager"}
                      quality={mobileOptimized ? "60" : "85"}
                    />
                  </div>
                </div>
              ))}
            </PhotoCarousel>
            <div className="text-center mt-12">
              <Link href="https://bookwhen.com/oxoirisphotography" target="_blank" rel="noopener noreferrer">
                <Button className="bg-textPrimary text-white hover:bg-textPrimary/90 py-3 px-8 font-light tracking-wide rounded-lg transition-colors">
                  Book Your Session
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Tours Section */}
      <section id="virtual-tours" className="py-16 md:py-24 px-4 sm:px-6 bg-highlight/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-textPrimary mb-8 md:mb-12">
              Virtual Tours
            </h2>
            <div className="w-24 h-px bg-gray-300 mx-auto" />
          </div>

          {/* Google Maps Pictures */}
          <div id="google-maps-360" className="mb-12 md:mb-20">
            <h3 className="font-heading text-xl sm:text-2xl font-medium tracking-wide text-textPrimary mb-8 md:mb-12 text-center">
              GOOGLE MAPS &amp; 360° VIRTUAL TOURS
            </h3>
            <div className="text-center mb-12 md:mb-16">
              <p className="text-textMuted font-light text-lg max-w-4xl mx-auto leading-relaxed">
                Professional 360° photography for Google Maps and immersive virtual tours, helping businesses showcase
                their spaces with stunning detail, seamless navigation and an engaging online experience.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10 md:gap-12 mb-12 md:mb-16 md:divide-x md:divide-gray-200">
              <div className="md:px-8 md:first:pl-0">
                <h4 className="font-heading text-lg font-medium tracking-wide text-textPrimary mb-3">Professional Capture</h4>
                <p className="text-textMuted font-light leading-relaxed">
                  High-quality HDR 360° photography captured with professional equipment to accurately showcase your
                  business and create an immersive first impression.
                </p>
              </div>
              <div className="md:px-8">
                <h4 className="font-heading text-lg font-medium tracking-wide text-textPrimary mb-3">Google Maps Integration</h4>
                <p className="text-textMuted font-light leading-relaxed">
                  Every panorama is professionally connected and published to Google Maps, creating a seamless
                  walkthrough fully integrated with your Google Business Profile.
                </p>
              </div>
              <div className="md:px-8 md:last:pr-0">
                <h4 className="font-heading text-lg font-medium tracking-wide text-textPrimary mb-3">Business Profile Optimization</h4>
                <p className="text-textMuted font-light leading-relaxed">
                  We optimize panorama placement, navigation flow and Google Business Profile integration to maximize
                  usability, discoverability and the overall visitor experience.
                </p>
              </div>
            </div>

            <PhotoCarousel itemsPerView={{ mobile: 1, desktop: 3 }}>
              {photoCategories.googleMaps.map((photo, index) => (
                <div key={photo.id} className="group cursor-pointer">
                  {index === 0 ? (
                    // First image - clickable link to Poggio Falcone Google Maps
                    <Link
                      href="https://www.google.com/maps/place/Poggio+Falcone/@43.0559147,11.9418186,3a,90y,359.66h,85.51t/data=!3m8!1e1!3m6!1sCIHM0ogKEICAgID29a2s0gE!2e10!3e11!6shttps:%2F%2Flh3.googleusercontent.com%2Fgpms-cs-s%2FAB8u6HaxoR68noS1y9rexlkJUCdEI2MysjJ3ju_qv8k3IK6QecPGzMORGh32ZJ7SJz26NiqVl5UC2n4pXp5aYCWfWxfonP1F5COK1Q1z4NyGCT4SECPa6hfNH1BNTh5qkL_tSUIZw3qkfw%3Dw900-h600-k-no-pi4.489129334835397-ya359.6628533773589-ro0-fo100!7i4096!8i2048!4m12!3m11!1s0x13295118cc7861c3:0x859e76f58e50ca65!5m2!4m1!1i2!8m2!3d43.0559147!4d11.9418186!10e5!14m1!1BCgIgARICCAI!16s%2Fg%2F1tcx3yqb?entry=ttu&g_ep=EgoyMDI1MD617.0IKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="aspect-video overflow-hidden rounded-lg relative">
                        <Image
                          src={photo.src || "/placeholder.svg"}
                          alt={photo.alt}
                          width={533}
                          height={300}
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          loading={mobileOptimized ? "lazy" : "eager"}
                          quality={mobileOptimized ? 60 : 85}
                        />
                        {/* Google Maps Indicator */}
                        <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                          Google Maps
                        </div>
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2 mx-auto">
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                              </svg>
                            </div>
                            <p className="text-sm font-medium">View on Google Maps</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : index === 1 ? (
                    // Second image - clickable link to Chops Hoi An Google Maps
                    <Link
                      href="https://www.google.com/maps/place/Chops+Hoi+An+Riverside/@15.8762344,108.3281174,3a,90y,62.66h,84.13t/data=!3m8!1e1!3m6!1sCIHM0ogKEICAgICToea93gE!2e10!3e11!6shttps:%2F%2Flh3.googleusercontent.com%2Fgpms-cs-s%2FAB8u6HanyaPES92faIdVTDSUoWUIBLCtxtJKmDaoNrS8-Si5CAVK6NTIKIl98-u6svZh3gOqPhqK72RdYpa7yt4v6m-G_jv7RV82a5-jyjKFBnWfdp0jQt97VLEV5-S-T79bFLf7owsXXA%3Dw900-h600-k-no-pi5.8748693355289845-ya62.661207504733724-ro0-fo100!7i11968!8i5984!4m9!3m8!1s0x31420f559e187e85:0x5eafc9cd0b8397c7!8m2!3d15.8762344!4d108.3281174!10e5!14m1!1BCgIgARICCAI!16s%2Fg%2F11y3zrs93q?entry=ttu&g_ep=EgoyMDI1MD617.0IKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="aspect-video overflow-hidden rounded-lg relative">
                        <Image
                          src={photo.src || "/placeholder.svg"}
                          alt={photo.alt}
                          width={533}
                          height={300}
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          loading={mobileOptimized ? "lazy" : "eager"}
                          quality={mobileOptimized ? 60 : 85}
                        />
                        {/* Google Maps Indicator */}
                        <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                          Google Maps
                        </div>
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2 mx-auto">
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                              </svg>
                            </div>
                            <p className="text-sm font-medium">View on Google Maps</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    // Third image - clickable link to 3 Dragons Google Maps
                    <Link
                      href="https://www.google.com/maps/place/3+Dragons+Sports+Bar+%26+Restaurant/@15.876567,108.3337612,3a,90y,349.46h,91.55t/data=!3m8!1e1!3m6!1sCIHM0ogKEICAgICT6Z77LA!2e10!3e11!6shttps:%2F%2Flh3.googleusercontent.com%2Fgpms-cs-s%2FAB8u6HamREhe1etgaulVrhFWXUv_Eco4KVyiXXXOaPY83FO2o78Ckvz_nklkPzYblzBXS6aoiaheYqxKUAupFKbE55MHUdtm0DPwsgYNXMqU_FpuvoQb-WQxS9zfDoNhrRd9oOWS4Hw%3Dw900-h600-k-no-pi-1.5511928765029097-ya349.4576961478788-ro0-fo100!7i11968!8i5984!4m9!3m8!1s0x31420dd59d2fd8ed:0x4aa820ebe32362cc!8m2!3d15.876567!4d108.3337612!10e5!14m1!1BCgIgARICCAI!16s%2Fg%2F119v3lqst?entry=ttu&g_ep=EgoyMDI1MD617.0IKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="aspect-video overflow-hidden rounded-lg relative">
                        <Image
                          src={photo.src || "/placeholder.svg"}
                          alt={photo.alt}
                          width={533}
                          height={300}
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          loading={mobileOptimized ? "lazy" : "eager"}
                          quality={mobileOptimized ? 60 : 85}
                        />
                        {/* Google Maps Indicator */}
                        <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                          Google Maps
                        </div>
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2 mx-auto">
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                              </svg>
                            </div>
                            <p className="text-sm font-medium">View on Google Maps</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              ))}
            </PhotoCarousel>
          </div>

          {/* Download Section */}
          <div className="mb-12 md:mb-20">
            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <a
                  href="https://drive.google.com/uc?export=download&id=1PgnOMH2FrCq2_-oEM8brJ5IbikixD2Lq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full bg-textPrimary text-white hover:bg-textPrimary/90 py-3 px-6 font-light tracking-wide rounded-lg transition-colors">
                    Download Introduction
                  </Button>
                </a>
                <a
                  href="https://drive.google.com/uc?export=download&id=1l1lu6BdgrS8cRq2GlWjrpUSwAeZ7kubR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full bg-textPrimary text-white hover:bg-textPrimary/90 py-3 px-6 font-light tracking-wide rounded-lg transition-colors">
                    Download Introduction VN
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Virtual Tours */}
          <div id="custom-virtual-tours">
            <h3 className="font-heading text-xl sm:text-2xl font-medium tracking-wide text-textPrimary mb-8 md:mb-12 text-center">
              CUSTOM VIRTUAL TOURS
            </h3>
            <div className="text-center mb-12">
              <p className="text-textMuted font-light text-lg max-w-4xl mx-auto leading-relaxed">
                Designed specifically for each client, our custom virtual tours go far beyond Google Street View. Every
                project is tailored to the space and can include interactive hotspots, floor plans, multimedia content,
                custom navigation, branding and immersive storytelling to create a unique visitor experience.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4 md:gap-8">
              {virtualTourProjects.slice(0, 4).map(renderVirtualTourCard)}

              {/* Editorial spacer - balances the second row between Cugini and Little Riverside */}
              <div className="hidden md:flex flex-col items-center justify-center text-center select-none">
                <span className="font-heading text-3xl lg:text-4xl font-light tracking-wide text-textMuted">360°</span>
                <div className="mt-6 space-y-1">
                  <p className="font-heading text-sm tracking-[0.3em] text-textMuted">Explore.</p>
                  <p className="font-heading text-sm tracking-[0.3em] text-textMuted">Discover.</p>
                  <p className="font-heading text-sm tracking-[0.3em] text-textMuted">Experience.</p>
                </div>
              </div>

              {virtualTourProjects.slice(4).map(renderVirtualTourCard)}
            </div>
          </div>
        </div>
      </section>

      {/* Websites Section */}
      <section id="websites" className="py-16 md:py-24 px-4 sm:px-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-textPrimary mb-8 md:mb-12">
              Websites
            </h2>
            <div className="w-24 h-px bg-gray-300 mx-auto mb-6" />
            <p className="text-textMuted font-light text-lg max-w-4xl mx-auto leading-relaxed">
              Where photography, video and storytelling come together in one digital experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            {websiteProjects.map((site) => (
              <Card
                key={site.id}
                className="group border-0 shadow-lg h-full hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="aspect-[4/3] bg-white rounded-lg overflow-hidden flex items-center justify-center p-4 md:p-6">
                    <Image
                      src={site.logo || "/placeholder.svg"}
                      alt={`${site.name} Logo`}
                      width={320}
                      height={200}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="max-h-52 md:max-h-60 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                      loading={mobileOptimized ? "lazy" : "eager"}
                      quality={mobileOptimized ? 60 : 85}
                    />
                  </div>
                  <div className="pt-3 pb-6 px-6 md:pt-4 md:pb-8 md:px-8 flex-1 flex flex-col text-center">
                    <h4 className="font-heading text-xl font-light text-textPrimary mb-1.5">{site.name}</h4>
                    <p className="text-textMuted font-light flex-1">{site.description}</p>
                    {site.url ? (
                      <Link
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="self-center mt-4 inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase font-medium text-textPrimary border-b border-textPrimary/30 hover:border-textPrimary pb-1 transition-colors"
                      >
                        Visit Website
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    ) : (
                      <span className="self-center mt-4 inline-block text-sm tracking-[0.2em] uppercase font-medium text-textMuted">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-16 md:py-24 px-4 sm:px-6 bg-highlight/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-textPrimary mb-8 md:mb-12">
              Packages
            </h2>
            <div className="w-24 h-px bg-gray-300 mx-auto mb-6" />
            <p className="text-textMuted font-light text-lg max-w-4xl mx-auto leading-relaxed">
              Every business is different.
            </p>
            <p className="text-textMuted font-light text-lg max-w-4xl mx-auto leading-relaxed mt-2">
              That's why every proposal is built around your goals, your audience and the way you communicate.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <Card className="border-0 shadow-lg h-full">
              <CardContent className="p-6 sm:p-8 md:p-12 h-full flex flex-col">
                <h3 className="font-heading text-2xl md:text-3xl font-medium tracking-wide text-textPrimary mb-5">
                  All In One
                </h3>
                <p className="text-textMuted font-light leading-relaxed mb-4">
                  A complete digital presence designed around your business.
                </p>
                <p className="text-textMuted font-light leading-relaxed mb-4">
                  Designed for hospitality, retail, wellness and lifestyle businesses.
                </p>
                <p className="text-textMuted font-light leading-relaxed mb-6">
                  The combination of services changes according to each client's goals.{" "}
                  <span className="font-medium text-textPrimary">This is not a fixed bundle.</span>
                </p>
                <p className="text-textMuted font-light leading-relaxed mb-4">The final solution may include:</p>
                <ul className="space-y-2 text-textMuted font-light list-disc list-inside">
                  <li>Videography</li>
                  <li>Photography</li>
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">Google Maps &amp; 360° Virtual Tours</li>
                  <li>Custom Virtual Tours</li>
                  <li>Websites</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg h-full">
              <CardContent className="p-10 md:p-12 h-full flex flex-col">
                <h3 className="font-heading text-2xl md:text-3xl font-medium tracking-wide text-textPrimary mb-5">
                  Monthly Content
                </h3>
                <p className="text-textMuted font-light leading-relaxed mb-6">
                  Designed for businesses, brands, artists and creators who need consistent content.
                </p>

                <div className="space-y-6 py-6 border-y border-gray-200">
                  <div>
                    <p className="text-sm tracking-[0.15em] uppercase font-medium text-textPrimary mb-1.5">
                      Essential
                    </p>
                    <p className="text-textMuted font-light text-sm leading-relaxed">
                      Designed for businesses just starting to build a consistent content presence.
                    </p>
                  </div>
                  <div className="pt-6 border-t border-gray-200">
                    <p className="text-sm tracking-[0.15em] uppercase font-medium text-textPrimary mb-1.5">Growth</p>
                    <p className="text-textMuted font-light text-sm leading-relaxed">
                      Designed for brands ready to scale their visibility with a steady content rhythm.
                    </p>
                  </div>
                  <div className="pt-6 border-t border-gray-200">
                    <p className="text-sm tracking-[0.15em] uppercase font-medium text-textPrimary mb-1.5">
                      Complete
                    </p>
                    <p className="text-textMuted font-light text-sm leading-relaxed">
                      Designed for businesses and creators seeking a full, hands-off content partnership.
                    </p>
                  </div>
                </div>

                <p className="text-textMuted font-light leading-relaxed mt-6">
                  Every plan is tailored to the client's goals, content strategy and publishing schedule, built for
                  flexibility and long-term collaboration rather than rigid packages.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16 md:mt-20 max-w-2xl mx-auto">
            <h3 className="font-heading text-2xl md:text-3xl font-light text-textPrimary mb-4">
              Looking for something different?
            </h3>
            <p className="text-textMuted font-light text-lg leading-relaxed">
              Every project is unique. Tell us about your idea, and we'll prepare a proposal tailored to your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Request a Quote Section */}
      <section id="request-quote" className="py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-textPrimary mb-8 md:mb-12">
              Request a Quote
            </h2>
            <div className="w-24 h-px bg-gray-300 mx-auto mb-8" />
            <h3 className="font-heading text-2xl md:text-3xl font-light text-textPrimary mb-4">
              Let's Talk About Your Project
            </h3>
            <p className="text-textMuted font-light text-lg leading-relaxed max-w-2xl mx-auto">
              Every project starts with a conversation. Tell us what you're building, what you want to achieve and
              how we can help. We'll prepare a proposal tailored to your goals.
            </p>
          </div>

          {quoteSubmitStatus === "success" ? (
            <div className="text-center py-12">
              <h3 className="font-heading text-2xl md:text-3xl font-medium tracking-wide text-textPrimary mb-4">
                Thank you!
              </h3>
              <p className="text-textMuted font-light text-lg leading-relaxed max-w-xl mx-auto">
                Your request has been sent successfully.
                <br />
                <br />
                We'll get back to you as soon as possible.
              </p>
            </div>
          ) : (
          <form
            onSubmit={handleQuoteSubmit}
            method="POST"
            name="request-quote"
            className="space-y-12"
          >
            <input type="hidden" name="form-name" value="request-quote" />
            <input type="hidden" name="timeline" value={quoteFormData.timeline} />
            <input type="hidden" name="interests" value={quoteFormData.interests.join(", ")} />
            <p className="hidden">
              <label>
                Don't fill this out if you're human: <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>

            {/* Basic Info */}
            <div className="grid sm:grid-cols-2 gap-6 pb-12 border-b border-gray-200">
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={quoteFormData.name}
                onChange={handleQuoteInputChange}
                className="border-gray-300 focus:border-black font-light"
                required
              />
              <Input
                type="text"
                name="business"
                placeholder="Business / Brand"
                value={quoteFormData.business}
                onChange={handleQuoteInputChange}
                className="border-gray-300 focus:border-black font-light"
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={quoteFormData.email}
                onChange={handleQuoteInputChange}
                className="border-gray-300 focus:border-black font-light"
                required
              />
              <Input
                type="tel"
                name="phone"
                placeholder="Phone (optional)"
                value={quoteFormData.phone}
                onChange={handleQuoteInputChange}
                className="border-gray-300 focus:border-black font-light"
              />
            </div>

            {/* What are you looking for */}
            <div className="pb-12 border-b border-gray-200">
              <h4 className="text-sm tracking-[0.2em] uppercase font-medium text-textPrimary mb-6">
                What are you looking for?
              </h4>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                {quoteInterestOptions.map((option) => (
                  <label key={option} className="flex items-center gap-3 cursor-pointer">
                    <Checkbox
                      checked={quoteFormData.interests.includes(option)}
                      onCheckedChange={() => toggleQuoteInterest(option)}
                    />
                    <span className="text-textMuted font-light">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Project Description */}
            <div className="pb-12 border-b border-gray-200">
              <h4 className="text-sm tracking-[0.2em] uppercase font-medium text-textPrimary mb-4">
                Project Description
              </h4>
              <Textarea
                name="description"
                placeholder="Tell us about your project..."
                value={quoteFormData.description}
                onChange={handleQuoteInputChange}
                rows={8}
                className="border-gray-300 focus:border-black font-light resize-none"
                required
              />
            </div>

            {/* Timeline + Budget */}
            <div className="grid sm:grid-cols-2 gap-6 pb-12 border-b border-gray-200">
              <div>
                <h4 className="text-sm tracking-[0.2em] uppercase font-medium text-textPrimary mb-4">Timeline</h4>
                <Select value={quoteFormData.timeline} onValueChange={handleQuoteTimelineChange}>
                  <SelectTrigger className="border-gray-300 font-light">
                    <SelectValue placeholder="Select a timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="As soon as possible">As soon as possible</SelectItem>
                    <SelectItem value="1–2 months">1–2 months</SelectItem>
                    <SelectItem value="3–6 months">3–6 months</SelectItem>
                    <SelectItem value="Flexible / Not sure yet">Flexible / Not sure yet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <h4 className="text-sm tracking-[0.2em] uppercase font-medium text-textPrimary mb-4">
                  Estimated Budget (optional)
                </h4>
                <Input
                  type="text"
                  name="budget"
                  placeholder="e.g. $1,000 – $3,000"
                  value={quoteFormData.budget}
                  onChange={handleQuoteInputChange}
                  className="border-gray-300 focus:border-black font-light"
                />
              </div>
            </div>

            {/* References */}
            <div>
              <h4 className="text-sm tracking-[0.2em] uppercase font-medium text-textPrimary mb-2">
                References (optional)
              </h4>
              <p className="text-textMuted font-light text-sm mb-6">
                Share any links that help us understand your brand or inspiration.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <Input
                  type="text"
                  name="refWebsite"
                  placeholder="Website"
                  value={quoteFormData.refWebsite}
                  onChange={handleQuoteInputChange}
                  className="border-gray-300 focus:border-black font-light"
                />
                <Input
                  type="text"
                  name="refInstagram"
                  placeholder="Instagram"
                  value={quoteFormData.refInstagram}
                  onChange={handleQuoteInputChange}
                  className="border-gray-300 focus:border-black font-light"
                />
                <Input
                  type="text"
                  name="refPinterest"
                  placeholder="Pinterest"
                  value={quoteFormData.refPinterest}
                  onChange={handleQuoteInputChange}
                  className="border-gray-300 focus:border-black font-light"
                />
                <Input
                  type="text"
                  name="refDrive"
                  placeholder="Google Drive"
                  value={quoteFormData.refDrive}
                  onChange={handleQuoteInputChange}
                  className="border-gray-300 focus:border-black font-light"
                />
              </div>
              <div className="mt-6">
                <Input
                  type="text"
                  name="refOther"
                  placeholder="Other"
                  value={quoteFormData.refOther}
                  onChange={handleQuoteInputChange}
                  className="border-gray-300 focus:border-black font-light"
                />
              </div>
            </div>

            <div className="text-center pt-4">
              <p className="text-textMuted font-light leading-relaxed mb-2 max-w-xl mx-auto">
                The more we know about your project, the better we can prepare a proposal tailored to your goals.
              </p>
              <p className="text-textMuted/70 font-light text-sm mb-8">
                Every enquiry is personally reviewed and we usually reply within 24–48 hours.
              </p>
              {quoteSubmitStatus === "error" && (
                <p className="text-red-500 font-light text-sm mb-6">
                  Something went wrong sending your request. Please try again.
                </p>
              )}
              <Button
                type="submit"
                disabled={quoteSubmitStatus === "submitting"}
                className="inline-flex items-center gap-3 bg-textPrimary text-white hover:bg-textPrimary/90 px-8 py-3 font-light tracking-wide rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {quoteSubmitStatus === "submitting" ? (
                  <>
                    Sending...
                    <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  </>
                ) : (
                  <>
                    Send Request
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Block 1 */}
          <div className="text-center mb-16 md:mb-20">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-textPrimary mb-8 md:mb-12">
              About GMG Visual
            </h2>
            <div className="w-24 h-px bg-gray-300 mx-auto mb-10 md:mb-12" />
            <p className="font-heading text-2xl sm:text-3xl md:text-4xl font-light text-textPrimary leading-snug">
              Today, people experience your business long before they walk through your door.
            </p>
          </div>

          {/* Block 2 */}
          <div className="mb-16 md:mb-20">
            <p className="text-textMuted font-light text-lg leading-relaxed text-center mb-4">
              Every image, every video and every interaction shapes that first impression.
            </p>
            <p className="text-textMuted font-light text-lg leading-relaxed text-center">
              When they work together, a business feels more professional, more trustworthy and far more memorable.
            </p>
          </div>

          {/* Block 3 */}
          <div className="mb-16 md:mb-20">
            <p className="text-textMuted font-light text-lg leading-relaxed text-center mb-2">
              GMG Visual was built around one simple idea:
            </p>
            <p className="font-heading text-2xl md:text-3xl font-medium text-textPrimary text-center mb-6">
              Everything should work together.
            </p>
            <p className="text-textMuted font-light text-lg leading-relaxed text-center">
              Every project is approached as one complete digital presence, where every decision supports the same
              objective.
            </p>
          </div>

          {/* Block 4 */}
          <div className="text-center py-8 md:py-16 mb-16 md:mb-20">
            <p className="font-heading text-4xl sm:text-5xl md:text-6xl font-light text-textPrimary leading-tight">
              One Vision.
              <br />
              One Creative Direction.
            </p>
          </div>

          {/* Block 5 */}
          <div>
            <div className="text-center mb-10 md:mb-12">
              <h3 className="font-heading text-xl sm:text-2xl font-medium tracking-wide text-textPrimary">
                BEHIND GMG VISUAL
              </h3>
            </div>
            <div className="grid md:grid-cols-[2fr_3fr] gap-8 md:gap-12 items-center">
              <div className="aspect-[4/5] overflow-hidden rounded-lg">
                <Image
                  src="/images/Gianmarco_Wedding.webp"
                  alt="Gianmarco Maccabruno Giometti - Creative Director"
                  width={480}
                  height={600}
                  className="object-cover w-full h-full object-[10%_center]"
                />
              </div>
              <div>
                <p className="font-heading text-xl md:text-2xl font-medium text-textPrimary mb-1">
                  Gianmarco Maccabruno Giometti
                </p>
                <p className="text-textMuted font-light tracking-wide mb-8">Creative Director</p>
                <div className="text-textMuted font-light text-lg leading-relaxed italic space-y-4">
                  <p>
                    "I started as a videographer, but over the years I realised clients rarely needed just a video.
                    They needed someone who could help shape how their business was presented online.
                  </p>
                  <p>That's what GMG Visual has become."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      </main>

      {/* Contact Section */}
      {/* Footer */}
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
                <Link
                  href="#hero"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("hero")
                  }}
                  className="text-left text-textMuted font-light hover:text-primary transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="#videos"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("videos")
                  }}
                  className="text-left text-textMuted font-light hover:text-primary transition-colors"
                >
                  Videos
                </Link>
                <Link
                  href="#photos"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("photos")
                  }}
                  className="text-left text-textMuted font-light hover:text-primary transition-colors"
                >
                  Photos
                </Link>
                <Link
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("about")
                  }}
                  className="text-left text-textMuted font-light hover:text-primary transition-colors"
                >
                  About
                </Link>
                <Link
                  href="#packages"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("packages")
                  }}
                  className="text-left text-textMuted font-light hover:text-primary transition-colors"
                >
                  Packages
                </Link>
                <Link
                  href="#request-quote"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("request-quote")
                  }}
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
                <Link
                  href="#videos"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("videos")
                  }}
                  className="text-left text-textMuted font-light hover:text-primary transition-colors"
                >
                  Videography
                </Link>
                <Link
                  href="#photos"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("photos")
                  }}
                  className="text-left text-textMuted font-light hover:text-primary transition-colors"
                >
                  Photography
                </Link>
                <Link
                  href="#google-maps-360"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("google-maps-360")
                  }}
                  className="text-left text-textMuted font-light hover:text-primary transition-colors"
                >
                  Google Maps &amp; 360° Virtual Tours
                </Link>
                <Link
                  href="#custom-virtual-tours"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("custom-virtual-tours")
                  }}
                  className="text-left text-textMuted font-light hover:text-primary transition-colors"
                >
                  Custom Virtual Tours
                </Link>
                <Link
                  href="#websites"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("websites")
                  }}
                  className="text-left text-textMuted font-light hover:text-primary transition-colors"
                >
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
    </div>
  )
}
