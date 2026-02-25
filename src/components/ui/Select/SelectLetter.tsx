"use client"

import type { FC } from "react"

import { cn } from "@/lib/utils"

import { allLetters } from "./helper"

interface SelectLetterProps {
  value?: string
  onChange?: (_value: string) => void
  label?: string
  helperText?: string
  disabled?: boolean
}

const SelectLetter: FC<SelectLetterProps> = ({
  value,
  onChange,
  label,
  helperText,
  disabled,
}) => {
  return (
    <div>
      {label ? (
        <label className="mb-1 block text-sm font-medium">{label}</label>
      ) : null}
      <div className="flex flex-wrap gap-1">
        {allLetters.map((letter, i) => (
          <button
            key={i}
            type="button"
            aria-label={letter}
            onClick={() => {
              if (onChange) onChange(letter)
            }}
            disabled={disabled}
            className={cn(
              "flex w-[4ch] items-center justify-center rounded-md border px-2 py-1 text-sm shadow-sm transition-colors",
              value?.toUpperCase() === letter
                ? "border-primary bg-primary/10 font-medium"
                : "border-border bg-card hover:bg-accent",
              disabled && "pointer-events-none opacity-50",
            )}
          >
            {letter}
          </button>
        ))}
      </div>
      {helperText ? (
        <p className="mt-1 text-xs text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  )
}

export default SelectLetter
