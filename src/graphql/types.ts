import type { Session } from "next-auth"
import type { Locale } from "next/router"

export type Context = {
  session?: Session | null
  res: any
  lang: Locale
}
