import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/intern"],
      },
    ],
    sitemap: "https://ath-ev.de/sitemap.xml",
  }
}
