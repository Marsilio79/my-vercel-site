"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"

// ❗ CSS for the viewer (bundled by Next.js)
import "photo-sphere-viewer/dist/photo-sphere-viewer.css"

interface PanoramaViewerProps {
  imageUrl: string
  isOpen: boolean
  onClose: () => void
  title?: string
}

export function PanoramaViewer({ imageUrl, isOpen, onClose, title }: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<any>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent)
      const isSmallScreen = window.innerWidth <= 768
      setIsMobile(isMobileDevice || isSmallScreen)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (!isOpen || !containerRef.current) return

    let mounted = true
    const loadViewer = async () => {
      setIsLoading(true)
      setError(null)

      // Clean up any previous viewer
      if (viewerRef.current) {
        try {
          viewerRef.current.destroy()
        } catch (e) {
          console.warn("Error destroying previous viewer:", e)
        }
        viewerRef.current = null
      }

      try {
        // Add timeout for mobile devices
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("Loading timeout")), isMobile ? 10000 : 15000)
        })

        // Dynamically import the ESM bundle from npm with timeout
        const loadPromise = import("photo-sphere-viewer").then(({ Viewer }) => {
          if (!mounted) return

          const config = {
            container: containerRef.current,
            panorama: imageUrl,
            navbar: isMobile
              ? ["zoom", "fullscreen"] // Simplified navbar for mobile
              : ["zoom", "move", "fullscreen"],
            defaultZoomLvl: isMobile ? 30 : 50, // Lower default zoom for mobile
            size: { width: "100%", height: "100%" },
            loadingImg: "/placeholder.svg?height=100&width=100",
            loadingTxt: "Loading 360° image…",
            // Mobile-specific optimizations
            useXmpData: false,
            mousemove: !isMobile, // Disable mousemove on mobile for better performance
            touchmoveTwoFingers: isMobile,
            mousewheel: !isMobile,
            // Reduce quality on mobile to prevent crashes
            resolution: isMobile ? 32 : 64,
          }

          viewerRef.current = new Viewer(config)

          viewerRef.current.once("ready", () => {
            if (mounted) setIsLoading(false)
          })

          viewerRef.current.on("error", (e: any) => {
            console.error("Viewer error:", e)
            if (mounted) {
              setError("Failed to render 360° view")
              setIsLoading(false)
            }
          })
        })

        await Promise.race([loadPromise, timeoutPromise])
      } catch (e) {
        console.error("Failed to load viewer:", e)
        if (mounted) {
          setError(
            isMobile
              ? "360° viewer not supported on this device. Please try on desktop."
              : "Failed to load Photo Sphere Viewer library",
          )
          setIsLoading(false)
        }
      }
    }

    // Add delay for mobile to prevent immediate crashes
    const delay = isMobile ? 500 : 0
    const timeoutId = setTimeout(loadViewer, delay)

    return () => {
      mounted = false
      clearTimeout(timeoutId)
      if (viewerRef.current) {
        try {
          viewerRef.current.destroy()
        } catch (e) {
          console.warn("Error destroying viewer on cleanup:", e)
        }
        viewerRef.current = null
      }
    }
  }, [isOpen, imageUrl, isMobile])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-black/95">
      {/* header */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/60">
        <div className="text-white leading-tight">
          <h3 className="font-light text-sm md:text-base">{title ?? "360° View"}</h3>
          <p className="text-xs text-gray-300">
            {isLoading
              ? "Loading…"
              : isMobile
                ? "Pinch to zoom • Drag to look around"
                : "Drag to look around • Scroll to zoom • Fullscreen button available"}
          </p>
        </div>
        <button onClick={onClose} className="p-2 text-white hover:text-gray-300" aria-label="Close 360° viewer">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* viewer / states */}
      <div className="relative flex-1">
        {error ? (
          <div className="flex h-full items-center justify-center text-white text-center px-4">
            <div className="max-w-sm">
              <p className="mb-4">⚠️ {error}</p>
              {isMobile && (
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-white/20 rounded text-sm hover:bg-white/30 transition-colors"
                >
                  Close and try on desktop
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4" />
                  <p className="text-sm">Loading 360° experience...</p>
                  {isMobile && <p className="text-xs mt-2 opacity-75">This may take longer on mobile</p>}
                </div>
              </div>
            )}
            <div ref={containerRef} className="w-full h-full" />
          </>
        )}
      </div>

      {/* footer */}
      <div className="px-4 py-3 text-center text-white bg-black/60 text-xs">
        {isMobile
          ? "Touch controls: pinch to zoom • drag to rotate"
          : "Navigation: drag • Zoom: wheel/pinch • Fullscreen: toolbar button"}
      </div>
    </div>
  )
}
