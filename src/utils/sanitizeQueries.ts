import { exampleMaxLength } from "@/features/expression/expressionExampleInput"
import { expressionGenders } from "@/features/expression/expressionGenderInput"
import { expressionTypes } from "@/features/expression/expressionTypeInput"
import { getOptions, languages } from "@/ui/Autocomplete/helper"
import { allLetters } from "@/ui/Select/helper"
import type {
  ExpressionGender,
  ExpressionType,
  Language,
} from "@@/generated/graphql"

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

export const sanitizeLanguage = (language?: string): Language | null =>
  languages.includes(language as Language) ? (language as Language) : null

export const sanitizeExample = (examples?: string): string =>
  (examples ?? "").substring(0, exampleMaxLength)

export const sanitizeGender = (g?: string): ExpressionGender | undefined => {
  const gender = g?.toUpperCase() as ExpressionGender
  if (gender && expressionGenders.includes(gender)) return gender
}

export const sanitizeType = (t?: string): ExpressionType | undefined => {
  const type = t?.toUpperCase() as ExpressionType
  if (type && expressionTypes.includes(type)) return type
}
