"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Instagram, Youtube, Play, Mail, Phone, MapPin } from "lucide-react"
import { Carousel } from "@/components/carousel"
import { fetchMultipleYouTubeVideos } from "@/utils/youtube"

interface VideoData {
  id: number
  title: string
  description: string
  embedId: string
}

export default function GMGVisualPortfolio() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [videoCategories, setVideoCategories] = useState({
    advertising: [] as VideoData[],
    showreels: [] as VideoData[],
    events: [] as VideoData[],
    shortFilms: [] as VideoData[],
    musicVideos: [] as VideoData[],
    corporate: [] as VideoData[],
    binaural: [] as VideoData[],
  })

  const [isLoading, setIsLoading] = useState(true)

  // Video IDs organized by category
  const videoIds = {
    advertising: [
      "BiFSmwQD82s",
      "eGD0094HpfQ",
      "8Q1JnHOSVNY",
      "hjY2XDto55I",
      "nSDYcfFZMrQ",
      "FJqlT3j4ki4",
      "KRSEHD9eM38",
      "cgjz4P0QvzI",
    ],
    showreels: [
      "OJyN0PMLSDg",
      "m0VRL0ouqUs",
      "_Hr6ALsNjLs",
      "Oo5_Xa_4yqg",
      "1symFDS2GDk",
      "dQw4w9WgXcQ",
      "dQw4w9WgXcQ",
      "dQw4w9WgXcQ",
    ],
    events: [
      "hsiykmzTsPg",
      "GzYrgS0qD9o",
      "KKmEhxQqbpI",
      "UDXWEXCV0fE",
      "qYcwGUpUjok",
      "9jHWeHRdLqc",
      "yaw6p79bP4g",
      "-XgQnFF0kiM",
    ],
    shortFilms: [
      "fyrp_Ut4_tM",
      "pKiE7kPkmBk",
      "a-q7FHpMZoY",
      "dQw4w9WgXcQ",
      "dQw4w9WgXcQ",
      "dQw4w9WgXcQ",
      "dQw4w9WgXcQ",
      "dQw4w9WgXcQ",
    ],
    musicVideos: [
      "pxUlgWVpTJQ",
      "0afIyrEjDqk",
      "xTZlP-jcSyU",
      "tnAA6t97P-A",
      "9rhtfl4daLw",
      "KRDECe4ds5M",
      "jktsqtfwfPU",
      "XJoSbZmKamI",
    ],
    corporate: [
      "h-yO0FPRD7I",
      "SWTINRcqPPI",
      "TwsfD8fffWU",
      "dQw4w9WgXcQ",
      "dQw4w9WgXcQ",
      "dQw4w9WgXcQ",
      "dQw4w9WgXcQ",
      "dQw4w9WgXcQ",
    ],
    binaural: [
      "YnNIV4pNnNA",
      "x_Vp8N52Aqg",
      "Jyp99PHDmn0",
      "2WQ7lrqr_mA",
      "vg6TTpTgGMc",
      "dQw4w9WgXcQ",
      "dQw4w9WgXcQ",
      "dQw4w9WgXcQ",
    ],
  }

  useEffect(() => {
    const loadVideoData = async () => {
      setIsLoading(true)

      try {
        const [
          advertisingData,
          showreelsData,
          eventsData,
          shortFilmsData,
          musicVideosData,
          corporateData,
          binauralData,
        ] = await Promise.all([
          fetchMultipleYouTubeVideos(videoIds.advertising),
          fetchMultipleYouTubeVideos(videoIds.showreels),
          fetchMultipleYouTubeVideos(videoIds.events),
          fetchMultipleYouTubeVideos(videoIds.shortFilms),
          fetchMultipleYouTubeVideos(videoIds.musicVideos),
          fetchMultipleYouTubeVideos(videoIds.corporate),
          fetchMultipleYouTubeVideos(videoIds.binaural),
        ])

        setVideoCategories({
          advertising: advertisingData.map((data, index) => ({
            id: index + 1,
            title: data.title,
            description: data.description,
            embedId: videoIds.advertising[index],
          })),
          showreels: showreelsData.map((data, index) => ({
            id: index + 1,
            title: data.title,
            description: data.description,
            embedId: videoIds.showreels[index],
          })),
          events: eventsData.map((data, index) => ({
            id: index + 1,
            title: data.title,
            description: data.description,
            embedId: videoIds.events[index],
          })),
          shortFilms: shortFilmsData.map((data, index) => ({
            id: index + 1,
            title: data.title,
            description: data.description,
            embedId: videoIds.shortFilms[index],
          })),
          musicVideos: musicVideosData.map((data, index) => ({
            id: index + 1,
            title: data.title,
            description: data.description,
            embedId: videoIds.musicVideos[index],
          })),
          corporate: corporateData.map((data, index) => ({
            id: index + 1,
            title: data.title,
            description: data.description,
            embedId: videoIds.corporate[index],
          })),
          binaural: binauralData.map((data, index) => ({
            id: index + 1,
            title: data.title,
            description: data.description,
            embedId: videoIds.binaural[index],
          })),
        })
      } catch (error) {
        console.error("Error loading video data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadVideoData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  // Sample photo data - replace with real data
  const photoCategories = {
    food: [
      {
        id: 1,
        title: "Luxury Hotel Suite",
        src: "/images/food/hotel-room.webp",
      },
      {
        id: 2,
        title: "Artisanal Brunch Spread",
        src: "/images/food/chops-brunch.webp",
      },
      {
        id: 3,
        title: "Gourmet Crepe Presentation",
        src: "/images/food/crepe.webp",
      },
      {
        id: 4,
        title: "Resort Interior Design",
        src: "/images/food/resort-oasya.webp",
      },
      {
        id: 5,
        title: "Fine Dining Artistry",
        src: "/images/food/syse-dish.webp",
      },
      {
        id: 6,
        title: "Premium Steak Presentation",
        src: "/images/food/lim-meat-1.webp",
      },
      {
        id: 7,
        title: "Casual Dining Experience",
        src: "/images/food/burger-and-beer.webp",
      },
      {
        id: 8,
        title: "Elegant Meat Course",
        src: "/images/food/lim-meat.webp",
      },
      {
        id: 9,
        title: "Traditional Restaurant Interior",
        src: "/images/food/lim-restaurant.webp",
      },
      // Add placeholders to reach 12 total for proper carousel display
      {
        id: 10,
        title: "Food Photography 10",
        src: "/placeholder.svg?height=400&width=400&text=Food+10",
      },
      {
        id: 11,
        title: "Food Photography 11",
        src: "/placeholder.svg?height=400&width=400&text=Food+11",
      },
      {
        id: 12,
        title: "Food Photography 12",
        src: "/placeholder.svg?height=400&width=400&text=Food+12",
      },
    ],
    events: [
      {
        id: 1,
        title: "Yoga Retreat in Pu Luong",
        src: "/images/events/yoga-pu-luong.webp",
      },
      {
        id: 2,
        title: "Concert Reception",
        src: "/images/events/hien-concert.webp",
      },
      {
        id: 3,
        title: "Sound Healing Circle",
        src: "/images/events/sound-healing.webp",
      },
      {
        id: 4,
        title: "School Celebration",
        src: "/images/events/school-party.webp",
      },
      {
        id: 5,
        title: "Meditation & Sound Bath",
        src: "/images/events/yoga-new-mantra.webp",
      },
      {
        id: 6,
        title: "Social Gathering",
        src: "/images/events/syse-event.webp",
      },
      {
        id: 7,
        title: "Diplomatic Anniversary",
        src: "/images/events/italian-embassy-2.webp",
      },
      {
        id: 8,
        title: "Embassy Reception",
        src: "/images/events/italian-embassy.webp",
      },
      // Add placeholders to reach 10 total for proper carousel display
      {
        id: 9,
        title: "Event Photography 9",
        src: "/placeholder.svg?height=500&width=400&text=Event+9",
      },
      {
        id: 10,
        title: "Event Photography 10",
        src: "/placeholder.svg?height=500&width=400&text=Event+10",
      },
    ],
    portraits: [
      {
        id: 1,
        title: "Young Soul from Ta Lang",
        src: "/images/portraits/kid-ta-lang.webp",
      },
      {
        id: 2,
        title: "Golden Hour Portrait",
        src: "/images/portraits/mai-portrait.webp",
      },
      {
        id: 3,
        title: "Wine Master Lorenzo",
        src: "/images/portraits/lorenzo-portrait.webp",
      },
      {
        id: 4,
        title: "Performance Artist",
        src: "/images/portraits/hien-singer-portrait.webp",
      },
      {
        id: 5,
        title: "Village Children",
        src: "/images/portraits/kids-ta-lang.webp",
      },
      {
        id: 6,
        title: "Vietnamese Elder",
        src: "/images/portraits/chu-oi-vietnam.webp",
      },
      {
        id: 7,
        title: "Market Vendor",
        src: "/images/portraits/ba-oi-vietnam.webp",
      },
      {
        id: 8,
        title: "Tuscany Dreams",
        src: "/images/portraits/hien-val-dorcia.webp",
      },
    ],
    maps360: [
      {
        id: 1,
        title: "Hoi An Ancient Town",
        src: "/images/360-maps/chops-hoi-an-360.webp",
      },
      {
        id: 2,
        title: "Rustic Hill Station Interior",
        src: "/images/360-maps/hill-station-360.webp",
      },
      {
        id: 3,
        title: "Tuscany Agriturismo Aerial",
        src: "/images/360-maps/agriturismo-360.webp",
      },
      // Add placeholders to reach 6 total for proper carousel display
      {
        id: 4,
        title: "360° View 4",
        src: "/placeholder.svg?height=300&width=533&text=360+View+4",
      },
      {
        id: 5,
        title: "360° View 5",
        src: "/placeholder.svg?height=300&width=533&text=360+View+5",
      },
      {
        id: 6,
        title: "360° View 6",
        src: "/placeholder.svg?height=300&width=533&text=360+View+6",
      },
    ],
    iris: Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      title: `Iris Photography ${i + 1}`,
      src: `/placeholder.svg?height=300&width=300&text=Iris+${i + 1}`,
    })),
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-textMuted font-light">Loading video content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
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
          <Image src="/images/hero-background.webp" alt="Gianmarco at Wedding" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-screen">
            {/* Left side - empty to showcase the photo */}
            <div className="hidden lg:block"></div>

            {/* Right side - text content */}
            <div className="text-center lg:text-left text-white lg:pl-8">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light tracking-wide mb-6 leading-tight">
                GMGVisual
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl font-serif font-light mb-12 leading-relaxed opacity-90">
                Gianmarco Maccabruno Giometti
                <br />
                <span className="text-base md:text-lg lg:text-xl">Photographer & Filmmaker</span>
              </p>
              <Button
                onClick={() => scrollToSection("videos")}
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 px-8 py-3 text-lg font-light tracking-wide font-serif"
              >
                View My Work
              </Button>
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
            <h3 className="text-3xl font-light text-textPrimary mb-12 text-center">Advertising & Promotionals</h3>
            <Carousel>
              {videoCategories.advertising.map((video) => (
                <Card key={video.id} className="border-0 shadow-lg mx-2">
                  <CardContent className="p-0">
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
                    <div className="p-4 h-20 flex items-center">
                      <h4 className="text-lg font-light text-textPrimary leading-tight line-clamp-2">{video.title}</h4>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </Carousel>
          </div>

          {/* Showreels */}
          <div className="mb-20">
            <h3 className="text-3xl font-light text-textPrimary mb-12 text-center">Showreels</h3>
            <Carousel>
              {videoCategories.showreels.map((video) => (
                <Card key={video.id} className="border-0 shadow-lg mx-2">
                  <CardContent className="p-0">
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
                    <div className="p-4 h-20 flex items-center">
                      <h4 className="text-lg font-light text-textPrimary leading-tight line-clamp-2">{video.title}</h4>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </Carousel>
          </div>

          {/* Events */}
          <div className="mb-20">
            <h3 className="text-3xl font-light text-textPrimary mb-12 text-center">Events</h3>
            <Carousel>
              {videoCategories.events.map((video) => (
                <Card key={video.id} className="border-0 shadow-lg mx-2">
                  <CardContent className="p-0">
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
                    <div className="p-4 h-20 flex items-center">
                      <h4 className="text-lg font-light text-textPrimary leading-tight line-clamp-2">{video.title}</h4>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </Carousel>
          </div>

          {/* Short Films */}
          <div className="mb-20">
            <h3 className="text-3xl font-light text-textPrimary mb-12 text-center">Short Films</h3>
            <Carousel>
              {videoCategories.shortFilms.map((video) => (
                <Card key={video.id} className="border-0 shadow-lg mx-2">
                  <CardContent className="p-0">
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
                    <div className="p-4 h-20 flex items-center">
                      <h4 className="text-lg font-light text-textPrimary leading-tight line-clamp-2">{video.title}</h4>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </Carousel>
          </div>

          {/* Music Videos */}
          <div className="mb-20">
            <h3 className="text-3xl font-light text-textPrimary mb-12 text-center">Music Videos</h3>
            <Carousel>
              {videoCategories.musicVideos.map((video) => (
                <Card key={video.id} className="border-0 shadow-lg mx-2">
                  <CardContent className="p-0">
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
                    <div className="p-4 h-20 flex items-center">
                      <h4 className="text-lg font-light text-textPrimary leading-tight line-clamp-2">{video.title}</h4>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </Carousel>
          </div>

          {/* Corporate */}
          <div className="mb-20">
            <h3 className="text-3xl font-light text-textPrimary mb-12 text-center">Corporate</h3>
            <Carousel>
              {videoCategories.corporate.map((video) => (
                <Card key={video.id} className="border-0 shadow-lg mx-2">
                  <CardContent className="p-0">
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
                    <div className="p-4 h-20 flex items-center">
                      <h4 className="text-lg font-light text-textPrimary leading-tight line-clamp-2">{video.title}</h4>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </Carousel>
          </div>

          {/* Binaural Projects */}
          <div>
            <h3 className="text-3xl font-light text-textPrimary mb-12 text-center">Binaural Projects</h3>
            <Carousel>
              {videoCategories.binaural.map((video) => (
                <Card key={video.id} className="border-0 shadow-lg mx-2">
                  <CardContent className="p-0">
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
                    <div className="p-4 h-20 flex items-center">
                      <h4 className="text-lg font-light text-textPrimary leading-tight line-clamp-2">{video.title}</h4>
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
            <h3 className="text-3xl font-light text-textPrimary mb-12 text-center">Food & Hospitality</h3>
            <Carousel>
              {photoCategories.food.map((photo) => (
                <div key={photo.id} className="group cursor-pointer mx-2">
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={photo.src || "/placeholder.svg"}
                      alt={photo.title}
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
            <h3 className="text-3xl font-light text-textPrimary mb-12 text-center">Events</h3>
            <Carousel>
              {photoCategories.events.map((photo) => (
                <div key={photo.id} className="group cursor-pointer mx-2">
                  <div className="aspect-[4/5] overflow-hidden rounded-lg">
                    <Image
                      src={photo.src || "/placeholder.svg"}
                      alt={photo.title}
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
            <h3 className="text-3xl font-light text-textPrimary mb-12 text-center">Portraits</h3>
            <Carousel>
              {photoCategories.portraits.map((photo) => (
                <div key={photo.id} className="group cursor-pointer mx-2">
                  <div className="aspect-[3/4] overflow-hidden rounded-lg">
                    <Image
                      src={photo.src || "/placeholder.svg"}
                      alt={photo.title}
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
            <h3 className="text-3xl font-light text-textPrimary mb-12 text-center">360° Google Maps</h3>
            <Carousel>
              {photoCategories.maps360.map((photo) => (
                <div key={photo.id} className="group cursor-pointer mx-2">
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <Image
                      src={photo.src || "/placeholder.svg"}
                      alt={photo.title}
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
  <h3 className="text-3xl font-light text-textPrimary mb-12 text-center">Iris Photography</h3>
  <Carousel>
    {[
      "/images/iris/17_SEAN (1).webp",
      "/images/iris/36iris (1).webp",
      "/images/iris/9_CYP (1).webp",
      "/images/iris/ANDREA S._(1).webp",
      "/images/iris/ELISA OK (1).webp",
      "/images/iris/EMANUELA_explosion (1).webp",
      "/images/iris/MANUS TRINITY COLLISION_names (1).webp",
      "/images/iris/VLADI&PIERO (1).webp"
    ].map((src, index) => (
      <div key={index} className="group cursor-pointer mx-2">
        <div className="aspect-square overflow-hidden rounded-lg">
          <Image
            src={src}
            alt={`Iris photo ${index + 1}`}
            width={300}
            height={300}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    ))}
  </Carousel>
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
                  For over ten years, I have been telling stories through light, movement and emotion. Whether it is a fleeting glance, a brand’s identity or a powerful human moment, I aim to capture what words often can’t. My approach blends the precision of a technician with the eye of an artist,crafting visuals that don’t just look beautiful, but feel meaningful.
                </p>
                <p>
                  From intimate wedding ceremonies to large-scale corporate events, from artistic portraits to immersive
                  360° experiences, I bring a unique perspective to every project. My work spans across multiple
                  disciplines, including traditional photography, filmmaking, and innovative binaural audio-visual
                  projects.
                </p>
                <p>
                  Based in Hoi An, Vietnam, I work with clients worldwide, bringing stories to life through the lens of creativity
                  and passion. Every frame is crafted with attention to detail, ensuring that each project reflects the
                  unique vision and personality of my clients.
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
                  Ready to bring your vision to life? Whether you need photography, videography, or a complete visual
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
  className="w-full bg-textPrimary text-surface hover:bg-textPrimary/90 transition-colors duration-200 py-3 font-light tracking-wide rounded-lg"
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
  {/* YouTube */}
  <Link
    href="https://www.youtube.com/@LafresiaMediaProductions"
    target="_blank"
    rel="noopener noreferrer"
    className="text-surface hover:text-gray-300 transition-colors"
    aria-label="YouTube"
  >
    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
      <path d="M23.498 6.186a2.999 2.999 0 0 0-2.113-2.116C19.535 3.5 12 3.5 12 3.5s-7.535 0-9.385.57A2.999 2.999 0 0 0 .502 6.186C0 8.035 0 12 0 12s0 3.965.502 5.814a2.999 2.999 0 0 0 2.113 2.116C4.465 20.5 12 20.5 12 20.5s7.535 0 9.385-.57a2.999 2.999 0 0 0 2.113-2.116C24 15.965 24 12 24 12s0-3.965-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  </Link>

  {/* IMDB */}
  <Link
    href="https://www.imdb.com/name/nm5655409/bio/?ref_=nm_ov_bio_sm"
    target="_blank"
    rel="noopener noreferrer"
    className="text-surface hover:text-gray-300 transition-colors"
    aria-label="IMDB"
  >
    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
      <path d="M0 0v24h24V0H0zm22.5 22.5H1.5V1.5h21v21zM9.1 9.7h.8v4.5h-.8V9.7zm1.6 0h.8l1.3 3.2h.1l1.3-3.2h.8v4.5h-.7v-3.3h-.1l-1.3 3.2h-.6l-1.3-3.2h-.1v3.3h-.7V9.7zm7.7 0c.9 0 1.2.6 1.2 1.2v2.1c0 .6-.3 1.2-1.2 1.2h-1.4c-.9 0-1.2-.6-1.2-1.2V10.9c0-.6.3-1.2 1.2-1.2h1.4zm-.2.6h-1.1c-.3 0-.5.2-.5.5v2c0 .3.2.5.5.5h1.1c.3 0 .5-.2.5-.5v-2c0-.3-.2-.5-.5-.5zm-6.9-.6h.8v4.5h-.8V9.7z" />
    </svg>
  </Link>

  {/* Shutterstock */}
  <Link
    href="https://www.shutterstock.com/g/Lafresia"
    target="_blank"
    rel="noopener noreferrer"
    className="text-surface hover:text-gray-300 transition-colors"
    aria-label="Shutterstock"
  >
    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
      <path d="M22.5 11.99c0 5.8-4.7 10.5-10.5 10.5S1.5 17.79 1.5 11.99 6.2 1.5 12 1.5s10.5 4.7 10.5 10.49zM16.65 7.5h-2.15c-.21 0-.39.15-.44.35l-.46 2.15a.448.448 0 0 0 .44.54h1.14c.13 0 .26.06.34.16.08.1.12.24.09.37l-.28 1.3h-2.15c-.21 0-.39.15-.44.35l-.46 2.15c-.05.21.12.42.34.42h2.15c.21 0 .39-.15.44-.35l.46-2.15a.448.448 0 0 0-.44-.54h-1.14c-.13 0-.26-.06-.34-.16-.08-.1-.12-.24-.09-.37l.28-1.3h2.15c.21 0 .39-.15.44-.35l.46-2.15a.448.448 0 0 0-.44-.54z" />
    </svg>
  </Link>
</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
