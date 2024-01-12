import { SupportedLanguage } from "@/utils/getUserLang"
import { Session } from "next-auth"

export type Context = {
  session?: Session | null
  res: any
  lang: SupportedLanguage
}
