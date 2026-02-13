"use client"

import { memo, useState, useCallback, useMemo } from "react"
import { SwitzerlandMap } from "./SwitzerlandMap"
import { getCantonName } from "@/config/cantons"

export interface DialectDistributionMapProps {
  /** Canton IDs that are highlighted (e.g., expression's cantons) */
  highlightedCantons: string[]
  /** Optional: canton expression counts for density coloring. Map of cantonId -> count */
  cantonCounts?: Record<string, number>
  /** Handler when a canton is clicked */
  onCantonClick?: (cantonId: string) => void
  /** Locale for canton names */
  locale?: "de" | "fr" | "it" | "en"
  /** Map height */
  height?: number | string
  /** Map width */
  width?: number | string
  /** Show density legend */
  showLegend?: boolean
  /** Compact mode (smaller, no legend, for card embeds) */
  compact?: boolean
}

const INTENSITY_COLORS = [
  "#BBDEFB",
  "#64B5F6",
  "#42A5F5",
  "#1E88E5",
  "#1565C0",
] as const

const EMPTY_COLOR = "#E8EAF6"

function computeDensityColors(cantonCounts: Record<string, number>): {
  cantonColors: Record<string, string>
  thresholds: number[]
} {
  const counts = Object.values(cantonCounts).filter((c) => c > 0)
  if (counts.length === 0) {
    return { cantonColors: {}, thresholds: [1, 2, 5, 10, 20] }
  }

  const maxCount = Math.max(...counts)

  let thresholds: number[]
  if (maxCount <= 5) {
    thresholds = [1, 2, 3, 4, 5]
  } else if (maxCount <= 20) {
    thresholds = [1, 3, 5, 10, 20]
  } else {
    thresholds = [
      1,
      Math.round(maxCount * 0.15),
      Math.round(maxCount * 0.35),
      Math.round(maxCount * 0.6),
      maxCount,
    ]
  }
  thresholds = [...new Set(thresholds)].sort((a, b) => a - b)
  while (thresholds.length < 5) {
    thresholds.push(thresholds[thresholds.length - 1] + 1)
  }

  const cantonColors: Record<string, string> = {}
  for (const [canton, count] of Object.entries(cantonCounts)) {
    if (count <= 0) {
      cantonColors[canton] = EMPTY_COLOR
      continue
    }
    let level = 0
    for (let i = 0; i < thresholds.length; i++) {
      if (count >= thresholds[i]) level = i
    }
    cantonColors[canton] = INTENSITY_COLORS[level]
  }

  return { cantonColors, thresholds }
}

const DialectDistributionMap = memo(function DialectDistributionMap({
  highlightedCantons,
  cantonCounts,
  onCantonClick,
  locale = "de",
  height = 400,
  width = "100%",
  showLegend = true,
  compact = false,
}: DialectDistributionMapProps) {
  const [hoveredCanton, setHoveredCanton] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const { cantonColors, thresholds } = useMemo(() => {
    if (!cantonCounts) return { cantonColors: undefined, thresholds: [] }
    return computeDensityColors(cantonCounts)
  }, [cantonCounts])

  const handleCantonHover = useCallback((cantonId: string | null) => {
    setHoveredCanton(cantonId)
  }, [])

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    setMousePos({ x: event.clientX, y: event.clientY })
  }, [])

  const effectiveHighlighted = useMemo(() => {
    if (!cantonCounts) return highlightedCantons
    return Object.entries(cantonCounts)
      .filter(([, count]) => count > 0)
      .map(([canton]) => canton)
  }, [cantonCounts, highlightedCantons])

  const legendVisible =
    showLegend && !compact && cantonCounts && thresholds.length > 0

  return (
    <div
      className="relative"
      style={{ width }}
      onMouseMove={cantonCounts ? handleMouseMove : undefined}
    >
      <SwitzerlandMap
        highlightedCantons={effectiveHighlighted}
        cantonColors={cantonColors}
        onCantonClick={onCantonClick}
        onCantonHover={cantonCounts ? handleCantonHover : undefined}
        locale={locale}
        showLabels={false}
        showAttribution={!compact}
        height={height}
        width={width}
        strokeColor="#FFFFFF"
        strokeWidth={compact ? 1 : 1.5}
      />

      {cantonCounts && hoveredCanton && (
        <div
          className="pointer-events-none fixed z-[1200] max-w-[200px] rounded bg-black/85 px-1.5 py-0.75 text-[0.8rem] leading-snug text-white"
          style={{
            left: mousePos.x + 12,
            top: mousePos.y + 12,
          }}
        >
          <span className="block text-[0.8rem] font-semibold">
            {getCantonName(hoveredCanton, locale)}
          </span>
          <span className="block text-[0.75rem] text-white/85">
            {(cantonCounts[hoveredCanton] ?? 0) === 0
              ? locale === "de"
                ? "Keine Ausdrücke"
                : locale === "fr"
                  ? "Aucune expression"
                  : "No expressions"
              : `${cantonCounts[hoveredCanton]} ${
                  cantonCounts[hoveredCanton] === 1
                    ? locale === "de"
                      ? "Ausdruck"
                      : locale === "fr"
                        ? "expression"
                        : "expression"
                    : locale === "de"
                      ? "Ausdrücke"
                      : locale === "fr"
                        ? "expressions"
                        : "expressions"
                }`}
          </span>
        </div>
      )}

      {legendVisible && (
        <div className="mt-1 flex flex-wrap items-center justify-center gap-0.5">
          <span className="mr-0.5 text-[0.7rem] text-muted-foreground">
            {locale === "de"
              ? "Dichte"
              : locale === "fr"
                ? "Densité"
                : "Density"}
            :
          </span>
          {INTENSITY_COLORS.map((color, i) => (
            <div key={color} className="flex items-center gap-0.5">
              <div
                className="h-3 w-4 rounded-sm border border-border"
                style={{ backgroundColor: color }}
              />
              <span className="text-[0.65rem] text-muted-foreground">
                {i < thresholds.length - 1
                  ? thresholds[i]
                  : `${thresholds[i]}+`}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
})

export default DialectDistributionMap
