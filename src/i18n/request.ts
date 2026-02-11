import { getRequestConfig } from "next-intl/server"
import { hasLocale } from "next-intl"
import { routing } from "./routing"

export const locales = ["de", "en", "fr"] as const

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale

  const localeMessages = (await import(`../../messages/${locale}.json`)).default
  const defaultMessages = (
    await import(`../../messages/${routing.defaultLocale}.json`)
  ).default
  return {
    locale,
    messages: { ...defaultMessages, ...localeMessages },
  }
})
