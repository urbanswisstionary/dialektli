"use client"

import type { FC } from "react"

import DebouncedTextarea from "@/components/ui/DebouncedTextarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface ExpressionDefinitionInputProps {
  value?: string
  onChange: (_value: string) => void
  label?: string
  disabled?: boolean
  className?: string
  required?: boolean
  error?: boolean
}

const ExpressionDefinitionInput: FC<ExpressionDefinitionInputProps> = ({
  value = "",
  onChange,
  label,
  disabled,
  className,
  required,
  error,
}) => (
  <div className={cn("space-y-2", className)}>
    {label ? (
      <Label className={cn(error && "text-destructive")}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
    ) : null}
    <DebouncedTextarea
      value={value}
      onChange={(value) => onChange(value)}
      disabled={disabled}
      className="resize-y min-h-25 max-h-50"
    />
  </div>
)

export default ExpressionDefinitionInput
