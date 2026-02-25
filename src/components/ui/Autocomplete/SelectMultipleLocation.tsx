"use client"

import { useTranslations } from "next-intl"
import {
  type FC,
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react"

import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

import { type LocationOption, getOptions } from "./helper"
import SelectLocationOption from "./SelectLocationOption"
import SelectMultipleLocationTag from "./SelectMultipleLocationTag"

interface SelectMultipleLocationProps {
  value: string[] | null | undefined
  onChange: (_locationCode: string[] | null) => void
  mode: "canton" | "country"
  placeholder?: string
  helperText?: string
  label?: string
  limitTags?: number
  groupOptions?: boolean
  disabled?: boolean
  className?: string
}

const SelectMultipleLocation: FC<SelectMultipleLocationProps> = ({
  mode,
  placeholder,
  helperText,
  label,
  value,
  onChange,
  groupOptions,
  disabled,
  className,
}) => {
  const t = useTranslations()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [focusedIndex, setFocusedIndex] = useState(-1)
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
  }, [mode, groupOptions])

  const values = useMemo(
    () =>
      (value ?? []).map((code) =>
        options.find((o) => o.code === code),
      ) as LocationOption[],
    [options, value],
  )

  const filtered = useMemo(() => {
    const selectedCodes = new Set(value ?? [])
    const available = options.filter((o) => !selectedCodes.has(o.code))
    return search
      ? available.filter((o) =>
          o.label.toLowerCase().includes(search.toLowerCase()),
        )
      : available
  }, [options, value, search])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0)
      setFocusedIndex(-1)
    }
  }, [open])

  useEffect(() => {
    setFocusedIndex(-1)
  }, [search])

  useEffect(() => {
    if (focusedIndex >= 0) {
      document
        .getElementById(`location-option-multi-${focusedIndex}`)
        ?.scrollIntoView({ block: "nearest" })
    }
  }, [focusedIndex])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!open) return
      const totalItems = filtered.length
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setFocusedIndex((prev) => (prev + 1) % totalItems)
          break
        case "ArrowUp":
          e.preventDefault()
          setFocusedIndex((prev) => (prev - 1 + totalItems) % totalItems)
          break
        case "Enter": {
          e.preventDefault()
          if (focusedIndex === -1) break
          const option = filtered[focusedIndex]
          if (option) {
            toggleOption(option.code)
            // after selection the list shrinks by 1:
            // prefer the item before, fall back to the item after (same index), else no focus
            setFocusedIndex((prev) => {
              const newLength = filtered.length - 1
              if (newLength === 0) return -1
              return Math.max(0, prev - 1)
            })
          }
          break
        }
        case "Escape":
          e.preventDefault()
          setOpen(false)
          break
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [open, filtered, focusedIndex],
  )

  const toggleOption = (code: string) => {
    const current = value ?? []
    const isSelected = current.includes(code)
    const next = isSelected
      ? current.filter((c) => c !== code)
      : [...current, code].sort()
    onChange(next.length ? next : null)
  }

  const removeOption = (code: string) => {
    const next = (value ?? []).filter((c) => c !== code)
    onChange(next.length ? next : null)
  }

  return (
    <div className={className}>
      {label ? (
        <label className="mb-1 block text-sm font-medium">{label}</label>
      ) : null}
      {values.length > 0 && (
        <div className="mb-1.5 flex flex-wrap gap-1">
          {values.map((option) => (
            <SelectMultipleLocationTag
              key={option.code}
              option={option}
              mode={mode}
              onRemove={() => removeOption(option.code)}
            />
          ))}
        </div>
      )}
      <Popover
        open={open}
        onOpenChange={(o) => {
          setOpen(o)
          if (!o) setSearch("")
        }}
      >
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "flex h-9 w-full items-center rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
              "hover:bg-accent focus:outline-none focus:ring-1 focus:ring-ring",
              disabled && "cursor-not-allowed opacity-50",
              "text-muted-foreground",
            )}
          >
            {placeholder ?? t(`expression.${mode}FieldPlaceholder`)}
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-(--radix-popover-trigger-width) p-0"
          align="start"
        >
          <div className="p-2">
            <Input
              ref={inputRef}
              placeholder={t("actions.search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-8"
              aria-activedescendant={
                focusedIndex >= 0
                  ? `location-option-multi-${focusedIndex}`
                  : undefined
              }
            />
          </div>
          <div className="max-h-60 overflow-y-auto px-1 pb-1" role="listbox">
            {filtered.map((option, i) => (
              <SelectLocationOption
                key={option.code}
                id={`location-option-multi-${i}`}
                mode={mode}
                label={option.label}
                flagCode={option.code}
                selected={false}
                focused={focusedIndex === i}
                onClick={() => toggleOption(option.code)}
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

export default SelectMultipleLocation
