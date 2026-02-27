"use client"

import type { FC } from "react"

import { useTranslations } from "next-intl"

import type { Language } from "@/generated/graphql"

import { languages } from "@/components/ui/Autocomplete/helper"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { sanitizeLanguage } from "@/utils/sanitizeQueries"

interface SelectLanguageProps {
  value?: Language
  onChange?: (_value?: Language) => void
  label?: string
  helperText?: string
  disabled?: boolean
}

const SelectLanguage: FC<SelectLanguageProps> = ({
  value,
  onChange,
  label,
  helperText,
  disabled,
}) => {
  const t = useTranslations()
  return (
    <div className="w-full flex flex-col gap-y-2">
      {label ? (
        <label className="mb-1 block text-sm font-medium">{label}</label>
      ) : null}

      <Select
        value={value ?? "all"}
        onValueChange={(val) => onChange?.(sanitizeLanguage(val))}
        disabled={disabled}
      >
        <SelectTrigger aria-label={t("filterBy.language")}>
          <SelectValue placeholder={t("filterBy.language")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("selectLanguage.all")}</SelectItem>
          {languages.map((l) => (
            <SelectItem key={l} value={l}>
              {t(`selectLanguage.${l}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {helperText ? (
        <p className="mt-1 text-xs text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  )
}

export default SelectLanguage
