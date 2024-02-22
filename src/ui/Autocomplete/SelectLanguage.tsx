import type { FC } from "react"
import FormControl from "@mui/joy/FormControl"
import { Locale, useRouter } from "next/router"
import Autocomplete from "@mui/joy/Autocomplete"
import { FormControlProps } from "@mui/joy/FormControl"
import SelectLocationOption from "./selectLocationOption"
import { useTranslation } from "next-i18next"
import LanguageIcon from "@mui/icons-material/Language"

type SelectLanguageProps = Omit<FormControlProps, "value" | "onChange">

const getFlagCode = (locale: Locale) => {
  if (locale === "en") return "gb"
  return locale
}
const SelectLanguage: FC<SelectLanguageProps> = (props) => {
  const router = useRouter()
  const { t } = useTranslation("common")

  const onChange = (locale: Locale) => {
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, asPath, { locale })
  }

  return (
    <FormControl {...props}>
      <Autocomplete
        size="sm"
        // autoHighlight
        options={router.locales}
        getOptionLabel={(locale) => t(`selectLanguage.${locale}`)}
        value={router.locale}
        onChange={(_e, locale) => {
          if (locale) onChange(locale)
        }}
        renderOption={(optionProps, locale) => (
          <SelectLocationOption
            {...optionProps}
            mode={"country"}
            label={t(`selectLanguage.${locale}`)}
            flagCode={getFlagCode(locale)}
          />
        )}
        startDecorator={<LanguageIcon />}
        openText={t("actions.open")}
        clearText={t("actions.clear")}
        closeText={t("actions.close")}
        disableClearable
        blurOnSelect
        slotProps={{ input: { sx: { cursor: "pointer" } } }}
      />
    </FormControl>
  )
}
export default SelectLanguage
