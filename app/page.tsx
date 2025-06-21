"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Youtube, Mail, Phone, MapPin, X } from "lucide-react"
import { Carousel } from "@/components/carousel"
import { PhotoCarousel } from "@/components/photo-carousel"

export default function GMGVisualPortfolio() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    try {
      checkMobile()
      setIsLoading(false)
      window.addEventListener("resize", checkMobile)
      return () => window.removeEventListener("resize", checkMobile)
    } catch (error) {
      console.error("Error during mobile check:", error)
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      const viewport = document.querySelector('meta[name="viewport"]')
      if (!viewport) {
        const meta = document.createElement("meta")
        meta.name = "viewport"
        meta.content = "width=device-width, initial-scale=1.0"
        document.getElementsByTagName("head")[0].appendChild(meta)
      }
    } catch (error) {
      console.error("Error setting viewport:", error)
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [lightboxImage, setLightboxImage] = useState<{
    src: string
    alt: string
  } | null>(null)

  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set())

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(`Message from ${formData.name}`)
      const body = encodeURIComponent(`Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}`)
      const mailtoLink = `mailto:gianmarcomaccabrunogiometti@gmail.com?subject=${subject}&body=${body}`

      // Open email client
      window.location.href = mailtoLink

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Failed to submit form. Please try again.")
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
          className="object-cover w-full h-full"
          loading="lazy"
          onError={customThumbnail ? undefined : handleImageError}
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
        customThumbnail: "/images/video-thumbs/chops-promo-thumb.jpg",
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
        title: "Thanh Lam - Tướng Phủ Thế",
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
    binaural: [
      {
        id: 1,
        title: "Binaural Experience 1",
        description: "Immersive binaural audio experience capturing the sounds of rain in an ancient Italian village.",
        embedId: "YnNIV4pNnNA",
        customThumbnail: "/images/video-thumbs/binaural-walkin-rain-italy-thumb.jpg",
      },
      {
        id: 2,
        title: "Binaural Experience 2",
        description: "Spatial audio journey creating three-dimensional soundscapes for immersive listening.",
        embedId: "x_Vp8N52Aqg",
        customThumbnail: "/images/video-thumbs/binaural-walking-nature-lake-thumb.jpg",
      },
      {
        id: 3,
        title: "Binaural Experience 3",
        description: "Advanced binaural recording techniques for realistic audio positioning and depth.",
        embedId: "Jyp99PHDmn0",
        customThumbnail: "/images/video-thumbs/binaural-driving-hanoi-thumb.jpg",
      },
      {
        id: 4,
        title: "Binaural Experience 4",
        description: "Experimental soundscape exploring the boundaries of immersive audio technology.",
        embedId: "2WQ7lrqr_mA",
        customThumbnail: "/images/video-thumbs/binaural-walking-tay-ho-thumb.jpg",
      },
      {
        id: 5,
        title: "Binaural Experience 5",
        description: "Natural environment recordings using cutting-edge binaural microphone techniques.",
        embedId: "vg6TTpTgGMc",
        customThumbnail: "/images/video-thumbs/binaural-walkin-rain-hanoi-thumb.jpg",
      },
      {
        id: 6,
        title: "Binaural Experience 6",
        description: "Urban soundscape captured with precision binaural recording for authentic spatial audio.",
        embedId: "9F9eB3lbMbU",
        customThumbnail: "/images/video-thumbs/binaural-night-market-thumb.jpg",
      },
      {
        id: 7,
        title: "Binaural Experience 7",
        description: "Atmospheric audio journey designed for headphone listening and spatial immersion.",
        embedId: "B0EjhdzCWWI",
        customThumbnail: "/images/video-thumbs/binaural-junkie-thumb.jpg",
      },
      {
        id: 8,
        title: "Binaural Experience 8",
        description: "Professional binaural audio production showcasing innovative recording methodologies.",
        embedId: "MPRmHMjBuzg",
        customThumbnail: "/images/video-thumbs/binaural-westlake-thumb.jpg",
      },
      {
        id: 9,
        title: "Binaural Experience 9",
        description: "Immersive audio storytelling through advanced binaural sound design and recording.",
        embedId: "ivd42loLvUI",
        customThumbnail: "/images/video-thumbs/binaural-walkin-rain-italy-thumb.jpg",
      },
    ],
  }

  // Sample photography data
  const photoCategories = {
    food: [
      {
        id: 1,
        src: "/images/food/2Burgers-Chops.webp",
        alt: "Gourmet Burgers - Chops Restaurant",
      },
      {
        id: 2,
        src: "/images/food/3Restaurant-HaNoi.webp",
        alt: "Restaurant Interior - Hanoi",
      },
      {
        id: 3,
        src: "/images/food/4poggio-falcone.webp",
        alt: "Poggio Falcone Villa with Pool",
      },
      {
        id: 4,
        src: "/images/food/5WideOasya.webp",
        alt: "Luxury Hotel Bedroom - Oasya",
      },
      {
        id: 5,
        src: "/images/food/1WideOAsya6.webp",
        alt: "Elegant Dining Area - Oasya",
      },
      {
        id: 6,
        title: "9Sunset-starter",
        src: "/images/food/9Sunset-starter.webp",
        alt: "Sunset Charcuterie Board with Wine",
      },
      {
        id: 7,
        src: "/images/food/6Segafredo-gelato.webp",
        alt: "Segafredo Gelato",
      },
      {
        id: 8,
        src: "/images/food/8Garden-hotel.webp",
        alt: "Hotel Garden Pool Area",
      },
      {
        id: 9,
        src: "/images/food/7Hotel-room.webp",
        alt: "Modern Hotel Room Interior",
      },
      {
        id: 10,
        src: "/images/food/10Resort-puluong.webp",
        alt: "Eco Resort Bedroom - Pu Luong",
      },
      {
        id: 11,
        src: "/images/food/11Lim-restaurant.webp",
        alt: "Traditional Asian Restaurant Interior",
      },
      {
        id: 12,
        src: "/images/food/12Lim-meat.webp",
        alt: "Fine Dining Meat Dish",
      },
      {
        id: 13,
        src: "/images/food/13food-ready.webp",
        alt: "Artistic Dessert with Honeycomb",
      },
      {
        id: 14,
        src: "/images/food/14Syse-restaurant2.webp",
        alt: "Modern Restaurant Interior - Syse",
      },
      {
        id: 16,
        src: "/images/food/16Burger-and-beer.webp",
        alt: "Burger and Beer Outdoor Dining",
      },
      {
        id: 17,
        src: "/images/food/17Hotel-int.webp",
        alt: "Modern Hotel Cafe Interior",
      },
      {
        id: 18,
        src: "/images/food/18Chops-esterior.webp",
        alt: "Chops Restaurant Night Exterior",
      },
      {
        id: 19,
        src: "/images/food/19Syse-restaurant.webp",
        alt: "Upscale Restaurant Interior - Syse",
      },
    ],
    events: [
      {
        id: 1,
        src: "/images/events/1Hien-Concert.webp",
        alt: "Hien Concert - Formal Cultural Event",
      },
      {
        id: 2,
        src: "/images/events/2Yoga-New-Mantra.webp",
        alt: "New Mantra Yoga Session - Indoor Meditation Circle",
      },
      {
        id: 3,
        src: "/images/events/3-Syse-event.webp",
        alt: "Syse Restaurant Event - Social Gathering",
      },
      {
        id: 4,
        src: "/images/events/4School-party.webp",
        alt: "School Party - Group Celebration",
      },
      {
        id: 5,
        src: "/images/events/5-Wedding.webp",
        alt: "Traditional Vietnamese Wedding Ceremony",
      },
      {
        id: 6,
        src: "/images/events/6Italian-Embassy.webp",
        alt: "Italian Embassy - 50th Anniversary Diplomatic Relations",
      },
      {
        id: 7,
        src: "/images/events/8Yoga-Pu-Luong.webp",
        alt: "Yoga Retreat - Pu Luong Rice Fields",
      },
      {
        id: 8,
        src: "/images/events/9party.webp",
        alt: "Upscale Party - Circular Architecture View",
      },
      {
        id: 9,
        src: "/images/events/10partysyse.webp",
        alt: "Evening Party - Syse Venue with Dramatic Lighting",
      },
    ],
    portraits: [
      {
        id: 1,
        src: "/images/portraits/1Lorenzo-portrait.webp",
        alt: "Lorenzo - Wine Expert Portrait at Pomario Winery",
      },
      {
        id: 2,
        src: "/images/portraits/2Chu-oi-Vietnam.webp",
        alt: "Vietnamese Farmer Portrait - Traditional Conical Hat",
      },
      {
        id: 3,
        src: "/images/portraits/3Hien-singer-portrait.webp",
        alt: "Hien - Professional Singer Studio Portrait",
      },
      {
        id: 4,
        src: "/images/portraits/4Ba-Oi-Ta-Lang.webp",
        alt: "Elderly Vietnamese Woman - Authentic Local Portrait",
      },
      {
        id: 5,
        src: "/images/portraits/5Chefs.webp",
        alt: "Professional Chefs Portrait - Restaurant Kitchen",
      },
      {
        id: 6,
        src: "/images/portraits/6Mai-portrait.webp",
        alt: "Mai - Golden Hour Street Portrait",
      },
      {
        id: 7,
        src: "/images/portraits/7Mia-portrait.webp",
        alt: "Mia - Yoga Lifestyle Portrait",
      },
      {
        id: 8,
        src: "/images/portraits/8Hien-portrait.webp",
        alt: "Hien - Classical Violinist Portrait",
      },
      {
        id: 9,
        src: "/images/portraits/9Ciro.webp",
        alt: "Ciro - Dramatic Architecture Portrait",
      },
      {
        id: 10,
        src: "/images/portraits/10Hien-Val-dOrcia.webp",
        alt: "Hien - Portrait in Val d'Orcia, Italy",
      },
      {
        id: 11,
        src: "/images/portraits/11katya.webp",
        alt: "Katya - Natural Light Portrait",
      },
      {
        id: 12,
        src: "/images/portraits/12Kid3-Ta-Lang.webp",
        alt: "Young Boy - Ta Lang Village",
      },
      {
        id: 13,
        src: "/images/portraits/13Ba-oi-Vietnam.webp",
        alt: "Elderly Vietnamese Woman - Ba Oi in Traditional Setting",
      },
      {
        id: 14,
        src: "/images/portraits/14Hien-violin.webp",
        alt: "Hien - Violinist Performing Outdoors",
      },
      {
        id: 15,
        src: "/images/portraits/15Kid-Ta-Lang.webp",
        alt: "Child Portrait - Ta Lang Village",
      },
      {
        id: 16,
        src: "/images/portraits/16Kid.webp",
        alt: "Young Child - Close-up Portrait",
      },
      {
        id: 17,
        src: "/images/portraits/17Kid-Ta-Lang.webp",
        alt: "Kid - Ta Lang Village Portrait",
      },
      {
        id: 18,
        src: "/images/portraits/18Kids-Ta-Lang.webp",
        alt: "Children - Group Portrait in Ta Lang Village",
      },
    ],
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
        src: "/images/360/3Hill-station-new.webp",
        alt: "Interior View - Hill Station Restaurant with Rustic Architecture, Artistic Murals and Atmospheric Lighting",
      },
      {
        id: 4,
        src: "/images/360/POGGIO360_1.jpg",
        alt: "Aerial View - Poggio Falcone Villa with Swimming Pool and Tuscan Countryside Panorama",
      },
    ],
    iris: [
      {
        id: 1,
        src: "/images/iris/1irisphotographySEAN.webp",
        alt: "Sean - Iris Photography with Blue and Golden Patterns",
      },
      {
        id: 2,
        src: "/images/iris/2irisphotographyVLADI&PIERO.webp",
        alt: "Vladi & Piero - Dual Iris Photography Blue and Brown",
      },
      {
        id: 3,
        src: "/images/iris/3irisphotographyMANUS.webp",
        alt: "Manus, Trang & Quoc Anh - Triple Iris Photography Collection",
      },
      {
        id: 4,
        src: "/images/iris/4irisphotography.webp",
        alt: "Alessio, Raffaella, Alice & Francesco - Quad Iris Photography",
      },
      {
        id: 5,
        src: "/images/iris/5irisphotographyELISA.webp",
        alt: "Elisa - Blue Iris Photography with Intricate Patterns",
      },
      {
        id: 6,
        src: "/images/iris/6iriphotographyEMANUELA.webp",
        alt: "Emanuela - Iris Photography with Blue and Orange Tones",
      },
      {
        id: 7,
        src: "/images/iris/7irisphotographyFRAN.webp",
        alt: "Fran - Iris Photography with Subtle Brown and Blue Tones",
      },
      {
        id: 8,
        src: "/images/iris/8irisphotographyHAMISH.webp",
        alt: "Hamish - Iris Photography with Radiant Texture",
      },
      {
        id: 9,
        src: "/images/iris/9irisphotographyAMAAN.webp",
        alt: "Amaan - Deep Blue and Amber Iris Photography",
      },
      {
        id: 10,
        src: "/images/iris/10irisphotographyCYP.webp",
        alt: "CYP - Artistic Iris Photography in Cool Tones",
      },
      {
        id: 11,
        src: "/images/iris/11irisphotographyCAROL.webp",
        alt: "Carol - Warm and Bright Iris Portrait",
      },
      {
        id: 12,
        src: "/images/iris/12irisphotographyFEDERICO_R2.webp",
        alt: "Federico - Enhanced Iris Detail Photography",
      },
    ],
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-textMuted">Loading GMGVisual...</p>
        </div>
      </div>
    )
  }

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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-sm border-b border-highlight">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="#" className="flex items-center">
              <Image
                src="/images/gmg-logo.webp"
                alt="GMGVisual Logo"
                width={200}
                height={40}
                className="h-8 w-auto brightness-50"
              />
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-textMuted hover:text-primary transition-colors font-light"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("videos")}
                className="text-textMuted hover:text-primary transition-colors font-light"
              >
                Videos
              </button>
              <button
                onClick={() => scrollToSection("photos")}
                className="text-textMuted hover:text-primary transition-colors font-light"
              >
                Photos
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-textMuted hover:text-primary transition-colors font-light"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-textMuted hover:text-primary transition-colors font-light"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 min-h-screen">
          <Image
            src="/images/Gianmarco_Wedding.webp"
            alt="Gianmarco Maccabruno Giometti - Professional Portrait"
            fill
            className="object-cover object-[center_0%]"
            priority
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center 0%",
            }}
            onError={(e) => {
              console.error("Hero image failed to load:", e)
              // Fallback: set a background color
              const target = e.target as HTMLImageElement
              if (target.parentElement) {
                target.parentElement.style.backgroundColor = "#1a1a1a"
              }
            }}
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="relative z-10 w-full container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 items-center min-h-screen">
            {/* Left side - empty to showcase the photo */}
            <div className="hidden lg:block"></div>

            {/* Right side - text content */}
            <div className="text-center lg:text-left text-white lg:pl-8">
              <h1 className="text-[clamp(2.5rem,8vw,5rem)] md:text-[clamp(3rem,10vw,6rem)] lg:text-[clamp(4rem,12vw,8rem)] font-light tracking-wide mb-4 md:mb-6 leading-tight font-serif">
                GMGVisual
              </h1>
              <p className="text-[clamp(1rem,4vw,1.25rem)] md:text-[clamp(1.125rem,5vw,1.5rem)] lg:text-[clamp(1.25rem,6vw,2rem)] font-serif font-light mb-8 md:mb-12 leading-relaxed opacity-90">
                Gianmarco Maccabruno Giometti
                <br />
                <span className="text-[clamp(0.875rem,3vw,1rem)] md:text-[clamp(1rem,4vw,1.125rem)] lg:text-[clamp(1.125rem,5vw,1.5rem)] font-extralight">
                  Videographer - Photographer - Editor
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Portfolio Section */}
      <section id="videos" className="py-12 md:py-24 px-4 sm:px-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-5xl md:text-6xl font-light tracking-wide text-textPrimary mb-8 md:mb-12">
              Video Portfolio
            </h2>
            <div className="w-24 h-px bg-gray-300 mx-auto" />
          </div>

          {/* Advertising & Promotionals */}
          <div className="mb-12 md:mb-20">
            <h3 className="text-textPrimary mb-8 md:mb-12 text-center font-thin text-3xl">
              ADVERTISING &amp; PROMOTIONAL
            </h3>
            <Carousel itemsPerView={{ mobile: 1, desktop: 3 }}>
              {(mobileOptimized ? videoCategories.advertising.slice(0, 6) : videoCategories.advertising).map(
                (video) => (
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
                ),
              )}
            </Carousel>
            {mobileOptimized && videoCategories.advertising.length > 6 && (
              <div className="text-center mt-8">
                <Button variant="outline" onClick={() => setMobileOptimized(false)} className="px-6 py-2">
                  View All Videos
                </Button>
              </div>
            )}
          </div>

          {/* Events */}
          <div className="mb-12 md:mb-20">
            <h3 className="text-3xl text-textPrimary mb-8 md:mb-12 text-center font-thin">EVENTS</h3>
            <Carousel itemsPerView={{ mobile: 1, desktop: 3 }}>
              {(mobileOptimized ? videoCategories.events.slice(0, 6) : videoCategories.events).map((video) => (
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
            {mobileOptimized && videoCategories.events.length > 6 && (
              <div className="text-center mt-8">
                <Button variant="outline" onClick={() => setMobileOptimized(false)} className="px-6 py-2">
                  View All Videos
                </Button>
              </div>
            )}
          </div>

          {/* Short Films */}
          <div className="mb-12 md:mb-20">
            <h3 className="text-3xl text-textPrimary mb-8 md:mb-12 text-center font-thin">SHORT MOVIES</h3>
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

          {/* Awards & Recognition */}
          <div className="mb-12 md:mb-20">
            <h3 className="text-3xl text-textPrimary mb-8 md:mb-12 text-center font-thin">AWARDS &amp; RECOGNITION</h3>
            <div className="text-center mb-8 md:mb-12">
              <p className="text-textMuted font-light text-lg max-w-4xl mx-auto leading-relaxed">
                International recognition for excellence in cinematography and filmmaking from prestigious film
                festivals worldwide.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
              <div className="group">
                <Card className="border-0 shadow-lg h-full hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="aspect-square bg-white rounded-lg overflow-hidden flex items-center justify-center p-4">
                      <Image
                        src="/images/awards/barcelona-award.webp"
                        alt="Barcelona Planet Film Festival - Best Cinematography Award"
                        width={300}
                        height={300}
                        className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 flex-1 text-center">
                      <h4 className="text-lg font-light text-textPrimary mb-2">Barcelona Planet Film Festival</h4>
                      <p className="text-sm text-textMuted font-light">Best Cinematography</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="group">
                <Card className="border-0 shadow-lg h-full hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="aspect-square bg-white rounded-lg overflow-hidden flex items-center justify-center p-4">
                      <Image
                        src="/images/awards/five-continents-awards.webp"
                        alt="Five Continents International Film Festival - Awards of Recognition"
                        width={300}
                        height={300}
                        className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 flex-1 text-center">
                      <h4 className="text-lg font-light text-textPrimary mb-2">Five Continents Film Festival</h4>
                      <p className="text-sm text-textMuted font-light">Best Cinematography & Special Mention Editing</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="group">
                <Card className="border-0 shadow-lg h-full hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="aspect-square bg-white rounded-lg overflow-hidden flex items-center justify-center p-4">
                      <Image
                        src="/images/awards/virgin-spring-award.webp"
                        alt="Virgin Spring Cinefest - Best Cinematography Gold Award"
                        width={300}
                        height={300}
                        className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 flex-1 text-center">
                      <h4 className="text-lg font-light text-textPrimary mb-2">Virgin Spring Cinefest</h4>
                      <p className="text-sm text-textMuted font-light">Best Cinematography - Gold Award</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Music Videos */}
          <div className="mb-12 md:mb-20">
            <h3 className="text-3xl text-textPrimary mb-8 md:mb-12 text-center font-thin">MUSIC VIDEOS</h3>
            <Carousel itemsPerView={{ mobile: 1, desktop: 3 }}>
              {(mobileOptimized ? videoCategories.musicVideos.slice(0, 6) : videoCategories.musicVideos).map(
                (video) => (
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
                ),
              )}
            </Carousel>
            {mobileOptimized && videoCategories.musicVideos.length > 6 && (
              <div className="text-center mt-8">
                <Button variant="outline" onClick={() => setMobileOptimized(false)} className="px-6 py-2">
                  View All Videos
                </Button>
              </div>
            )}
          </div>

          {/* Stock Footage */}
          <div className="mb-12 md:mb-20">
            <h3 className="text-3xl text-textPrimary mb-8 md:mb-12 text-center font-thin">STOCK FOOTAGE</h3>
            <div className="text-center mb-8 md:mb-12">
              <p className="text-textMuted font-light text-lg max-w-4xl mx-auto leading-relaxed">
                I create high-quality stock footage for leading platforms such as Shutterstock, Pond5, and Adobe Stock.
                My work spans cinematic visuals, dynamic scenes, and versatile content designed to meet the needs of
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
                      <h4 className="text-xl font-light text-textPrimary mb-2">{video.title}</h4>
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
                  className="group flex-1"
                >
                  <Card className="border-0 shadow-lg h-full hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-0 h-full flex flex-col">
                      <div className="aspect-[2.5/1] bg-white rounded-lg overflow-hidden flex items-center justify-center p-3">
                        <Image
                          src="/images/platforms/shutterstock-logo-new.webp"
                          alt="Shutterstock - View Lafresia's Portfolio"
                          width={160}
                          height={64}
                          className="w-40 h-auto object-contain group-hover:scale-105 transition-transform duration-300"
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
                  className="group flex-1"
                >
                  <Card className="border-0 shadow-lg h-full hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-0 h-full flex flex-col">
                      <div className="aspect-[2.5/1] bg-white rounded-lg overflow-hidden flex items-center justify-center p-3">
                        <Image
                          src="/images/platforms/adobe-stock-logo-new.webp"
                          alt="Adobe Stock - View Gianmarco's Portfolio"
                          width={160}
                          height={64}
                          className="w-40 h-auto object-contain group-hover:scale-105 transition-transform duration-300"
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
                  className="group flex-1"
                >
                  <Card className="border-0 shadow-lg h-full hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-0 h-full flex flex-col">
                      <div className="aspect-[2.5/1] bg-white rounded-lg overflow-hidden flex items-center justify-center p-3">
                        <Image
                          src="/images/platforms/pond5-logo-new.webp"
                          alt="Pond5 - View Lafresia Stock Video's Portfolio"
                          width={160}
                          height={64}
                          className="w-40 h-auto object-contain group-hover:scale-105 transition-transform duration-300"
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

          {/* Binaural Projects */}
          <div>
            <h3 className="text-3xl text-textPrimary mb-8 md:mb-12 text-center font-thin">BINAURAL PROJECTS</h3>
            <div className="text-center mb-8 md:mb-12">
              <p className="text-textMuted font-light text-lg max-w-4xl mx-auto leading-relaxed">
                <span className="font-medium">Step into sound...</span>
                <br />
                With Binauralife Experience, I create immersive 3D audio journeys that make you feel right there, in the
                middle of a rainstorm, a bustling street, or a quiet forest. Each recording is captured with
                professional binaural microphones to recreate sound exactly as the human ear hears it. Slip on your
                headphones, close your eyes, and let the world unfold around you.
              </p>
            </div>
            <Carousel itemsPerView={{ mobile: 1, desktop: 3 }}>
              {(mobileOptimized ? videoCategories.binaural.slice(0, 6) : videoCategories.binaural).map((video) => (
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
                      <h4 className="text-xl font-light text-textPrimary mb-2">{video.title}</h4>
                      <p className="text-textMuted font-light">{video.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </Carousel>
            {mobileOptimized && videoCategories.binaural.length > 6 && (
              <div className="text-center mt-8">
                <Button variant="outline" onClick={() => setMobileOptimized(false)} className="px-6 py-2">
                  View All Videos
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Photography Portfolio Section */}
      <section id="photos" className="py-12 md:py-24 px-4 sm:px-6 bg-highlight/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-5xl md:text-6xl font-light tracking-wide text-textPrimary mb-8 md:mb-12">
              Photography
            </h2>
            <div className="w-24 h-px bg-gray-300 mx-auto" />
          </div>

          {/* Food & Hospitality */}
          <div className="mb-12 md:mb-20">
            <h3 className="text-3xl text-textPrimary mb-8 md:mb-12 text-center font-thin">FOOD &amp; HOSPITALITY</h3>
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
            <h3 className="text-3xl text-textPrimary mb-8 md:mb-12 text-center font-thin">EVENTS</h3>
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
            <h3 className="text-3xl text-textPrimary mb-8 md:mb-12 text-center font-thin">PORTRAITS</h3>
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
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      loading={mobileOptimized ? "lazy" : "eager"}
                      quality={mobileOptimized ? 60 : 85}
                    />
                  </div>
                </div>
              ))}
            </PhotoCarousel>
          </div>

          {/* Google Maps Pictures */}
          <div className="mb-12 md:mb-20">
            <h3 className="text-3xl text-textPrimary mb-8 md:mb-12 text-center font-thin">GOOGLE MAPS PICTURES</h3>
            <div className="text-center mb-8">
              <p className="text-textMuted font-light text-lg max-w-4xl mx-auto leading-relaxed">
                Professional photography for Google Maps and virtual tours, showcasing locations with stunning detail
                and clarity.
              </p>
            </div>
            <PhotoCarousel itemsPerView={{ mobile: 1, desktop: 3 }}>
              {photoCategories.googleMaps.map((photo, index) => (
                <div key={photo.id} className="group cursor-pointer">
                  {index === 0 ? (
                    // First image - clickable link to Google Maps
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
                    // Other images - regular lightbox behavior
                    <div
                      className="aspect-video overflow-hidden rounded-lg"
                      onClick={() => openLightbox(photo.src || "/placeholder.svg", photo.alt)}
                    >
                      <Image
                        src={photo.src || "/placeholder.svg"}
                        alt={photo.alt}
                        width={533}
                        height={300}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        loading={mobileOptimized ? "lazy" : "eager"}
                        quality={mobileOptimized ? 60 : 85}
                      />
                    </div>
                  )}
                </div>
              ))}
            </PhotoCarousel>
          </div>

          {/* Iris Photography */}
          <div>
            <h3 className="text-3xl text-textPrimary mb-8 md:mb-12 text-center font-thin">IRIS PHOTOGRAPHY</h3>
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
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      loading={mobileOptimized ? "lazy" : "eager"}
                      quality={mobileOptimized ? "60" : "85"}
                    />
                  </div>
                </div>
              ))}
            </PhotoCarousel>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-5xl md:text-6xl font-light tracking-wide text-textPrimary mb-8 md:mb-12">About</h2>
            <div className="w-24 h-px bg-gray-300 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <div className="aspect-[4/5] overflow-hidden rounded-lg">
                <Image
                  src="/images/gianmarco-collage.webp"
                  alt="Gianmarco Maccabruno Giometti - Professional Work Collage"
                  width={480}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-light text-textPrimary mb-8">Gianmarco Maccabruno Giometti</h3>
              <div className="space-y-6 text-textMuted leading-relaxed font-light text-lg">
                <p>
                  For over a decade, I've been telling stories through images, drawn to the quiet power of moments that
                  often go unnoticed. My work is rooted in a deep respect for emotion, authenticity, and craft. I aim to
                  create visuals that don't just look beautiful, but feel true, stories that stay with people, even
                  after the screen fades to black.
                </p>
                <p>
                  From bold brand campaigns to immersive experiences, I bring a cinematic and strategic eye to every
                  project. My work spans commercial photography, filmmaking, and innovative binaural audiovisual
                  content, all crafted to elevate storytelling, capture attention, and connect audiences with the heart
                  of a brand.
                </p>
                <p>
                  Based in Vietnam, I work with clients worldwide, bringing stories to life through the lens of
                  creativity and passion. Every frame is crafted with attention to detail, ensuring that each project
                  reflects the unique vision and personality of my clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-24 px-4 sm:px-6 bg-highlight/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-5xl md:text-6xl font-light tracking-wide text-textPrimary mb-8 md:mb-12">Contact</h2>
            <div className="w-24 h-px bg-gray-300 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            <div>
              <h3 className="text-2xl font-light text-textPrimary mb-8">{"Let's Create Together"}</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Mail className="w-5 h-5 text-textMuted" />
                  <span className="text-textMuted font-light">gianmarcomaccabrunogiometti@gmail.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="w-5 h-5 text-textMuted" />
                  <span className="text-textMuted font-light">+84 369 007 610</span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-5 h-5 text-textMuted" />
                  <span className="text-textMuted font-light">Hoi An, Vietnam</span>
                </div>
              </div>
              <div className="mt-12">
                <p className="text-textMuted font-light leading-relaxed">
                  Ready to bring your vision to life? Whether you need photography, videography or a complete visual
                  storytelling solution, {"I'm"} here to help create something extraordinary together.
                </p>
              </div>
            </div>

            <div>
              <div className="w-full max-w-md mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="border-gray-300 focus:border-black font-light"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="border-gray-300 focus:border-black font-light"
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="border-gray-300 focus:border-black font-light resize-none"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-textPrimary text-white hover:bg-textPrimary/90 py-3 font-light tracking-wide rounded-lg transition-colors"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 bg-textPrimary text-surface">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <p className="font-light">© 2025 GMGVisual. All rights reserved.</p>
            </div>
            <div className="flex items-center">
              <Link
                href="https://www.youtube.com/@LafresiaMediaProductions/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-surface hover:text-gray-300 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-8 h-8" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
