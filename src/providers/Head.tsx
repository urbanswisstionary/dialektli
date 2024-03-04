import { FC } from "react"
import type { DefaultSeoProps } from "next-seo"
import { DefaultSeo, NextSeo } from "next-seo"
import { useTranslation } from "next-i18next"

const defailtHeadData = ({
  title,
  description,
}: {
  title: string
  description: string
}): DefaultSeoProps => ({
  title,
  description,
  openGraph: {
    type: "website",
    title,
    description,
    locale: "de",
    url: "https://dialektli.ch/",
    siteName: title,
    images: [
      {
        url: "https://dialektli.ch/_next/static/media/image1_0.459a6483.jpg",
      },
    ],
  },
  canonical: "https://dialektli.ch/",
  languageAlternates: [
    {
      hrefLang: "en",
      href: "https://dialektli.ch/en",
    },
    {
      hrefLang: "fr",
      href: "https://dialektli.ch/fr",
    },
  ],
})
const HeadProvider: FC = () => {
  const { t } = useTranslation("common", { keyPrefix: "seo" })
  return (
    <DefaultSeo
      {...defailtHeadData({
        title: t("title"),
        description: t("description"),
      })}
    />
  )
}

export default HeadProvider

export const NoSEO: FC = () => (
  <NextSeo
    noindex
    nofollow
    robotsProps={{
      nosnippet: true,
      notranslate: true,
      noimageindex: true,
      noarchive: true,
      maxSnippet: -1,
      maxImagePreview: "none",
      maxVideoPreview: -1,
    }}
  />
)
