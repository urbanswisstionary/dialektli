import dayjs from "dayjs"
import { Locale } from "next/router"
import { i18n } from "../../../next-i18next.config"

require("dayjs/locale/de")
require("dayjs/locale/fr")

export const formatExpressionDate = ({
  date,
  locale = i18n.defaultLocale,
  format = "ddd D MMM/YY",
}: {
  date: string
  locale?: Locale
  format?: string
}) => dayjs(date).locale(locale).format(format)
