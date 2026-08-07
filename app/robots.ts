import type { MetadataRoute } from "next"

const siteUrl = "https://gmgvisual.com"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/__forms.html",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
