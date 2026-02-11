import dayjs from "dayjs"
import "dayjs/locale/de"
import "dayjs/locale/fr"

export const formatExpressionDate = ({
  date,
  locale = "de",
  format = "MMMM D, YYYY",
}: {
  date?: string | null
  locale?: string
  format?: string
}) => (date ? dayjs(date).locale(locale).format(format) : date)
