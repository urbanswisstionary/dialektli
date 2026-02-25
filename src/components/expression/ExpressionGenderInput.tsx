"use client"

import type { FC } from "react"

import { useTranslations } from "next-intl"

import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { ExpressionGender } from "@/generated/graphql"
import { cn } from "@/lib/utils"

export const expressionGenders = Object.values(ExpressionGender)

interface ExpressionGenderInputProps {
  value?: ExpressionGender | null
  onChange?: (_gender?: ExpressionGender) => void
  label?: string
  helperText?: string
  disabled?: boolean
  className?: string
}

const ExpressionGenderInput: FC<ExpressionGenderInputProps> = ({
  value,
  onChange,
  label,
  helperText,
  disabled,
  className,
}) => {
  const t = useTranslations()

  return (
    <div className={cn("flex flex-col gap-y-2", className)}>
      {label && <Label>{label}</Label>}
      <ToggleGroup
        type="single"
        value={value ?? ""}
        onValueChange={(val) => {
          if (onChange) onChange(val ? (val as ExpressionGender) : undefined)
        }}
        disabled={disabled}
        className="w-fit"
      >
        {expressionGenders.map((gender) => (
          <ToggleGroupItem key={gender} value={gender}>
            {t(`expression.genders.${gender}`)}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      {helperText ||
        (!helperText && (
          <p className="text-sm text-muted-foreground">{"helperText"}</p>
        ))}
    </div>
  )
}

export default ExpressionGenderInput
