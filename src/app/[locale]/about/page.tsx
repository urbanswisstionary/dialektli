"use client"

import type { FC, PropsWithChildren } from "react"

import { useTranslations } from "next-intl"

import { Card, CardContent } from "@/components/ui/card"

const ExternalLink: FC<PropsWithChildren<{ href: string }>> = ({
  href,
  children,
}) => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    className="font-medium text-primary underline-offset-4 hover:underline"
    href={href}
  >
    {children}
  </a>
)

const paragraphs = [
  "paragraph1",
  "paragraph2",
  "paragraph3",
  "paragraph4",
  "paragraph5",
  "paragraph6",
  "paragraph7",
  "paragraph8",
  "paragraph9",
  "paragraph10",
  "paragraph11",
] as const

const externalLinks = {
  urbanDictionary: "https://www.urbandictionary.com/",
  idiotikon: "https://www.idiotikon.ch/",
  swissDialectsAtlas: "https://thor-project.ch/currentprojects_sdats/",
  kleinerSprachatlas: "https://www.kleinersprachatlas.ch/",
}

export default function AboutPage() {
  const t = useTranslations()

  return (
    <div className="mx-auto flex max-w-225 flex-col gap-6 py-8">
      <Card>
        <CardContent className="p-6 md:p-10">
          <h1 className="mb-8 text-3xl font-bold text-primary">
            {t("about.title")}
          </h1>

          {paragraphs.map((key) => {
            if (key === "paragraph3") {
              return (
                <p key={key} className="mb-6 text-[1.05rem] leading-[1.8]">
                  {t.rich("about.paragraph3", {
                    urbanDictionary: (chunks) => (
                      <ExternalLink href={externalLinks.urbanDictionary}>
                        {chunks}
                      </ExternalLink>
                    ),
                  })}
                </p>
              )
            }

            if (key === "paragraph4") {
              return (
                <p key={key} className="mb-6 text-[1.05rem] leading-[1.8]">
                  {t.rich("about.paragraph4", {
                    idiotikon: (chunks) => (
                      <ExternalLink href={externalLinks.idiotikon}>
                        {chunks}
                      </ExternalLink>
                    ),
                    swissDialectsAtlas: (chunks) => (
                      <ExternalLink href={externalLinks.swissDialectsAtlas}>
                        {chunks}
                      </ExternalLink>
                    ),
                    kleinerSprachatlas: (chunks) => (
                      <ExternalLink href={externalLinks.kleinerSprachatlas}>
                        {chunks}
                      </ExternalLink>
                    ),
                  })}
                </p>
              )
            }
            const text = t(`about.${key}`)

            if (key === "paragraph1") {
              return (
                <h2
                  key={key}
                  className="mb-6 text-xl font-semibold text-foreground italic"
                >
                  {text}
                </h2>
              )
            }

            if (key === "paragraph11") {
              return (
                <h3
                  key={key}
                  className="mt-8 text-lg font-semibold text-primary italic"
                >
                  {text}
                </h3>
              )
            }

            return (
              <p key={key} className="mb-6 text-[1.05rem] leading-[1.8]">
                {text}
              </p>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
