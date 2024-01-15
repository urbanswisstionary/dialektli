import { FC } from "react"
import Head from "next/head"

const defailtHeadData = {
  name: "Urbanswisstionary",
  short_name: "urbanswisstionary",
  description:
    "It's a place to share current (colloquial) Swiss German words, sayings, phrases, that sort of thing",
}
const HeadProvider: FC = () => (
  <Head>
    <title>{defailtHeadData.name}</title>
    <link rel="manifest" href="/manifest.json" />
    <link rel="apple-touch-icon" href="/icon.png"></link>
    <meta name="theme-color" content="#13131866" />
    <meta name="apple-mobile-web-app-status-bar" content="#13131866" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="description" content={defailtHeadData.description} />
    <meta property="og:title" content={defailtHeadData.name} />
    <meta property="og:description" content={defailtHeadData.description} />
  </Head>
)

export default HeadProvider
