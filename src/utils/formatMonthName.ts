export const formatMonthName = (
  monthIndex: number,
  {
    locale = "default",
    format = "long",
  }: {
    locale?: Intl.LocalesArgument
    format?: Intl.DateTimeFormatOptions["month"]
  },
) =>
  new Date(new Date().getFullYear(), monthIndex).toLocaleString(locale, {
    month: format,
  })
