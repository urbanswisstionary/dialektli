"use client"

import { useTranslations } from "next-intl"

import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  const t = useTranslations()

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
  ]

  return (
    <div className="mx-auto flex max-w-[900px] flex-col gap-6 py-8">
      <Card>
        <CardContent className="p-6 md:p-10">
          <h1 className="mb-8 text-3xl font-bold text-primary">
            {t("about.title")}
          </h1>

          {paragraphs.map((key) => {
            const text = t(`about.${key}` as any)

            if (key === "paragraph3") {
              return (
                <p key={key} className="mb-6 text-[1.05rem] leading-[1.8]">
                  Inspired by the spirit of community-driven platforms like{" "}
                  <a
                    href={t("about.externalLinks.urbanDictionary")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Urban Dictionary
                  </a>
                  , Dialektli embraces the grassroots nature of language
                  evolution. Users contribute their own unique expressions,
                  anecdotes, and linguistic insights.
                </p>
              )
            }

            if (key === "paragraph4") {
              return (
                <p key={key} className="mb-6 text-[1.05rem] leading-[1.8]">
                  We recognize that a language that remains solely oral risks
                  fading into obscurity over time, and draw motivation from the
                  meticulous documentation efforts like{" "}
                  <a
                    href={t("about.externalLinks.idiotikon")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Idiotikon
                  </a>
                  ,{" "}
                  <a
                    href={t("about.externalLinks.swissDialectsAtlas")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Swiss Dialects Atlas Project
                  </a>
                  , and{" "}
                  <a
                    href={t("about.externalLinks.kleinerSprachatlas")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Kleiner Sprachatlas der deutschen Schweiz
                  </a>
                  , which have long been dedicated to cataloguing and preserving
                  Swiss dialects and linguistic and cultural heritage.
                </p>
              )
            }

            if (key === "paragraph1") {
              return (
                <h2
                  key={key}
                  className="mb-6 text-xl font-semibold italic text-foreground"
                >
                  {text}
                </h2>
              )
            }

            if (key === "paragraph11") {
              return (
                <h3
                  key={key}
                  className="mt-8 text-lg font-semibold italic text-primary"
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
