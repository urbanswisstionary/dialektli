import type { Metadata } from "next"

import { routing } from "@/i18n/routing"
import prisma from "@/lib/prisma"

import ExpressionDetailClient from "./ExpressionDetailClient"

type Props = {
  params: Promise<{ id: string; locale: string }>
}

const BASE_URL = "https://dialektli.ch"

function expressionUrl(locale: string, id: string): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`
  return `${BASE_URL}${prefix}/expressions/${id}`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params

  const expression = await prisma.expression.findUnique({
    where: { id },
    select: { title: true, definition: true },
  })

  if (!expression) {
    return { title: "Expression not found" }
  }

  const title = expression.title
  const description = expression.definition
    ? expression.definition.slice(0, 160)
    : `${title} — Swiss dialect expression on Dialektli`

  const canonicalUrl = expressionUrl(locale, id)

  const alternates: Record<string, string> = {
    "x-default": expressionUrl(routing.defaultLocale, id),
  }
  for (const l of routing.locales) {
    alternates[l] = expressionUrl(l, id)
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
      type: "article",
      url: canonicalUrl,
      images: [
        {
          url: "https://dialektli.ch/assets/dialektli_logo.svg",
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
      images: ["https://dialektli.ch/assets/dialektli_logo.svg"],
    },
  }
}

export default async function ExpressionDetailPage({ params }: Props) {
  const { id, locale } = await params

  const expression = await prisma.expression.findUnique({
    where: { id },
    select: { title: true, definition: true },
  })

  const jsonLd = expression
    ? JSON.stringify({
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        name: expression.title,
        description: expression.definition ?? undefined,
        url: expressionUrl(locale, id),
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "Dialektli",
          url: BASE_URL,
        },
        inLanguage: "de-CH",
      })
    : null

  return (
    <>
      {jsonLd && (
        <script
          id="json-ld-expression"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
      <ExpressionDetailClient expressionId={id} />
    </>
  )
}
