import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GMG Visual",
    short_name: "GMG Visual",
    description:
      "Professional photography, videography, Google Maps & 360° virtual tours and websites for businesses in Vietnam and across Asia.",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F7F8",
    theme_color: "#F5F7F8",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  }
}
