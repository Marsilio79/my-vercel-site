"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Instagram, Youtube, Play, Mail, Phone, MapPin, X } from "lucide-react"
import { Carousel } from "@/components/carousel"

export default function GMGVisualPortfolio() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [lightboxImage, setLightboxImage] = useState<{
    src: string
    alt: string
  } | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create mailto link with form data
    const subject = encodeURIComponent(`Message from ${formData.name}`)
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
    const mailtoLink = `mailto:gianmarcomaccabrunogiometti@gmail.com?subject=${subject}&body=${body}`

    // Open email client
    window.location.href = mailtoLink

    // Reset form
    setFormData({
      name: "",
      email: "",
      message: "",
    })
  }

  const openLightbox = (src: string, alt: string) => {
    setLightboxImage({ src, alt })
  }

  const closeLightbox = () => {
    setLightboxImage(null)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
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
      },
      {
        id: 4,
        title: "Capichi & Chops Advertising",
        embedId: "vvfVzozD5VQ",
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
        title: "Walking under the Rain in Città della Pieve",
        description: "Immersive binaural audio experience capturing the sounds of rain in an ancient Italian village.",
        embedId: "YnNIV4pNnNA",
      },
      {
        id: 2,
        title: "Binaural Experience 2",
        description: "Spatial audio journey creating three-dimensional soundscapes for immersive listening.",
        embedId: "x_Vp8N52Aqg",
      },
      {
        id: 3,
        title: "Binaural Experience 3",
        description: "Advanced binaural recording techniques for realistic audio positioning and depth.",
        embedId: "Jyp99PHDmn0",
      },
      {
        id: 4,
        title: "Binaural Experience 4",
        description: "Experimental soundscape exploring the boundaries of immersive audio technology.",
        embedId: "2WQ7lrqr_mA",
      },
      {
        id: 5,
        title: "Binaural Experience 5",
        description: "Natural environment recordings using cutting-edge binaural microphone techniques.",
        embedId: "vg6TTpTgGMc",
      },
      {
        id: 6,
        title: "Binaural Experience 6",
        description: "Urban soundscape captured with precision binaural recording for authentic spatial audio.",
        embedId: "9F9eB3lbMbU",
      },
      {
        id: 7,
        title: "Binaural Experience 7",
        description: "Atmospheric audio journey designed for headphone listening and spatial immersion.",
        embedId: "B0EjhdzCWWI",
      },
      {
        id: 8,
        title: "Binaural Experience 8",
        description: "Professional binaural audio production showcasing innovative recording methodologies.",
        embedId: "MPRmHMjBuzg",
      },
      {
        id: 9,
        title: "Binaural Experience 9",
        description: "Immersive audio storytelling through advanced binaural sound design and recording.",
        embedId: "ivd42loLvUI",
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
        id: 15,
        src: "/placeholder.svg?height=400&width=400&text=Food+15",
        alt: "Food Photography 15",
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
      ...Array.from({ length: 15 }, (_, i) => ({
        id: i + 20,
        src: `/placeholder.svg?height=400&width=400&text=Food+${i + 20}`,
        alt: `Food Photography ${i + 20}`,
      })),
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
      ...Array.from({ length: 9 }, (_, i) => ({
        id: i + 10,
        src: `/placeholder.svg?height=533&width=400&text=Portrait+${i + 10}`,
        alt: `Portrait Photography ${i + 10}`,
      })),
    ],
    maps360: Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      src: `/placeholder.svg?height=300&width=533&text=360+View+${i + 1}`,
      alt: `360° Photography ${i + 1}`,
    })),
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
      ...Array.from({ length: 6 }, (_, i) => ({
        id: i + 7,
        src: `/placeholder.svg?height=300&width=300&text=Iris+${i + 7}`,
        alt: `Iris Photography ${i + 7}`,
      })),
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4" onClick={closeLightbox}>
          <div className="relative max-w-[95vw] max-h-[95vh]">
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
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
        <div className="max-w-7xl mx-auto px-6 py-4">
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
      <section id="hero" className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Gianmarco_Wedding.webp"
            alt="Gianmarco Maccabruno Giometti - Professional Portrait"
            fill
            className="object-cover object-[center_20%]"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-screen">
            {/* Left side - empty to showcase the photo */}
            <div className="hidden lg:block"></div>

            {/* Right side - text content */}
            <div className="text-center lg:text-left text-white lg:pl-8">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-wide mb-6 leading-tight leading-3 leading-8 font-serif">
                GMGVisual
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl font-serif font-light mb-12 leading-relaxed opacity-90">
                Gianmarco Maccabruno Giometti
                <br />
                <span className="text-base md:text-lg lg:text-xl font-extralight">
                  Videographer - Photographer - Editor
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Portfolio Section */}
      <section id="videos" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-light tracking-wide text-textPrimary mb-6">Video Portfolio</h2>
            <div className="w-24 h-px bg-gray-300 mx-auto" />
          </div>

          {/* Advertising & Promotionals */}
          <div className="mb-20">
            <h3 className="text-textPrimary mb-12 text-center font-thin text-3xl">ADVERTISING &amp; PROMOTIONAL</h3>
            <Carousel>
              {videoCategories.advertising.map((video) => (
                <Card key={video.id} className="border-0 shadow-lg h-full">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.embedId}`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
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
          <div className="mb-20">
            <h3 className="text-3xl text-textPrimary mb-12 text-center font-thin">EVENTS</h3>
            <Carousel>
              {videoCategories.events.map((video) => (
                <Card key={video.id} className="border-0 shadow-lg h-full">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.embedId}`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
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
          <div className="mb-20">
            <h3 className="text-3xl text-textPrimary mb-12 text-center font-thin">SHORT MOVIES</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {videoCategories.shortFilms.map((video) => (
                <Card key={video.id} className="border-0 shadow-lg h-full">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.embedId}`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
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
          <div className="mb-20">
            <h3 className="text-3xl text-textPrimary mb-12 text-center font-thin">MUSIC VIDEOS</h3>
            <Carousel>
              {videoCategories.musicVideos.map((video) => (
                <Card key={video.id} className="border-0 shadow-lg h-full">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.embedId}`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
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
          <div className="mb-20">
            <h3 className="text-3xl text-textPrimary mb-12 text-center font-thin">STOCK FOOTAGE</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {videoCategories.stockFootage.map((video) => (
                <Card key={video.id} className="border-0 shadow-lg h-full">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.embedId}`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
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

          {/* Binaural Projects */}
          <div>
            <h3 className="text-3xl text-textPrimary mb-12 text-center font-thin">BINAURAL PROJECTS</h3>
            <Carousel>
              {videoCategories.binaural.map((video) => (
                <Card key={video.id} className="border-0 shadow-lg h-full">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.embedId}`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-6 flex-1">
                      <h4 className="text-xl font-light text-textPrimary mb-2">{video.title}</h4>
                      <p className="text-textMuted font-light">{video.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      {/* Photography Portfolio Section */}
      <section id="photos" className="py-24 px-6 bg-highlight/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-light tracking-wide text-textPrimary mb-6">Photography</h2>
            <div className="w-24 h-px bg-gray-300 mx-auto" />
          </div>

          {/* Food & Hospitality */}
          <div className="mb-20">
            <h3 className="text-3xl text-textPrimary mb-12 text-center font-thin">FOOD &amp; HOSPITALITY</h3>
            <Carousel>
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
                    />
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          {/* Events */}
          <div className="mb-20">
            <h3 className="text-3xl text-textPrimary mb-12 text-center font-thin">EVENTS</h3>
            <Carousel>
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
                    />
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          {/* Portraits */}
          <div className="mb-20">
            <h3 className="text-3xl text-textPrimary mb-12 text-center font-thin">PORTRAITS</h3>
            <Carousel>
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
                    />
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          {/* 360° Google Maps */}
          <div className="mb-20">
            <h3 className="text-3xl text-textPrimary mb-12 text-center font-thin">360° GOOGLE MAPS PICTURES</h3>
            <Carousel>
              {photoCategories.maps360.map((photo) => (
                <div key={photo.id} className="group cursor-pointer">
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
                    />
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          {/* Iris Photography */}
          <div>
            <h3 className="text-3xl text-textPrimary mb-12 text-center font-thin">IRIS PHOTOGRAPHY</h3>
            <Carousel>
              {photoCategories.iris.map((photo) => (
                <div key={photo.id} className="group cursor-pointer">
                  <div
                    className="aspect-square overflow-hidden rounded-lg"
                    onClick={() => openLightbox(photo.src || "/placeholder.svg", photo.alt)}
                  >
                    <Image
                      src={photo.src || "/placeholder.svg"}
                      alt={photo.alt}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-light tracking-wide text-textPrimary mb-6">About</h2>
            <div className="w-24 h-px bg-gray-300 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="aspect-[4/5] overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=600&width=480&text=Gianmarco"
                  alt="Gianmarco Maccabruno Giometti"
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
                  From bold brand campaigns to immersive 360° experiences, I bring a cinematic and strategic eye to
                  every project. My work spans commercial photography, filmmaking, and innovative binaural audiovisual
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
      <section id="contact" className="py-24 px-6 bg-highlight/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-light tracking-wide text-textPrimary mb-6">Contact</h2>
            <div className="w-24 h-px bg-gray-300 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-16">
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
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-textPrimary text-surface">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <p className="font-light">© 2025 GMGVisual. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="#" className="text-surface hover:text-gray-300 transition-colors" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link
                href="https://www.youtube.com/@LafresiaMediaProductions/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-surface hover:text-gray-300 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-surface hover:text-gray-300 transition-colors" aria-label="Vimeo">
                <Play className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
