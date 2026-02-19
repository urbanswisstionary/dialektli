"use client"

import { type FC, useMemo } from "react"
import { ExpressionType } from "@/generated/graphql"
import { useTranslations } from "next-intl"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export const expressionTypes = Object.values(ExpressionType)

interface ExpressionTypeInputProps {
  value?: ExpressionType | null
  onChange?: (_type?: ExpressionType | null) => void
  label?: string
  helperText?: string
  disabled?: boolean
  className?: string
}

const ExpressionTypeInput: FC<ExpressionTypeInputProps> = ({
  value,
  onChange,
  label,
  helperText,
  disabled,
  className,
}) => {
  const t = useTranslations()
  const options = useMemo(
    () =>
      expressionTypes.map((type) => ({
        type,
        label: t(`expression.types.${type}.label`),
        description: t(`expression.types.${type}.description`),
      })),
    [t],
  )

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label>{label}</Label>}
      <Select
        disabled={disabled}
        value={value ?? undefined}
        onValueChange={(val) => {
          if (onChange) onChange(val as ExpressionType)
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a type" />
        </SelectTrigger>
        <SelectContent className="w-[var(--radix-select-trigger-width)] max-w-full">
          {options.map((option) => (
            <SelectItem key={option.type} value={option.type}>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">{option.label}</span>
                <span className="max-w-full text-xs text-muted-foreground whitespace-normal break-words">
                  {option.description}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {helperText && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
    </div>
  )
}

export default ExpressionTypeInput
