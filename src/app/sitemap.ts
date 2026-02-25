import type { MetadataRoute } from "next"

import { type Locale } from "next-intl"

import { routing } from "@/i18n/routing"
import prisma from "@/lib/prisma"

const BASE_URL = "https://dialektli.ch"

function localeUrl(locale: Locale, path: string): string {
  // Default locale (de) has no prefix due to localePrefix: "as-needed"
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`
  return `${BASE_URL}${prefix}${path}`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = routing.locales as readonly Locale[]
  const routes: MetadataRoute.Sitemap = []

  // Root
  routes.push({
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  })

  // Static pages per locale
  const staticPaths = ["/", "/about", "/contact-us", "/sprachatlas"]
  for (const locale of locales) {
    for (const p of staticPaths) {
      const url = localeUrl(locale, p === "/" ? "" : p)
      if (url !== BASE_URL) {
        routes.push({
          url,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        })
      }
    }
  }

  // All expressions — one URL per locale
  try {
    const expressions = await prisma.expression.findMany({
      select: { id: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    })

    for (const expression of expressions) {
      for (const locale of locales) {
        routes.push({
          url: localeUrl(locale, `/expressions/${expression.id}`),
          lastModified: expression.updatedAt ?? new Date(),
          changeFrequency: "weekly",
          priority: 0.6,
        })
      }
    }
  } catch {
    // DB unavailable at build time — skip expressions
  }

  return routes
}
