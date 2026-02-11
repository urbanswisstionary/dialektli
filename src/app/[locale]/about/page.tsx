"use client"

import { useTranslations } from "next-intl"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Link from "@mui/material/Link"

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
    <Stack spacing={3} sx={{ py: 4, maxWidth: "900px", mx: "auto" }}>
      <Card elevation={2}>
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              mb: 4,
              fontWeight: 700,
              color: "primary.main",
            }}
          >
            {t("about.title")}
          </Typography>

          {paragraphs.map((key) => {
            const text = t(`about.${key}` as any)

            if (key === "paragraph3") {
              return (
                <Typography
                  key={key}
                  variant="body1"
                  paragraph
                  sx={{ lineHeight: 1.8, mb: 3, fontSize: "1.05rem" }}
                >
                  Inspired by the spirit of community-driven platforms like{" "}
                  <Link
                    href={t("about.externalLinks.urbanDictionary")}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ fontWeight: 500 }}
                  >
                    Urban Dictionary
                  </Link>
                  , Dialektli embraces the grassroots nature of language
                  evolution. Users contribute their own unique expressions,
                  anecdotes, and linguistic insights.
                </Typography>
              )
            }

            if (key === "paragraph4") {
              return (
                <Typography
                  key={key}
                  variant="body1"
                  paragraph
                  sx={{ lineHeight: 1.8, mb: 3, fontSize: "1.05rem" }}
                >
                  We recognize that a language that remains solely oral risks
                  fading into obscurity over time, and draw motivation from the
                  meticulous documentation efforts like{" "}
                  <Link
                    href={t("about.externalLinks.idiotikon")}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ fontWeight: 500 }}
                  >
                    Idiotikon
                  </Link>
                  ,{" "}
                  <Link
                    href={t("about.externalLinks.swissDialectsAtlas")}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ fontWeight: 500 }}
                  >
                    Swiss Dialects Atlas Project
                  </Link>
                  , and{" "}
                  <Link
                    href={t("about.externalLinks.kleinerSprachatlas")}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ fontWeight: 500 }}
                  >
                    Kleiner Sprachatlas der deutschen Schweiz
                  </Link>
                  , which have long been dedicated to cataloguing and preserving
                  Swiss dialects and linguistic and cultural heritage.
                </Typography>
              )
            }

            if (key === "paragraph1") {
              return (
                <Typography
                  key={key}
                  variant="h5"
                  sx={{
                    mb: 3,
                    fontWeight: 600,
                    color: "text.primary",
                    fontStyle: "italic",
                  }}
                >
                  {text}
                </Typography>
              )
            }

            if (key === "paragraph11") {
              return (
                <Typography
                  key={key}
                  variant="h6"
                  sx={{
                    mt: 4,
                    fontWeight: 600,
                    color: "primary.main",
                    fontStyle: "italic",
                  }}
                >
                  {text}
                </Typography>
              )
            }

            return (
              <Typography
                key={key}
                variant="body1"
                paragraph
                sx={{ lineHeight: 1.8, mb: 3, fontSize: "1.05rem" }}
              >
                {text}
              </Typography>
            )
          })}
        </CardContent>
      </Card>
    </Stack>
  )
}
