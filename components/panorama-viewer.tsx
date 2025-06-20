"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"

interface PanoramaViewerProps {
  imageUrl: string
  isOpen: boolean
  onClose: () => void
  title?: string
}

export function PanoramaViewer({ imageUrl, isOpen, onClose, title }: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<any>(null)

  useEffect(() => {
    if (!isOpen || !containerRef.current) return

    // Dynamically import Photo Sphere Viewer
    const loadViewer = async () => {
      try {
        // Load Photo Sphere Viewer from CDN
        if (!window.PhotoSphereViewer) {
          const script = document.createElement("script")
          script.src = "https://cdn.jsdelivr.net/npm/photo-sphere-viewer@5/dist/index.min.js"
          script.onload = () => initViewer()
          document.head.appendChild(script)

          const link = document.createElement("link")
          link.rel = "stylesheet"
          link.href = "https://cdn.jsdelivr.net/npm/photo-sphere-viewer@5/dist/index.min.css"
          document.head.appendChild(link)
        } else {
          initViewer()
        }
      } catch (error) {
        console.error("Failed to load 360° viewer:", error)
      }
    }

    const initViewer = () => {
      if (containerRef.current && window.PhotoSphereViewer && !viewerRef.current) {
        try {
          viewerRef.current = new window.PhotoSphereViewer.Viewer({
            container: containerRef.current,
            panorama: imageUrl,
            navbar: ["zoom", "move", "fullscreen"],
            defaultZoomLvl: 50,
            mousemove: true,
            mousewheel: true,
            touchmove: true,
            loadingImg: "/placeholder.svg?height=100&width=100&text=Loading...",
            size: {
              width: "100%",
              height: "100%",
            },
          })
        } catch (error) {
          console.error("Failed to initialize 360° viewer:", error)
        }
      }
    }

    loadViewer()

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy()
        viewerRef.current = null
      }
    }
  }, [isOpen, imageUrl])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-sm">
        <div className="text-white">
          <h3 className="text-lg font-light">{title || "360° View"}</h3>
          <p className="text-sm text-gray-300">Use mouse/touch to navigate • Scroll to zoom</p>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-300 transition-colors p-2"
          aria-label="Close 360° viewer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* 360° Viewer Container */}
      <div className="flex-1 relative">
        <div ref={containerRef} className="w-full h-full" />
      </div>

      {/* Instructions */}
      <div className="p-4 bg-black/50 backdrop-blur-sm text-center">
        <p className="text-white text-sm">
          <span className="font-medium">Navigation:</span> Click and drag to look around •
          <span className="font-medium"> Zoom:</span> Mouse wheel or pinch •
          <span className="font-medium"> Fullscreen:</span> Use the fullscreen button
        </p>
      </div>
    </div>
  )
}

// Extend window type for PhotoSphereViewer
declare global {
  interface Window {
    PhotoSphereViewer: any
  }
}
