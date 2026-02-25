"use client"

import { useTranslations } from "next-intl"

import CantonBadge from "@/components/ui/CantonBadge"

interface CantonTooltipProps {
  name: string
  abbreviation: string
  expressionCount: number
  x: number
  y: number
}

export function CantonTooltip({
  name,
  abbreviation,
  expressionCount,
  x,
  y,
}: CantonTooltipProps) {
  const t = useTranslations("sprachatlas")

  return (
    <div
      className="pointer-events-none absolute z-50 rounded-lg border border-border bg-popover px-3 py-2 shadow-lg"
      style={{
        left: x + 14,
        top: y - 40,
        transform: "translateY(-50%)",
      }}
    >
      <div className="flex items-center gap-2">
        <CantonBadge
          code={abbreviation}
          className="border-primary/30 bg-primary/10 text-xs font-bold text-primary"
        />
        <span className="text-sm font-medium text-popover-foreground">
          {name}
        </span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        {expressionCount}{" "}
        {expressionCount === 1
          ? t("expressionSingular")
          : t("expressionPlural")}
      </p>
    </div>
  )
}
