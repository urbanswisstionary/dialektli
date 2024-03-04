import { Html, Head, Main, NextScript } from "next/document"
import { i18n } from "../../next-i18next.config"
import { GoogleTagManager } from "@next/third-parties/google"

const { GOOGLE_TAG_MANAGER_ID = "" } = process.env

export default function Document() {
  return (
    <Html lang={i18n.defaultLocale}>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
      <GoogleTagManager gtmId={GOOGLE_TAG_MANAGER_ID} />
    </Html>
  )
}
