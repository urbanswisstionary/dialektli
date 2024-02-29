import { getOptions } from "@/ui/Autocomplete/helper"
import { allLetters } from "@/ui/Select/helper"
import { Language } from "@@/generated/graphql"

export const sanitizeCanton = (canton?: string): string | undefined => {
  const cantonsList = getOptions("canton").map((canton) => canton.code)
  return canton && cantonsList.includes(canton) ? canton : undefined
}

export const sanitizeCantons = (cantons: string[] = []): string[] => {
  const cantonsList = getOptions("canton").map((canton) => canton.code)
  return cantons.filter((canton) => cantonsList.includes(canton))
}

export const sanitizeExamples = (examples: string[] = [""]): string[] =>
  examples.slice(0, 3)

export const sanitizeFirstChar = (firstChar?: string): string | undefined =>
  firstChar && allLetters.includes(firstChar[0]) ? firstChar[0] : undefined

export const sanitizeLanguage = (language?: string): Language | null =>
  Object.values(Language).includes(language as Language)
    ? (language as Language)
    : null
