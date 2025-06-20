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

  useEffect(() => {
    if (!isOpen || !containerRef.current) return

    let mounted = true
    const loadViewer = async () => {
      setIsLoading(true)
      setError(null)

      // Clean up any previous viewer
      if (viewerRef.current) {
        viewerRef.current.destroy()
        viewerRef.current = null
      }

      try {
        // Dynamically import the ESM bundle from npm
        const { Viewer } = await import("photo-sphere-viewer")

        if (!mounted) return

        viewerRef.current = new Viewer({
          container: containerRef.current,
          panorama: imageUrl,
          navbar: ["zoom", "move", "fullscreen"],
          defaultZoomLvl: 50,
          size: { width: "100%", height: "100%" },
          loadingImg: "/placeholder.svg?height=100&width=100",
          loadingTxt: "Loading 360° image…",
        })

        viewerRef.current.once("ready", () => setIsLoading(false))
        viewerRef.current.on("error", (e: any) => {
          console.error("Viewer error:", e)
          setError("Failed to render 360° view")
          setIsLoading(false)
        })
      } catch (e) {
        console.error("Failed to load viewer:", e)
        setError("Failed to load Photo Sphere Viewer library")
        setIsLoading(false)
      }
    }

    loadViewer()

    return () => {
      mounted = false
      if (viewerRef.current) {
        viewerRef.current.destroy()
        viewerRef.current = null
      }
    }
  }, [isOpen, imageUrl])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-black/95">
      {/* header */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/60">
        <div className="text-white leading-tight">
          <h3 className="font-light">{title ?? "360° View"}</h3>
          <p className="text-xs text-gray-300">
            {isLoading ? "Loading…" : "Drag to look around • Scroll to zoom • Fullscreen button available"}
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
            <p className="max-w-sm">
              ⚠️ {error}
              <br />
              Please check your connection or try again later.
            </p>
          </div>
        ) : (
          <>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
              </div>
            )}
            <div ref={containerRef} className="w-full h-full" />
          </>
        )}
      </div>

      {/* footer */}
      <div className="px-4 py-3 text-center text-white bg-black/60 text-xs">
        Navigation: drag • Zoom: wheel/pinch • Fullscreen: toolbar button
      </div>
    </div>
  )
}
