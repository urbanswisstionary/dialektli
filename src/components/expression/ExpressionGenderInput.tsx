"use client"

import type { FC } from "react"

import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
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
    <div className={cn("space-y-2 space-x-1", className)}>
      {label && <Label>{label}</Label>}
      <div className="inline-flex gap-1">
        {expressionGenders.map((gender) => (
          <Button
            key={gender}
            size="sm"
            variant={gender === value ? "default" : "outline"}
            disabled={disabled}
            onClick={() => {
              if (onChange) onChange(gender !== value ? gender : undefined)
            }}
          >
            {t(`expression.genders.${gender}`)}
          </Button>
        ))}
      </div>
      {helperText && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
    </div>
  )
}

export default ExpressionGenderInput
