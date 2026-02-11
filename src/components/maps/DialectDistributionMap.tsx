"use client"

import { memo, useState, useCallback, useMemo } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
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
    <Box
      sx={{ width, position: "relative" }}
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
        <Box
          sx={{
            position: "fixed",
            left: mousePos.x + 12,
            top: mousePos.y + 12,
            bgcolor: "rgba(0, 0, 0, 0.85)",
            color: "white",
            px: 1.5,
            py: 0.75,
            borderRadius: 1,
            fontSize: "0.8rem",
            pointerEvents: "none",
            zIndex: 1200,
            lineHeight: 1.4,
            maxWidth: 200,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ fontSize: "0.8rem", fontWeight: 600, color: "inherit" }}
          >
            {getCantonName(hoveredCanton, locale)}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.85)" }}
          >
            {(cantonCounts[hoveredCanton] ?? 0) === 0
              ? locale === "de"
                ? "Keine Ausdr\u00fccke"
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
                      ? "Ausdr\u00fccke"
                      : locale === "fr"
                        ? "expressions"
                        : "expressions"
                }`}
          </Typography>
        </Box>
      )}

      {legendVisible && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.5,
            mt: 1,
            flexWrap: "wrap",
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mr: 0.5, fontSize: "0.7rem" }}
          >
            {locale === "de"
              ? "Dichte"
              : locale === "fr"
                ? "Densit\u00e9"
                : "Density"}
            :
          </Typography>
          {INTENSITY_COLORS.map((color, i) => (
            <Box
              key={color}
              sx={{ display: "flex", alignItems: "center", gap: 0.25 }}
            >
              <Box
                sx={{
                  width: 16,
                  height: 12,
                  bgcolor: color,
                  borderRadius: 0.5,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: "0.65rem" }}
              >
                {i < thresholds.length - 1
                  ? thresholds[i]
                  : `${thresholds[i]}+`}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
})

export default DialectDistributionMap
