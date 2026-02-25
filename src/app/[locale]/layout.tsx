import type { Metadata } from "next"
import type { ReactNode } from "react"

import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { Roboto } from "next/font/google"
import { notFound } from "next/navigation"

import Layout from "@/components/layout/Layout"
import ApolloProvider from "@/components/providers/ApolloProvider"
import SessionProvider from "@/components/providers/SessionProvider"
import ThemeProvider from "@/components/providers/ThemeProvider"
import { cn } from "@/lib/utils"
import "@/app/globals.css"
import { locales } from "../../i18n/request"

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://dialektli.ch"),
  title: {
    default: "Dialektli - Swiss Dialect Dictionary",
    template: "%s | Dialektli",
  },
  description:
    "Dialektli is a community-run dictionary for Swiss slang and dialects. It is a place where language is given a little more space to be freely explored and constructed in the moment.",
  keywords: [
    "Swiss German",
    "Swiss dialects",
    "Schweizerdeutsch",
    "Swiss expressions",
    "Swiss slang",
    "dialect dictionary",
  ],
  authors: [{ name: "Dialektli" }],
  openGraph: {
    type: "website",
    siteName: "Dialektli",
    title: "Dialektli - Swiss Dialect Dictionary",
    description:
      "Community-driven platform for Swiss expressions, words, and idioms",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dialektli - Swiss Dialect Dictionary",
    description:
      "Community-driven platform for Swiss expressions, words, and idioms",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!locales.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={cn(roboto.variable, "scroll-smooth")}
      suppressHydrationWarning
    >
      <body>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ApolloProvider>
              <NextIntlClientProvider messages={messages}>
                <Layout>{children}</Layout>
              </NextIntlClientProvider>
            </ApolloProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
