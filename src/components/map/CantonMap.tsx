"use client"

import { useState, useMemo, useRef, useCallback, useEffect } from "react"
import useSWR from "swr"
import {
  type CantonPathData,
  computeCentroidFromPath,
  computeBoundingBox,
} from "@/lib/canton-utils"
import { getCantonName, CANTON_COLORS } from "@/config/cantons"
import { CantonTooltip } from "./CantonTooltip"
import { Skeleton } from "@/components/ui/skeleton"
import { useLocale, useTranslations } from "next-intl"

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to load canton data")
    return res.json()
  })

const CANTON_LABEL_OFFSETS: Record<string, { dx: number; dy: number }> = {
  AI: { dx: 32, dy: -28 },
  AR: { dx: 38, dy: -12 },
  BS: { dx: -32, dy: -22 },
  NW: { dx: -32, dy: 12 },
  OW: { dx: -38, dy: 2 },
  ZG: { dx: -30, dy: 22 },
  GL: { dx: 32, dy: 22 },
  SH: { dx: 0, dy: -32 },
}

interface CantonMapProps {
  highlightedCantons?: string[]
  selectedCanton?: string | null
  onCantonClick?: (cantonId: string) => void
  counts?: Record<string, number>
}

export function CantonMap({
  highlightedCantons,
  selectedCanton = null,
  onCantonClick,
  counts = {},
}: CantonMapProps) {
  const locale = useLocale() as "de" | "fr" | "it" | "en"
  const t = useTranslations("sprachatlas")
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredCanton, setHoveredCanton] = useState<string | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains("dark"))
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [])

  const {
    data: rawCantons,
    isLoading,
    error,
  } = useSWR<CantonPathData[]>("/swiss-cantons.json", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 86400000,
  })

  const cantons = useMemo(() => {
    if (!rawCantons) return []
    return rawCantons.map((c) => {
      const centroid = computeCentroidFromPath(c.paths[0])
      return { ...c, centroid }
    })
  }, [rawCantons])

  const maxCount = useMemo(
    () => Math.max(...Object.values(counts), 1),
    [counts],
  )

  const viewBox = useMemo(() => {
    if (cantons.length === 0) return "0 0 1000 800"
    const bb = computeBoundingBox(cantons)
    const pad = 50
    return `${bb.minX - pad} ${bb.minY - pad} ${bb.maxX - bb.minX + pad * 2} ${bb.maxY - bb.minY + pad * 2}`
  }, [cantons])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  const hasHighlights = highlightedCantons && highlightedCantons.length > 0

  const getCantonFill = useCallback(
    (cantonId: string) => {
      const count = counts[cantonId] || 0
      const isSelected = selectedCanton === cantonId
      const isHovered = hoveredCanton === cantonId
      const isHighlighted = hasHighlights
        ? highlightedCantons!.some(
            (id) => id.toUpperCase() === cantonId.toUpperCase(),
          )
        : true

      const hex = CANTON_COLORS[cantonId] ?? "#6B7280"

      if (isDark) {
        if (isSelected) return isHovered ? hex + "CC" : hex + "B3"
        if (isHovered) {
          if (!isHighlighted) return "hsl(220, 12%, 30%)"
          return hex + "99"
        }
        if (isHighlighted && count > 0) {
          const intensity = count / maxCount
          const alpha = Math.round(0x26 + (0x80 - 0x26) * intensity)
            .toString(16)
            .padStart(2, "0")
          return hex + alpha
        }
        if (!isHighlighted) return "hsl(220, 12%, 20%)"
        return "hsl(220, 12%, 18%)"
      }

      if (isSelected) return isHovered ? hex + "E6" : hex + "CC"
      if (isHovered) {
        if (!isHighlighted) return "hsl(220, 10%, 78%)"
        return hex + "B3"
      }
      if (isHighlighted && count > 0) {
        const intensity = count / maxCount
        const alpha = Math.round(0x26 + (0x80 - 0x26) * intensity)
          .toString(16)
          .padStart(2, "0")
        return hex + alpha
      }
      if (!isHighlighted) return "hsl(220, 10%, 88%)"
      return "hsl(220, 10%, 92%)"
    },
    [
      counts,
      maxCount,
      selectedCanton,
      hoveredCanton,
      hasHighlights,
      highlightedCantons,
      isDark,
    ],
  )

  const getStrokeColor = useCallback(
    (cantonId: string) => {
      const hex = CANTON_COLORS[cantonId] ?? "#6B7280"
      if (selectedCanton === cantonId) return hex
      if (hoveredCanton === cantonId)
        return isDark ? "hsl(220, 10%, 50%)" : hex + "AA"
      return isDark ? "hsl(220, 15%, 15%)" : "hsl(0, 0%, 100%)"
    },
    [selectedCanton, hoveredCanton, isDark],
  )

  const getStrokeWidth = useCallback(
    (cantonId: string) => {
      if (selectedCanton === cantonId) return 2.5
      if (hoveredCanton === cantonId) return 1.8
      return 1
    },
    [selectedCanton, hoveredCanton],
  )

  if (isLoading) {
    return (
      <div className="flex aspect-[5/3] items-center justify-center">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex aspect-[5/3] items-center justify-center rounded-lg border border-destructive/20 bg-destructive/5">
        <p className="text-sm text-destructive">{t("mapLoadError")}</p>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative" onMouseMove={handleMouseMove}>
      <svg
        viewBox={viewBox}
        className="h-auto w-full"
        role="img"
        aria-label={t("mapAriaLabel")}
      >
        {cantons.map((canton) => {
          const isActive =
            hoveredCanton === canton.id || selectedCanton === canton.id
          const offset = CANTON_LABEL_OFFSETS[canton.id]

          return (
            <g
              key={canton.id}
              onClick={() => onCantonClick?.(canton.id)}
              onMouseEnter={() => setHoveredCanton(canton.id)}
              onMouseLeave={() => setHoveredCanton(null)}
              className="cursor-pointer outline-none"
              role="button"
              tabIndex={0}
              aria-label={`${getCantonName(canton.id, locale)}: ${counts[canton.id] || 0} ${(counts[canton.id] || 0) === 1 ? t("expressionSingular") : t("expressionPlural")}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  onCantonClick?.(canton.id)
                }
              }}
              style={{
                filter: isActive
                  ? `drop-shadow(0 0 8px ${CANTON_COLORS[canton.id] ?? "#6B7280"}CC)`
                  : undefined,
              }}
            >
              {canton.paths.map((d, i) => (
                <path
                  key={`${canton.id}-${i}`}
                  d={d}
                  fill={getCantonFill(canton.id)}
                  stroke={getStrokeColor(canton.id)}
                  strokeWidth={getStrokeWidth(canton.id)}
                  strokeLinejoin="round"
                  className="transition-all duration-150"
                  pointerEvents="all"
                />
              ))}
              {offset ? (
                <>
                  <line
                    x1={canton.centroid.x}
                    y1={canton.centroid.y}
                    x2={canton.centroid.x + offset.dx}
                    y2={canton.centroid.y + offset.dy}
                    stroke={
                      isDark ? "hsl(220, 10%, 50%)" : "hsl(220, 10%, 60%)"
                    }
                    strokeWidth={0.8}
                    className="pointer-events-none"
                  />
                  <circle
                    cx={canton.centroid.x + offset.dx}
                    cy={canton.centroid.y + offset.dy}
                    r={9}
                    fill={CANTON_COLORS[canton.id] ?? "#6B7280"}
                    opacity={isActive ? 1 : 0.75}
                    className="pointer-events-none"
                  />
                  <text
                    x={canton.centroid.x + offset.dx}
                    y={canton.centroid.y + offset.dy}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#FFFFFF"
                    className="pointer-events-none select-none font-bold"
                    style={{
                      fontSize: "5.5px",
                      opacity: isActive ? 1 : 0.85,
                    }}
                  >
                    {canton.id}
                  </text>
                </>
              ) : (
                <text
                  x={canton.centroid.x}
                  y={canton.centroid.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={isDark ? "hsl(220, 10%, 75%)" : "hsl(220, 15%, 25%)"}
                  className="pointer-events-none select-none text-[7px] font-semibold"
                  style={{
                    opacity: isActive ? 1 : 0.6,
                  }}
                >
                  {canton.id}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      {hoveredCanton && (
        <CantonTooltip
          name={getCantonName(hoveredCanton, locale)}
          abbreviation={hoveredCanton}
          expressionCount={counts[hoveredCanton] || 0}
          x={tooltipPos.x}
          y={tooltipPos.y}
        />
      )}
    </div>
  )
}
