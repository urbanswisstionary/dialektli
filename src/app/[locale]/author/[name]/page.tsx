import type { Metadata } from "next"
import type { Locale } from "next-intl"

import { getTranslations } from "next-intl/server"

import { baseUrl } from "@/config/constants"
import { routing } from "@/i18n/routing"

import AuthorPageClient from "./AuthorPageClient"

type Props = PageProps<"/[locale]/author/[name]">

function authorUrl(locale: string, name: string): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`
  return `${baseUrl}${prefix}/author/${encodeURIComponent(name)}`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name, locale } = await params
  const authorName = decodeURIComponent(name)
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "authorPage",
  })

  const title = t("title", { name: authorName })
  const description = t("description", { name: authorName })
  const canonicalUrl = authorUrl(locale, authorName)

  const alternates: Record<string, string> = {
    "x-default": authorUrl(routing.defaultLocale, authorName),
  }
  for (const l of routing.locales) {
    alternates[l] = authorUrl(l, authorName)
  }

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title: `${title} | Dialektli`,
      description,
      type: "website",
      url: canonicalUrl,
      images: [
        {
          url: `${baseUrl}/assets/dialektli_logo.svg`,
          width: 1200,
          height: 630,
          alt: "Dialektli Logo",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `${title} | Dialektli`,
      description,
      images: [`${baseUrl}/assets/dialektli_logo.svg`],
    },
  }
}

export default async function AuthorPage({ params }: Props) {
  const { name } = await params
  const authorName = decodeURIComponent(name)

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: authorName,
    url: authorUrl("de", authorName),
    sameAs: routing.locales.map((l) => authorUrl(l, authorName)),
  })

  return (
    <>
      <script
        id="json-ld-author"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <AuthorPageClient authorName={authorName} />
    </>
  )
}
