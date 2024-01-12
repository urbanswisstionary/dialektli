import { parse as parseAcceptLang } from "accept-language-parser"

export const SUPPORTED_LANGUAGES = ["de", "en"] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]
export const DEFAULT_LANGUAGE: SupportedLanguage = SUPPORTED_LANGUAGES[0]

export const getUserLang = (acceptLanguageHeaderString: string) => {
  const acceptLang = parseAcceptLang(acceptLanguageHeaderString)
  return (acceptLang.find((l) =>
    SUPPORTED_LANGUAGES.includes(l.code as SupportedLanguage),
  )?.code ?? DEFAULT_LANGUAGE) as SupportedLanguage
}
