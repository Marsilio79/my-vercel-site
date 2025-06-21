"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CarouselProps {
  children: React.ReactNode[]
  itemsPerView?: {
    mobile: number
    desktop: number
  }
  className?: string
}

export function Carousel({ children, itemsPerView = { mobile: 1, desktop: 3 }, className = "" }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    setIsLoaded(true)
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Add loading state
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  const itemsToShow = isMobile ? itemsPerView.mobile : itemsPerView.desktop
  const totalSlides = Math.ceil(children.length / itemsToShow)
  const maxIndex = totalSlides - 1

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (children.length === 0) return null

  return (
    <div className={`relative ${className}`}>
      {/* Carousel Container */}
      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`flex transition-transform duration-300 ease-in-out`}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className={`flex-shrink-0 w-full flex gap-6`}>
              {children.slice(slideIndex * itemsToShow, (slideIndex + 1) * itemsToShow).map((child, itemIndex) => (
                <div key={itemIndex} className={`${isMobile ? "w-full" : "w-[calc(33.333%-1rem)]"} flex-shrink-0`}>
                  {child}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      {totalSlides > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-4">
          <Button
            variant="outline"
            size="icon"
            className="bg-white/90 hover:bg-white border-gray-200 shadow-lg"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? "bg-primary" : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="bg-white/90 hover:bg-white border-gray-200 shadow-lg"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
