"use client"

import { useState, memo, useRef, useEffect } from "react"
import useSWR from "swr"
import {
  getCantonName,
  isValidCantonId,
  getCantonIdFromGeoJSONName,
  CANTON_COLORS,
} from "@/config/cantons"

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to load GeoJSON")
    return res.json()
  })

function darkenColor(hex: string, percent: number = 20): string {
  const num = parseInt(hex.replace("#", ""), 16)
  const r = Math.max(0, ((num >> 16) & 0xff) * (1 - percent / 100))
  const g = Math.max(0, ((num >> 8) & 0xff) * (1 - percent / 100))
  const b = Math.max(0, (num & 0xff) * (1 - percent / 100))
  return `#${((1 << 24) | (Math.round(r) << 16) | (Math.round(g) << 8) | Math.round(b)).toString(16).slice(1)}`
}

export interface SwitzerlandMapProps {
  highlightedCantons: string[]
  onCantonClick?: (cantonId: string) => void
  onCantonHover?: (cantonId: string | null) => void
  cantonColors?: Record<string, string>
  strokeColor?: string
  strokeWidth?: number
  locale?: "de" | "fr" | "it" | "en"
  showLabels?: boolean
  showAttribution?: boolean
  height?: number | string
  width?: number | string
}

interface CantonFeature {
  type: "Feature"
  properties: {
    NAME: string
    KANTONSNUM: number
  }
  geometry: {
    type: "Polygon"
    coordinates: number[][][]
  }
}

interface GeoJSONData {
  type: "FeatureCollection"
  features: CantonFeature[]
}

interface CantonPath {
  id: string
  paths: string[]
  centroid: { x: number; y: number }
}

export const SwitzerlandMap = memo(function SwitzerlandMap({
  highlightedCantons,
  onCantonClick,
  onCantonHover,
  cantonColors = CANTON_COLORS,
  strokeColor = "#FFFFFF",
  strokeWidth = 1.5,
  locale = "de",
  showLabels = false,
  showAttribution = true,
  height = 400,
  width = "100%",
}: SwitzerlandMapProps) {
  const [hoveredCantonId, setHoveredCantonId] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [focusedCantonId, setFocusedCantonId] = useState<string | null>(null)
  const cantonRefs = useRef<Map<string, SVGGElement>>(new Map())

  const {
    data: geoJSON,
    error,
    isLoading,
  } = useSWR<GeoJSONData>("/swiss-cantons-simplified.json", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 86400000,
  })

  const cantonPaths = geoJSON
    ? (() => {
        const allCoords = geoJSON.features
          .filter((f) => f.geometry && f.geometry.coordinates)
          .flatMap((f) => f.geometry.coordinates[0])
        const globalBounds = getBounds(allCoords)

        const pathsByCantonId = new Map<string, CantonPath[]>()

        geoJSON.features.forEach((feature) => {
          if (!feature.geometry || !feature.geometry.coordinates) {
            return
          }

          const cantonId = getCantonIdFromGeoJSONName(feature.properties.NAME)
          if (!cantonId) return

          const coords = feature.geometry.coordinates[0]
          const svgPath = coordsToSVGPath(coords, globalBounds)
          const centroid = calculateCentroid(coords, globalBounds)

          const cantonPath = {
            id: cantonId,
            paths: [svgPath],
            centroid,
          }

          if (!pathsByCantonId.has(cantonId)) {
            pathsByCantonId.set(cantonId, [])
          }
          pathsByCantonId.get(cantonId)!.push(cantonPath)
        })

        return Array.from(pathsByCantonId.entries()).map(
          ([cantonId, pathList]) => {
            if (pathList.length === 1) {
              return pathList[0]
            }

            const allPaths = pathList.flatMap((p) => p.paths)
            const avgCentroid = {
              x:
                pathList.reduce((sum, p) => sum + p.centroid.x, 0) /
                pathList.length,
              y:
                pathList.reduce((sum, p) => sum + p.centroid.y, 0) /
                pathList.length,
            }

            return {
              id: cantonId,
              paths: allPaths,
              centroid: avgCentroid,
            }
          },
        )
      })()
    : []

  const handleCantonClick = (cantonId: string) => {
    if (isValidCantonId(cantonId) && onCantonClick) {
      onCantonClick(cantonId)
    }
  }

  const handleCantonMouseEnter = (cantonId: string) => {
    setHoveredCantonId(cantonId)
    if (isValidCantonId(cantonId) && onCantonHover) {
      onCantonHover(cantonId)
    }
  }

  const handleCantonMouseLeave = () => {
    setHoveredCantonId(null)
    if (onCantonHover) {
      onCantonHover(null)
    }
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY })
  }

  const isHighlighted = (cantonId: string) => {
    return highlightedCantons.some(
      (id) => id.toLowerCase() === cantonId.toLowerCase(),
    )
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<SVGGElement>,
    cantonId: string,
  ) => {
    // Handle Enter or Space to trigger click
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      handleCantonClick(cantonId)
    }

    // Handle arrow key navigation
    if (
      ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
    ) {
      event.preventDefault()
      const currentIndex = cantonPaths.findIndex((c) => c.id === cantonId)
      let nextIndex = currentIndex

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          nextIndex = (currentIndex + 1) % cantonPaths.length
          break
        case "ArrowLeft":
        case "ArrowUp":
          nextIndex =
            (currentIndex - 1 + cantonPaths.length) % cantonPaths.length
          break
      }

      const nextCanton = cantonPaths[nextIndex]
      const nextElement = cantonRefs.current.get(nextCanton.id)
      if (nextElement) {
        nextElement.focus()
        setFocusedCantonId(nextCanton.id)
      }
    }
  }

  useEffect(() => {
    // Clear focused canton when it's no longer in the map
    if (focusedCantonId && !cantonPaths.find((c) => c.id === focusedCantonId)) {
      setFocusedCantonId(null)
    }
  }, [cantonPaths, focusedCantonId])

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ width, height }}
      >
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ width, height }}
      >
        <p className="text-destructive">Error loading map: {String(error)}</p>
      </div>
    )
  }

  return (
    <div className="relative" style={{ width, height }}>
      <style>{`
        svg g[role="button"]:focus path {
          stroke: #1976D2;
          stroke-width: 3;
          filter: drop-shadow(0 0 4px rgba(25, 118, 210, 0.6));
        }
      `}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {focusedCantonId && getCantonName(focusedCantonId, locale)}
      </div>
      <svg
        viewBox="0 0 1000 800"
        style={{ width: "100%", height: "100%" }}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={
          highlightedCantons.length > 0
            ? `Map of Switzerland with ${highlightedCantons.length} highlighted canton${highlightedCantons.length > 1 ? "s" : ""}`
            : "Map of Switzerland"
        }
      >
        {cantonPaths.map((canton) => {
          const highlighted = isHighlighted(canton.id)
          const cantonName = getCantonName(canton.id, locale)
          const cantonColor = cantonColors[canton.id] || "#E0E0E0"
          const grayForNonHighlighted = "#E8EAF6"
          const fillColor = highlighted ? cantonColor : grayForNonHighlighted

          return (
            <g
              key={canton.id}
              ref={(el) => {
                if (el) {
                  cantonRefs.current.set(canton.id, el)
                } else {
                  cantonRefs.current.delete(canton.id)
                }
              }}
              onClick={() => handleCantonClick(canton.id)}
              onMouseEnter={() => handleCantonMouseEnter(canton.id)}
              onMouseLeave={handleCantonMouseLeave}
              onMouseMove={handleMouseMove}
              onKeyDown={(e) => handleKeyDown(e, canton.id)}
              style={{
                cursor: onCantonClick ? "pointer" : "default",
                outline: "none",
              }}
              role={onCantonClick ? "button" : undefined}
              tabIndex={onCantonClick ? 0 : undefined}
              aria-label={cantonName}
              aria-pressed={onCantonClick && highlighted ? true : undefined}
            >
              {canton.paths.map((pathData, idx) => (
                <path
                  key={`${canton.id}-${idx}`}
                  d={pathData}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  style={{
                    transition: "fill 0.2s ease-in-out",
                  }}
                  pointerEvents="none"
                />
              ))}
              {showLabels && (
                <text
                  x={canton.centroid.x}
                  y={canton.centroid.y}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="500"
                  fill="#333"
                  pointerEvents="none"
                  style={{ userSelect: "none" }}
                >
                  {cantonName}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      {showAttribution && (
        <span className="absolute bottom-2 right-2 text-[0.7rem] text-muted-foreground opacity-70">
          Inspired by{" "}
          <a
            href="https://www.kleinersprachatlas.ch/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Kleiner Sprachatlas
          </a>
        </span>
      )}

      {hoveredCantonId && (
        <div
          className="pointer-events-none fixed z-[1000] rounded bg-black/80 px-2 py-1 text-sm text-white"
          style={{
            left: mousePosition.x + 10,
            top: mousePosition.y + 10,
          }}
        >
          {getCantonName(hoveredCantonId, locale)}
        </div>
      )}
    </div>
  )
})

function getBounds(coords: number[][]) {
  let minLon = Infinity
  let maxLon = -Infinity
  let minLat = Infinity
  let maxLat = -Infinity

  for (const [lon, lat] of coords) {
    if (lon < minLon) minLon = lon
    if (lon > maxLon) maxLon = lon
    if (lat < minLat) minLat = lat
    if (lat > maxLat) maxLat = lat
  }

  return { minLon, maxLon, minLat, maxLat }
}

function coordsToSVGPath(
  coords: number[][],
  bounds: ReturnType<typeof getBounds>,
): string {
  const WIDTH = 1000
  const HEIGHT = 800
  const PADDING = 50

  const lonRange = bounds.maxLon - bounds.minLon
  const latRange = bounds.maxLat - bounds.minLat

  const scaleX = (WIDTH - 2 * PADDING) / lonRange
  const scaleY = (HEIGHT - 2 * PADDING) / latRange

  const scale = Math.min(scaleX, scaleY)

  const translateX = PADDING + (WIDTH - 2 * PADDING - lonRange * scale) / 2
  const translateY = PADDING + (HEIGHT - 2 * PADDING - latRange * scale) / 2

  const pathSegments = coords.map(([lon, lat], i) => {
    const x = translateX + (lon - bounds.minLon) * scale
    const y = translateY + (bounds.maxLat - lat) * scale

    return i === 0 ? `M ${x},${y}` : `L ${x},${y}`
  })

  return pathSegments.join(" ") + " Z"
}

function calculateCentroid(
  coords: number[][],
  bounds: ReturnType<typeof getBounds>,
) {
  const WIDTH = 1000
  const HEIGHT = 800
  const PADDING = 50

  const lonRange = bounds.maxLon - bounds.minLon
  const latRange = bounds.maxLat - bounds.minLat

  const scaleX = (WIDTH - 2 * PADDING) / lonRange
  const scaleY = (HEIGHT - 2 * PADDING) / latRange

  const scale = Math.min(scaleX, scaleY)

  const translateX = PADDING + (WIDTH - 2 * PADDING - lonRange * scale) / 2
  const translateY = PADDING + (HEIGHT - 2 * PADDING - latRange * scale) / 2

  const centerLon = (bounds.minLon + bounds.maxLon) / 2
  const centerLat = (bounds.minLat + bounds.maxLat) / 2

  const x = translateX + (centerLon - bounds.minLon) * scale
  const y = translateY + (bounds.maxLat - centerLat) * scale

  return { x, y }
}
