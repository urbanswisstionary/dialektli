import { parse as parseAcceptLang } from "accept-language-parser"
import { i18n } from "../../next-i18next.config"
import { Locale } from "next/router"

export const SUPPORTED_LANGUAGES = i18n.locales
export const DEFAULT_LANGUAGE = i18n.defaultLocale

export const getUserLang = (acceptLanguageHeaderString: string) => {
  const acceptLang = parseAcceptLang(acceptLanguageHeaderString)
  return (acceptLang.find((l) => SUPPORTED_LANGUAGES.includes(l.code as Locale))
    ?.code ?? DEFAULT_LANGUAGE) as Locale
}
