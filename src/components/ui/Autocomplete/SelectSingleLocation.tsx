"use client"

import { type FC, useMemo, useState, useRef, useEffect } from "react"
import Flag from "@/components/ui/Flag"
import SelectLocationOption from "./SelectLocationOption"
import { getOptions } from "./helper"
import { useTranslations } from "next-intl"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SelectSingleLocationProps {
  value: string | null | undefined
  onChange: (_locationCode: string | null) => void
  mode: "canton" | "country"
  placeholder?: string
  helperText?: string
  label?: string
  groupOptions?: boolean
  disabled?: boolean
  className?: string
}

const SelectSingleLocation: FC<SelectSingleLocationProps> = ({
  value,
  onChange,
  mode,
  label,
  helperText,
  placeholder,
  groupOptions,
  disabled,
  className,
}) => {
  const t = useTranslations()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const options = useMemo(() => {
    const options = getOptions(mode)
    return groupOptions
      ? [...options].sort((a, b) =>
          !!a.language && !!b.language
            ? a.language.localeCompare(b.language)
            : !a.language || !b.language
              ? a.label.localeCompare(b.label)
              : 0,
        )
      : options
  }, [groupOptions, mode])

  const selectedOption = useMemo(
    () => options.find((c) => c.code === value) ?? null,
    [value, options],
  )

  const filtered = useMemo(
    () =>
      search
        ? options.filter((o) =>
            o.label.toLowerCase().includes(search.toLowerCase()),
          )
        : options,
    [options, search],
  )

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0)
    } else {
      setSearch("")
    }
  }, [open])

  if (!mode) return null

  return (
    <div className={className}>
      {label ? (
        <label className="mb-1 block text-sm font-medium">{label}</label>
      ) : null}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "flex h-9 w-full items-center gap-2 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
              "hover:bg-accent focus:outline-none focus:ring-1 focus:ring-ring",
              disabled && "cursor-not-allowed opacity-50",
              !selectedOption && "text-muted-foreground",
            )}
          >
            {selectedOption ? (
              <>
                <Flag mode={mode} code={selectedOption.code} />
                <span className="truncate text-foreground">
                  {selectedOption.label}
                </span>
              </>
            ) : (
              <span>
                {placeholder ?? t(`expression.${mode}FieldPlaceholder`)}
              </span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          <div className="p-2">
            <Input
              ref={inputRef}
              placeholder={t("actions.search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8"
            />
          </div>
          <div className="max-h-60 overflow-y-auto px-1 pb-1" role="listbox">
            {value && (
              <div
                role="option"
                aria-selected={false}
                onClick={() => {
                  onChange(null)
                  setOpen(false)
                }}
                className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent"
              >
                {t("actions.clear")}
              </div>
            )}
            {filtered.map((option) => (
              <SelectLocationOption
                key={option.code}
                mode={mode}
                label={option.label}
                flagCode={option.code}
                selected={option.code === value}
                onClick={() => {
                  onChange(option.code)
                  setOpen(false)
                }}
              />
            ))}
            {filtered.length === 0 && (
              <p className="px-2 py-4 text-center text-sm text-muted-foreground">
                {t("noData")}
              </p>
            )}
          </div>
        </PopoverContent>
      </Popover>
      {helperText ? (
        <p className="mt-1 text-xs text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  )
}

export default SelectSingleLocation
