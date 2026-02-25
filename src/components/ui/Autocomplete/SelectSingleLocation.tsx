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

import Flag from "@/components/ui/Flag"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

import { getOptions } from "./helper"
import SelectLocationOption from "./SelectLocationOption"

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
    }
  }, [open])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFocusedIndex(-1)
  }, [search])

  useEffect(() => {
    if (focusedIndex >= 0) {
      document
        .getElementById(`location-option-single-${focusedIndex}`)
        ?.scrollIntoView({ block: "nearest" })
    }
  }, [focusedIndex])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!open) return
      // account for the "clear" option prepended when value is set
      const hasClear = !!value
      const totalItems = filtered.length + (hasClear ? 1 : 0)
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
          if (hasClear && focusedIndex === 0) {
            setOpen(false)
            setTimeout(() => {
              onChange(null)
              setSearch("")
            }, 0)
          } else {
            const optionIndex = hasClear ? focusedIndex - 1 : focusedIndex
            const option = filtered[optionIndex]
            if (option) {
              setOpen(false)
              setTimeout(() => {
                onChange(option.code)
                setSearch("")
              }, 0)
            }
          }
          break
        }
        case "Escape":
          e.preventDefault()
          setOpen(false)
          break
      }
    },
    [open, value, filtered, focusedIndex, onChange],
  )

  if (!mode) return null

  return (
    <div className={className}>
      {label ? (
        <label className="mb-1 block text-sm font-medium">{label}</label>
      ) : null}
      <Popover
        open={open}
        onOpenChange={(o) => {
          setOpen(o)
          if (o) setFocusedIndex(-1)
          if (!o) setSearch("")
        }}
      >
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
                  ? `location-option-single-${focusedIndex}`
                  : undefined
              }
            />
          </div>
          <div className="max-h-60 overflow-y-auto px-1 pb-1" role="listbox">
            {value && (
              <div
                id="location-option-single-0"
                role="option"
                aria-selected={false}
                onClick={() => {
                  setOpen(false)
                  onChange(null)
                  setSearch("")
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setOpen(false)
                    onChange(null)
                    setSearch("")
                  }
                }}
                className={cn(
                  "flex cursor-pointer items-center rounded-sm px-2 py-1.5 my-1 text-sm text-muted-foreground hover:bg-accent",
                  focusedIndex === 0 &&
                    "bg-accent outline-none ring-1 ring-ring",
                )}
              >
                {t("actions.clear")}
              </div>
            )}
            {filtered.map((option, i) => {
              const idx = value ? i + 1 : i
              return (
                <SelectLocationOption
                  key={option.code}
                  id={`location-option-single-${idx}`}
                  mode={mode}
                  label={option.label}
                  flagCode={option.code}
                  selected={option.code === value}
                  focused={focusedIndex === idx}
                  onClick={() => {
                    setOpen(false)
                    onChange(option.code)
                    setSearch("")
                  }}
                />
              )
            })}
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
