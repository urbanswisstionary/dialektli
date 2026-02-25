import type { MetadataRoute } from "next"

import { type Locale } from "next-intl"

import { routing } from "@/i18n/routing"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dialektli.ch"
  const locales = routing.locales as readonly Locale[]

  const routes: MetadataRoute.Sitemap = []

  routes.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  })

  locales.forEach((locale) => {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    })
  })

  return routes
}
