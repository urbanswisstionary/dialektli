import { Html, Head, Main, NextScript } from "next/document"
import { i18n } from "../../next-i18next.config"
export default function Document() {
  return (
    <Html lang={i18n.defaultLocale}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
