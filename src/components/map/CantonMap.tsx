"use client"

import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { useState, useMemo, useRef, useCallback, useEffect } from "react"
import useSWR from "swr"

import { Skeleton } from "@/components/ui/skeleton"
import { getCantonName, CANTON_COLORS } from "@/config/cantons"
import {
  type CantonPathData,
  computeCentroidFromPath,
  computeBoundingBox,
} from "@/lib/canton-utils"
import { cn } from "@/lib/utils"

import { Button } from "../ui/button"
import { CantonTooltip } from "./CantonTooltip"

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to load canton data")
    return res.json()
  })

const CANTON_LABEL_OFFSETS: Record<
  string,
  { dx: number; dy: number; ldx?: number; ldy?: number }
> = {
  AR: { dx: 50, dy: -40, ldx: 20, ldy: -10 },
  BS: { dx: -36, dy: -25, ldx: -5, ldy: 2.5 },
  BL: { dx: -44, dy: -20, ldx: -15, ldy: 0 },
  SO: { dx: 30, dy: -2.5, ldx: 0, ldy: -5 },
  SG: { dx: -30, dy: 0, ldx: 0, ldy: 20 },
  VD: { dx: -60, dy: 0, ldx: -10, ldy: 0 },
}

// Geographic correction: the SVG path data encodes Switzerland at ~2.02:1 (w:h),
// but the true geographic proportions are ~1.57:1. Scaling Y by this factor
// corrects the map to its proper shape.
const GEO_Y_SCALE = 2.02 / 1.57

const MIN_ZOOM = 1
const MAX_ZOOM = 2
const ZOOM_STEP = 0.5

interface CantonMapProps {
  highlightedCantons?: string[]
  selectedCanton?: string | null
  onCantonClick?: (_cantonId: string) => void
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
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isGrabbing, setIsGrabbing] = useState(false)
  const dragRef = useRef<{
    startX: number
    startY: number
    startPanX: number
    startPanY: number
  } | null>(null)
  const isDraggingRef = useRef(false)

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

  const baseViewBox = useMemo(() => {
    if (cantons.length === 0)
      return { x: 0, y: 0, w: 1000, h: Math.round(800 * GEO_Y_SCALE) }
    const bb = computeBoundingBox(cantons)
    const pad = 50
    return {
      x: bb.minX - pad,
      y: (bb.minY - pad) * GEO_Y_SCALE,
      w: bb.maxX - bb.minX + pad * 2,
      h: (bb.maxY - bb.minY + pad * 2) * GEO_Y_SCALE,
    }
  }, [cantons])

  const viewBox = useMemo(() => {
    const { x, y, w, h } = baseViewBox
    const zoomedW = w / zoom
    const zoomedH = h / zoom
    const cx = x + w / 2 + pan.x
    const cy = y + h / 2 + pan.y
    return `${cx - zoomedW / 2} ${cy - zoomedH / 2} ${zoomedW} ${zoomedH}`
  }, [baseViewBox, zoom, pan])

  const zoomIn = useCallback(() => {
    setZoom((z) => Math.min(z + ZOOM_STEP, MAX_ZOOM))
  }, [])

  const zoomOut = useCallback(() => {
    setZoom((z) => {
      const next = Math.max(z - ZOOM_STEP, MIN_ZOOM)
      if (next === MIN_ZOOM) setPan({ x: 0, y: 0 })
      return next
    })
  }, [])

  const resetZoom = useCallback(() => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
      if (dragRef.current) {
        isDraggingRef.current = true
        const dx = e.clientX - dragRef.current.startX
        const dy = e.clientY - dragRef.current.startY
        const svgEl = containerRef.current.querySelector("svg")
        if (!svgEl) return
        const svgRect = svgEl.getBoundingClientRect()
        const { w, h } = baseViewBox
        const scaleX = w / zoom / svgRect.width
        const scaleY = h / zoom / svgRect.height
        const maxPanX = (w - w / zoom) / 2
        const maxPanY = (h - h / zoom) / 2
        const rawX = dragRef.current.startPanX - dx * scaleX
        const rawY = dragRef.current.startPanY - dy * scaleY
        setPan({
          x: Math.max(-maxPanX, Math.min(maxPanX, rawX)),
          y: Math.max(-maxPanY, Math.min(maxPanY, rawY)),
        })
      }
    },
    [baseViewBox, zoom],
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      isDraggingRef.current = false
      setIsGrabbing(true)
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startPanX: pan.x,
        startPanY: pan.y,
      }
    },
    [pan],
  )

  const handleMouseUp = useCallback(() => {
    dragRef.current = null
    setIsGrabbing(false)
  }, [])

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length !== 1) return
      isDraggingRef.current = false
      setIsGrabbing(true)
      const touch = e.touches[0]
      dragRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        startPanX: pan.x,
        startPanY: pan.y,
      }
    },
    [pan],
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length !== 1 || !dragRef.current) return
      e.preventDefault()
      isDraggingRef.current = true
      const touch = e.touches[0]
      const dx = touch.clientX - dragRef.current.startX
      const dy = touch.clientY - dragRef.current.startY
      if (!containerRef.current) return
      const svgEl = containerRef.current.querySelector("svg")
      if (!svgEl) return
      const svgRect = svgEl.getBoundingClientRect()
      const { w, h } = baseViewBox
      const scaleX = w / zoom / svgRect.width
      const scaleY = h / zoom / svgRect.height
      const maxPanX = (w - w / zoom) / 2
      const maxPanY = (h - h / zoom) / 2
      const rawX = dragRef.current.startPanX - dx * scaleX
      const rawY = dragRef.current.startPanY - dy * scaleY
      setPan({
        x: Math.max(-maxPanX, Math.min(maxPanX, rawX)),
        y: Math.max(-maxPanY, Math.min(maxPanY, rawY)),
      })
    },
    [baseViewBox, zoom],
  )

  const handleTouchEnd = useCallback(() => {
    dragRef.current = null
    setIsGrabbing(false)
  }, [])

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()
    if (e.deltaY < 0) {
      setZoom((z) => Math.min(z + ZOOM_STEP, MAX_ZOOM))
    } else {
      setZoom((z) => {
        const next = Math.max(z - ZOOM_STEP, MIN_ZOOM)
        if (next === MIN_ZOOM) setPan({ x: 0, y: 0 })
        return next
      })
    }
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.addEventListener("wheel", handleWheel, { passive: false })
    el.addEventListener("touchmove", handleTouchMove, { passive: false })
    return () => {
      el.removeEventListener("wheel", handleWheel)
      el.removeEventListener("touchmove", handleTouchMove)
    }
  }, [handleWheel, handleTouchMove])

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
        if (isSelected) return isHovered ? `${hex}CC` : `${hex}B3`
        if (isHovered) {
          if (!isHighlighted) return "hsl(220, 12%, 30%)"
          return `${hex}99`
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

      if (isSelected) return isHovered ? `${hex}E6` : `${hex}CC`
      if (isHovered) {
        if (!isHighlighted) return "hsl(220, 10%, 78%)"
        return `${hex}B3`
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
        return isDark ? "hsl(220, 10%, 50%)" : `${hex}AA`
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
      <div
        className="flex items-center justify-center"
        style={{ aspectRatio: `${(1 / GEO_Y_SCALE).toFixed(4)}` }}
      >
        <Skeleton className="h-full w-full rounded-lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div
        className="flex items-center justify-center rounded-lg border border-destructive/20 bg-destructive/5"
        style={{ aspectRatio: `${(1 / GEO_Y_SCALE).toFixed(4)}` }}
      >
        <p className="text-sm text-destructive">{t("mapLoadError")}</p>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      role="application"
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      style={{
        cursor: isGrabbing ? "grabbing" : zoom > 1 ? "grab" : undefined,
      }}
    >
      <svg
        viewBox={viewBox}
        className="h-auto w-full select-none"
        role="img"
        aria-label={t("mapAriaLabel")}
      >
        <g transform={`scale(1, ${GEO_Y_SCALE})`}>
          {cantons.map((canton) => {
            const isHovered = hoveredCanton === canton.id
            const isActive = isHovered || selectedCanton === canton.id
            const offset = CANTON_LABEL_OFFSETS[canton.id]

            const isFullyColored =
              selectedCanton === canton.id || (counts[canton.id] || 0) > 0

            return (
              <g
                key={canton.id}
                onClick={() => {
                  if (!isDraggingRef.current) onCantonClick?.(canton.id)
                }}
                onMouseEnter={() => setHoveredCanton(canton.id)}
                onMouseLeave={() => setHoveredCanton(null)}
                className={cn("outline-none", zoom <= 1 && "cursor-pointer")}
                // oxlint-disable-next-line jsx_a11y/prefer-tag-over-role
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
                  <g
                    onMouseEnter={() => setHoveredCanton(canton.id)}
                    onMouseLeave={() => setHoveredCanton(null)}
                  >
                    <line
                      x1={canton.centroid.x + (offset.ldx ?? 0)}
                      y1={canton.centroid.y + (offset.ldy ?? 0)}
                      x2={canton.centroid.x + offset.dx}
                      y2={canton.centroid.y + offset.dy}
                      stroke={
                        isActive
                          ? (CANTON_COLORS[canton.id] ?? "#6B7280")
                          : isDark
                            ? "hsl(220, 10%, 45%)"
                            : "hsl(220, 10%, 65%)"
                      }
                      strokeWidth={0.8}
                      className="pointer-events-none"
                    />
                    {/* Counter-scale so circle + text render undistorted */}
                    <g
                      transform={`translate(${canton.centroid.x + offset.dx}, ${canton.centroid.y + offset.dy}) scale(1, ${1 / GEO_Y_SCALE}) translate(${-(canton.centroid.x + offset.dx)}, ${-(canton.centroid.y + offset.dy)})`}
                    >
                      <circle
                        cx={canton.centroid.x + offset.dx}
                        cy={canton.centroid.y + offset.dy}
                        r={14}
                        fill={
                          isActive
                            ? (CANTON_COLORS[canton.id] ?? "#6B7280")
                            : isDark
                              ? "hsl(220, 10%, 40%)"
                              : "hsl(220, 10%, 72%)"
                        }
                        opacity={isActive ? 1 : 0.75}
                      />
                      <text
                        x={canton.centroid.x + offset.dx}
                        y={canton.centroid.y + offset.dy}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#FFFFFF"
                        className="select-none text-[12px] font-semibold"
                        style={{ opacity: isActive ? 1 : 0.6 }}
                      >
                        {canton.id}
                      </text>
                    </g>
                  </g>
                ) : (
                  <text
                    x={canton.centroid.x}
                    y={canton.centroid.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={
                      isFullyColored && isActive
                        ? "#FFFFFF"
                        : isDark
                          ? "hsl(220, 10%, 75%)"
                          : "hsl(220, 15%, 35%)"
                    }
                    className="pointer-events-none select-none text-[12px] font-semibold"
                    style={{
                      opacity: isActive ? 1 : 0.6,
                      transform: `scaleY(${1 / GEO_Y_SCALE})`,
                      transformOrigin: `${canton.centroid.x}px ${canton.centroid.y}px`,
                    }}
                  >
                    {canton.id}
                  </text>
                )}
              </g>
            )
          })}
        </g>
      </svg>

      {/* Zoom controls */}
      <div className="absolute bottom-2 right-2 flex flex-col gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={resetZoom}
          disabled={zoom === 1}
          aria-label={t("zoomReset")}
        >
          <RotateCcw className="h-3 w-3" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={zoomIn}
          disabled={zoom >= MAX_ZOOM}
          aria-label={t("zoomIn")}
        >
          <ZoomIn className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={zoomOut}
          disabled={zoom <= MIN_ZOOM}
          aria-label={t("zoomOut")}
        >
          <ZoomOut className="h-3.5 w-3.5" />
        </Button>
      </div>

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
