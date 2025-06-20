"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Instagram, Youtube, Play, Mail, Phone, MapPin } from "lucide-react"
import { Carousel } from "@/components/carousel"

export default function GMGVisualPortfolio() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

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

  // Sample video data
  const videoCategories = {
    advertising: [
      {
        id: 1,
        title: "Brand Campaign 2024",
        description: "A cinematic approach to modern brand storytelling, capturing the essence of luxury and elegance.",
        embedId: "dQw4w9WgXcQ",
      },
      {
        id: 2,
        title: "Product Launch",
        description: "Dynamic product showcase combining technical precision with artistic vision.",
        embedId: "dQw4w9WgXcQ",
      },
      {
        id: 3,
        title: "Luxury Fashion",
        description: "High-end fashion campaign with dramatic lighting and composition.",
        embedId: "dQw4w9WgXcQ",
      },
      {
        id: 4,
        title: "Tech Innovation",
        description: "Cutting-edge technology presentation with sleek visual effects.",
        embedId: "dQw4w9WgXcQ",
      },
      {
        id: 5,
        title: "Automotive Excellence",
        description: "Premium car commercial showcasing elegance and performance.",
        embedId: "dQw4w9WgXcQ",
      },
      {
        id: 6,
        title: "Beauty Campaign",
        description: "Sophisticated beauty brand storytelling with artistic flair.",
        embedId: "dQw4w9WgXcQ",
      },
    ],
    events: [
      {
        id: 1,
        title: "Corporate Gala 2024",
        description: "Capturing the energy and elegance of high-profile corporate events.",
        embedId: "dQw4w9WgXcQ",
      },
      {
        id: 2,
        title: "Fashion Week Highlights",
        description: "Behind-the-scenes and runway coverage with artistic flair.",
        embedId: "dQw4w9WgXcQ",
      },
      {
        id: 3,
        title: "Art Gallery Opening",
        description: "Exclusive coverage of contemporary art exhibition launch.",
        embedId: "dQw4w9WgXcQ",
      },
      {
        id: 4,
        title: "Music Festival",
        description: "Dynamic coverage of live performances and crowd energy.",
        embedId: "dQw4w9WgXcQ",
      },
      {
        id: 5,
        title: "Award Ceremony",
        description: "Prestigious award night with celebrity interviews and highlights.",
        embedId: "dQw4w9WgXcQ",
      },
      {
        id: 6,
        title: "Conference Summit",
        description: "Professional conference coverage with keynote presentations.",
        embedId: "dQw4w9WgXcQ",
      },
    ],
    shortFilms: [
      {
        id: 1,
        title: "Reflections",
        description: "A contemplative short film exploring themes of identity and memory through visual poetry.",
        embedId: "dQw4w9WgXcQ",
      },
      {
        id: 2,
        title: "Urban Dreams",
        description: "City life narrative capturing the essence of modern metropolitan existence.",
        embedId: "dQw4w9WgXcQ",
      },
      {
        id: 3,
        title: "Silent Moments",
        description: "Minimalist storytelling focusing on human emotions and connections.",
        embedId: "dQw4w9WgXcQ",
      },
      {
        id: 4,
        title: "Time Fragments",
        description: "Experimental film exploring the concept of time and memory.",
        embedId: "dQw4w9WgXcQ",
      },
    ],
    musicVideos: [
      {
        id: 1,
        title: "Midnight Dreams",
        description: "Atmospheric music video blending surreal visuals with emotional storytelling.",
        embedId: "dQw4w9WgXcQ",
      },
      {
        id: 2,
        title: "Urban Symphony",
        description: "Dynamic urban landscapes synchronized with rhythmic musical elements.",
        embedId: "dQw4w9WgXcQ",
      },
      {
        id: 3,
        title: "Neon Nights",
        description: "Vibrant nighttime visuals with electronic music synchronization.",
        embedId: "dQw4w9WgXcQ",
      },
      {
        id: 4,
        title: "Acoustic Soul",
        description: "Intimate acoustic performance with natural lighting and close-ups.",
        embedId: "dQw4w9WgXcQ",
      },
      {
        id: 5,
        title: "Dance Revolution",
        description: "High-energy dance video with dynamic choreography and effects.",
        embedId: "dQw4w9WgXcQ",
      },
    ],
    weddings: [
      {
        id: 1,
        title: "Tuscany Wedding",
        description: "Intimate wedding cinematography capturing authentic moments in breathtaking Italian countryside.",
        embedId: "dQw4w9WgXcQ",
      },
      {
        id: 2,
        title: "Coastal Romance",
        description: "Seaside wedding with natural lighting and emotional storytelling.",
        embedId: "dQw4w9WgXcQ",
      },
      {
        id: 3,
        title: "Garden Ceremony",
        description: "Elegant garden wedding with floral arrangements and soft lighting.",
        embedId: "dQw4w9WgXcQ",
      },
      {
        id: 4,
        title: "Villa Celebration",
        description: "Luxury villa wedding with architectural beauty and intimate moments.",
        embedId: "dQw4w9WgXcQ",
      },
    ],
    binaural: [
      {
        id: 1,
        title: "Immersive Soundscape",
        description: "Experimental audiovisual project exploring spatial sound and immersive storytelling techniques.",
        embedId: "dQw4w9WgXcQ",
      },
      {
        id: 2,
        title: "3D Audio Experience",
        description: "Cutting-edge binaural recording techniques creating immersive audio landscapes.",
        embedId: "dQw4w9WgXcQ",
      },
      {
        id: 3,
        title: "Spatial Narratives",
        description: "Innovative storytelling using three-dimensional audio positioning.",
        embedId: "dQw4w9WgXcQ",
      },
    ],
  }

  // Sample photography data
  const photoCategories = {
    food: Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      src: `/placeholder.svg?height=400&width=400&text=Food+${i + 1}`,
      alt: `Food Photography ${i + 1}`,
    })),
    events: Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      src: `/placeholder.svg?height=500&width=400&text=Event+${i + 1}`,
      alt: `Event Photography ${i + 1}`,
    })),
    portraits: Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      src: `/placeholder.svg?height=533&width=400&text=Portrait+${i + 1}`,
      alt: `Portrait Photography ${i + 1}`,
    })),
    maps360: Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      src: `/placeholder.svg?height=300&width=533&text=360+View+${i + 1}`,
      alt: `360° Photography ${i + 1}`,
    })),
    iris: Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      src: `/placeholder.svg?height=300&width=300&text=Iris+${i + 1}`,
      alt: `Iris Photography ${i + 1}`,
    })),
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
                <Card key={video.id} className="border-0 shadow-lg">
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
                    <div className="p-6">
                      <h4 className="text-xl font-light text-textPrimary mb-2">{video.title}</h4>
                      <p className="text-textMuted font-light">{video.description}</p>
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
                <Card key={video.id} className="border-0 shadow-lg">
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
                    <div className="p-6">
                      <h4 className="text-xl font-light text-textPrimary mb-2">{video.title}</h4>
                      <p className="text-textMuted font-light">{video.description}</p>
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
                <Card key={video.id} className="border-0 shadow-lg">
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
                    <div className="p-6">
                      <h4 className="text-xl font-light text-textPrimary mb-2">{video.title}</h4>
                      <p className="text-textMuted font-light">{video.description}</p>
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
                <Card key={video.id} className="border-0 shadow-lg">
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
                    <div className="p-6">
                      <h4 className="text-xl font-light text-textPrimary mb-2">{video.title}</h4>
                      <p className="text-textMuted font-light">{video.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </Carousel>
          </div>

          {/* Weddings */}
          <div className="mb-20">
            <h3 className="text-3xl font-light text-textPrimary mb-12 text-center">Weddings</h3>
            <Carousel>
              {videoCategories.weddings.map((video) => (
                <Card key={video.id} className="border-0 shadow-lg">
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
                    <div className="p-6">
                      <h4 className="text-xl font-light text-textPrimary mb-2">{video.title}</h4>
                      <p className="text-textMuted font-light">{video.description}</p>
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
                <Card key={video.id} className="border-0 shadow-lg">
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
                    <div className="p-6">
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
            <h3 className="text-3xl font-light text-textPrimary mb-12 text-center">Food & Hospitality</h3>
            <Carousel>
              {photoCategories.food.map((photo) => (
                <div key={photo.id} className="group cursor-pointer">
                  <div className="aspect-square overflow-hidden rounded-lg">
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
            <h3 className="text-3xl font-light text-textPrimary mb-12 text-center">Events</h3>
            <Carousel>
              {photoCategories.events.map((photo) => (
                <div key={photo.id} className="group cursor-pointer">
                  <div className="aspect-[4/5] overflow-hidden rounded-lg">
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
            <h3 className="text-3xl font-light text-textPrimary mb-12 text-center">Portraits</h3>
            <Carousel>
              {photoCategories.portraits.map((photo) => (
                <div key={photo.id} className="group cursor-pointer">
                  <div className="aspect-[3/4] overflow-hidden rounded-lg">
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
            <h3 className="text-3xl font-light text-textPrimary mb-12 text-center">360° Google Maps</h3>
            <Carousel>
              {photoCategories.maps360.map((photo) => (
                <div key={photo.id} className="group cursor-pointer">
                  <div className="aspect-video overflow-hidden rounded-lg">
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
            <h3 className="text-3xl font-light text-textPrimary mb-12 text-center">Iris Photography</h3>
            <Carousel>
              {photoCategories.iris.map((photo) => (
                <div key={photo.id} className="group cursor-pointer">
                  <div className="aspect-square overflow-hidden rounded-lg">
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
                  With over a decade of experience in visual storytelling, I specialize in creating cinematic narratives
                  that capture the essence of moments, brands, and emotions. My approach combines technical precision
                  with artistic vision, resulting in compelling visual content that resonates with audiences.
                </p>
                <p>
                  From intimate wedding ceremonies to large-scale corporate events, from artistic portraits to immersive
                  360° experiences, I bring a unique perspective to every project. My work spans across multiple
                  disciplines, including traditional photography, filmmaking, and innovative binaural audio-visual
                  projects.
                </p>
                <p>
                  Based in Italy, I work with clients worldwide, bringing stories to life through the lens of creativity
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
                  <span className="text-textMuted font-light">hello@gmgvisual.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="w-5 h-5 text-textMuted" />
                  <span className="text-textMuted font-light">+39 123 456 7890</span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-5 h-5 text-textMuted" />
                  <span className="text-textMuted font-light">Milan, Italy</span>
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
                  className="w-full bg-primary text-white hover:bg-primary/90 py-3 font-light tracking-wide"
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
              <p className="font-light">© 2024 GMGVisual. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="#" className="text-surface hover:text-gray-300 transition-colors" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-surface hover:text-gray-300 transition-colors" aria-label="YouTube">
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
