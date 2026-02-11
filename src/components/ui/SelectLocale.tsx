"use client"

import type { FC } from "react"
import FormControl from "@mui/material/FormControl"
import { FormControlProps } from "@mui/material/FormControl"
import { useTranslations, useLocale } from "next-intl"
import LanguageIcon from "@mui/icons-material/Language"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Tooltip from "@mui/material/Tooltip"
import Box from "@mui/material/Box"
import { useRouter, usePathname } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import Flag from "./Flag"

type Locale = (typeof routing.locales)[number]

interface SelectLocaleProps extends Omit<
  FormControlProps,
  "value" | "onChange"
> {
  compact?: boolean
}

const getFlagCode = (locale: string) => {
  if (locale === "en") return "gb"
  return locale
}

const SelectLocale: FC<SelectLocaleProps> = ({ compact, ...props }) => {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()
  const t = useTranslations()

  const onChange = (event: SelectChangeEvent<string>) => {
    const newLocale = event.target.value as Locale
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <FormControl {...props} size="small">
      <Tooltip title={t("selectLanguage.title")}>
        <Select
          size="small"
          value={currentLocale}
          onChange={onChange}
          startAdornment={compact ? undefined : <LanguageIcon sx={{ mr: 1 }} />}
          IconComponent={compact ? () => null : ArrowDropDownIcon}
          inputProps={{
            id: "select-locale",
            "aria-labelledby": "select-locale",
          }}
          name="select-locale"
          sx={
            compact
              ? {
                  "& .MuiSelect-select": {
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    pr: "8px !important",
                    py: 0.5,
                  },
                }
              : undefined
          }
        >
          {routing.locales.map((locale) => (
            <MenuItem key={locale} value={locale}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Flag mode="country" code={getFlagCode(locale)} />
                {compact ? locale.toUpperCase() : t(`selectLanguage.${locale}`)}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </Tooltip>
    </FormControl>
  )
}

export default SelectLocale
