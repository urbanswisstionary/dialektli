import type { FC } from "react"
import FormControl from "@mui/joy/FormControl"
import { Locale, useRouter } from "next/router"
import { FormControlProps } from "@mui/joy/FormControl"
import { useTranslation } from "next-i18next"
import LanguageIcon from "@mui/icons-material/Language"

import ListItemDecorator from "@mui/joy/ListItemDecorator"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import Select from "@mui/joy/Select"
import Option from "@mui/joy/Option"
import { Tooltip } from "@mui/joy"
import Flag from "../Flag"

type SelectLanguageProps = Omit<FormControlProps, "value" | "onChange">

const getFlagCode = (locale: Locale) => {
  if (locale === "en") return "gb"
  return locale
}
const SelectLanguage: FC<SelectLanguageProps> = (props) => {
  const router = useRouter()
  const { t } = useTranslation("common")

  const onChange = (locale: Locale | null) => {
    if (!locale) return
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, asPath, { locale })
  }

  return (
    <FormControl {...props}>
      <Tooltip title={t("selectLanguage.title")}>
        <Select
          size="sm"
          value={router.locale}
          startDecorator={<LanguageIcon />}
          indicator={<ArrowDropDownIcon sx={{ p: 0.5, opacity: 0.7 }} />}
          slotProps={{
            button: {
              id: "select-language",
              "aria-labelledby": "select-language",
            },
          }}
          onChange={(_e, locale) => onChange(locale)}
          name="select-language"
        >
          {router.locales.map((locale) => (
            <Option key={locale} value={locale}>
              <ListItemDecorator>
                <Flag mode="country" code={getFlagCode(locale)} />
              </ListItemDecorator>
              {t(`selectLanguage.${locale}`)}
            </Option>
          ))}
        </Select>
      </Tooltip>
    </FormControl>
  )
}
export default SelectLanguage
