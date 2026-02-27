import type { Language } from "@/generated/graphql"

import { getOptions, languages } from "@/components/ui/Autocomplete/helper"
import { allLetters } from "@/components/ui/Select/helper"

export const sanitizeCanton = (canton?: string): string | undefined => {
  const cantonsList = getOptions("canton").map((canton) => canton.code)
  return canton && cantonsList.includes(canton) ? canton : undefined
}

export const sanitizeCantons = (cantons: string[] = []): string[] => {
  const cantonsList = getOptions("canton").map((canton) => canton.code)
  return cantons.filter((canton) => cantonsList.includes(canton))
}

export const sanitizeFirstChar = (firstChar?: string): string | undefined =>
  firstChar && allLetters.includes(firstChar[0]) ? firstChar[0] : undefined

export const sanitizeLanguage = (language?: string): Language | undefined =>
  languages.includes(language as Language) ? (language as Language) : undefined
