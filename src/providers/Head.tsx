import { FC } from "react"
import type { DefaultSeoProps } from "next-seo"
import { DefaultSeo, NextSeo } from "next-seo"
import { useTranslation } from "next-i18next"
import Head from "next/head"

const defailtHeadData = ({
  title,
  description,
  pagePathname,
  siteName,
}: {
  title: string
  description: string
  pagePathname: string
  siteName: string
}): DefaultSeoProps => ({
  title,
  description,
  openGraph: {
    type: "website",
    title,
    description,
    locale: "de",
    url: `https://dialektli.ch${pagePathname}`,
    siteName,
    images: [
      {
        url: "https://dialektli.ch/_next/static/media/image1_0.459a6483.jpg",
      },
    ],
  },
  canonical: `https://dialektli.ch${pagePathname}`,
  languageAlternates: [
    {
      hrefLang: "en",
      href: `https://dialektli.ch/en${pagePathname}`,
    },
    {
      hrefLang: "fr",
      href: `https://dialektli.ch/fr${pagePathname}`,
    },
  ],
})
const HeadProvider: FC<{
  title?: string | null
  description?: string | null
  pagePathname?: string
}> = ({ title, description, pagePathname }) => {
  const { t } = useTranslation("common")
  const meta = defailtHeadData({
    title: title ?? t("seo.title"),
    description: description ?? t("seo.description"),
    pagePathname: pagePathname ?? "/",
    siteName: t("seo.title"),
  })
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta key="desc" name="description" content={meta.description} />
        <meta
          name="keywords"
          content="dictionary, Swiss German, languag, translation, dialect, vocabulary, multilingual"
        />
        <meta name="author" content="Dialektli" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
        <meta property="og:locale" content="de_CH" />

        <meta property="og:type" content={meta.openGraph?.type} />
        <meta property="og:site_name" content={meta.openGraph?.siteName} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta
          property="og:image"
          content="https://dialektli.ch/_next/static/media/image1_0.459a6483.jpg"
        />
        <link rel="canonical" href={meta.canonical} />
      </Head>
      <DefaultSeo {...meta} />
    </>
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
