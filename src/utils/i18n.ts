import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { i18n, defaultNS } from "../../next-i18next.config"

type Namcespace = typeof defaultNS
type NamcespaceExcludeCommon<T> = T extends "common" ? never : T

export const getStaticPropsTranslations = async (
  locale: string = i18n.defaultLocale,
  namespacesRequired?: NamcespaceExcludeCommon<Namcespace>,
) => ({
  ...(await serverSideTranslations(locale, [
    defaultNS,
    namespacesRequired ?? "",
  ])),
})

export const varifyTArray = (t: unknown) => (Array.isArray(t) ? t : [])
