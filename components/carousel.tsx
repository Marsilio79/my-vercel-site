"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CarouselProps {
  children: React.ReactNode[]
  className?: string
}

export function Carousel({ children, className }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const itemsPerView = isMobile ? 1 : 3
  const maxIndex = Math.max(0, Math.ceil(children.length / itemsPerView) - 1)

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)))
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0))
  }

  const getVisibleItems = () => {
    const startIndex = currentIndex * itemsPerView
    return children.slice(startIndex, startIndex + itemsPerView)
  }

  if (children.length === 0) return null

  return (
    <div className={cn("relative", className)}>
      {/* Carousel Content */}
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-300 ease-in-out">
          {getVisibleItems().map((child, index) => (
            <div
              key={currentIndex * itemsPerView + index}
              className={cn("flex-shrink-0", isMobile ? "w-full" : "w-1/3 px-2")}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {children.length > itemsPerView && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border-gray-300 shadow-lg"
            onClick={goToPrevious}
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border-gray-300 shadow-lg"
            onClick={goToNext}
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Dots Navigation */}
      {children.length > itemsPerView && (
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-colors duration-200",
                index === currentIndex ? "bg-primary" : "bg-gray-300 hover:bg-gray-400",
              )}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
