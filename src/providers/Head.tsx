import { FC } from "react"
import Head from "next/head"
import type { DefaultSeoProps } from "next-seo"
import { DefaultSeo } from "next-seo"
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
    url: "https://urbanswisstionary.vercel.app/",
    siteName: title,
    images: [
      {
        url: "https://urbanswisstionary.vercel.app/_next/static/media/image1_0.459a6483.jpg",
      },
    ],
  },
  canonical: "https://urbanswisstionary.vercel.app/",
  languageAlternates: [
    {
      hrefLang: "en",
      href: "https://urbanswisstionary.vercel.app/en",
    },
    {
      hrefLang: "fr",
      href: "https://urbanswisstionary.vercel.app/fr",
    },
  ],
})
const HeadProvider: FC = () => {
  const { t } = useTranslation("common", { keyPrefix: "seo" })
  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#13131866" />
        <meta name="apple-mobile-web-app-status-bar" content="#13131866" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
      <DefaultSeo
        {...defailtHeadData({
          title: t("title"),
          description: t("description"),
        })}
      />
    </>
  )
}

export default HeadProvider
