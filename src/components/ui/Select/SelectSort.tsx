"use client"

import type { FC } from "react"

import { useTranslations } from "next-intl"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SortOption = "popularity" | "random"

type SelectSortProps = {
  value?: SortOption
  onChange?: (_value: SortOption) => void
  label?: string
  helperText?: string
  disabled?: boolean
}

const SelectSort: FC<SelectSortProps> = ({
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
        value={value}
        onValueChange={(val) =>
          onChange?.(val === "popularity" ? "popularity" : "random")
        }
        disabled={disabled}
      >
        <SelectTrigger aria-label={t("selectSort.title")}>
          <SelectValue placeholder={t("selectSort.title")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="random">{t("selectSort.random")}</SelectItem>
          <SelectItem value="popularity">
            {t("selectSort.popularity")}
          </SelectItem>
        </SelectContent>
      </Select>

      {helperText ? (
        <p className="mt-1 text-xs text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  )
}

export default SelectSort
