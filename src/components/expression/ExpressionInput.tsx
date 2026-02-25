"use client"

import type { FC } from "react"

import { useState, useEffect } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface ExpressionInputProps {
  value?: string
  onChange: (_value: string) => void
  label?: string
  disabled?: boolean
  className?: string
  required?: boolean
  error?: boolean
}

const ExpressionInput: FC<ExpressionInputProps> = ({
  value = "",
  onChange,
  label,
  disabled,
  className,
  required,
  error,
}) => {
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  useEffect(() => {
    const timeout = setTimeout(() => onChange(inputValue), 250)
    return () => clearTimeout(timeout)
  }, [inputValue, onChange])

  return (
    <div className={cn("flex flex-col gap-y-2", className)}>
      {label ? (
        <Label className={cn(error && "text-destructive")}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      ) : null}
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        autoComplete="off"
        maxLength={240}
        disabled={disabled}
        required={required}
      />
    </div>
  )
}

export default ExpressionInput
