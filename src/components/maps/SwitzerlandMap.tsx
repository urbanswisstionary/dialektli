"use client"

import { Box, Typography, Tooltip } from "@mui/material"
import { useState, useEffect } from "react"
import {
  getCantonName,
  isValidCantonId,
  getCantonIdFromGeoJSONName,
} from "@/config/cantons"

export interface SwitzerlandMapProps {
  highlightedCantons: string[]
  onCantonClick?: (cantonId: string) => void
  onCantonHover?: (cantonId: string | null) => void
  fillColor?: string
  highlightColor?: string
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
  path: string
  centroid: { x: number; y: number }
}

export function SwitzerlandMap({
  highlightedCantons,
  onCantonClick,
  onCantonHover,
  fillColor = "#E0E0E0",
  highlightColor = "#1976D2",
  strokeColor = "#FFFFFF",
  strokeWidth = 1.5,
  locale = "de",
  showLabels = false,
  showAttribution = true,
  height = 400,
  width = "100%",
}: SwitzerlandMapProps) {
  const [cantonPaths, setCantonPaths] = useState<CantonPath[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hoveredCantonId, setHoveredCantonId] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    fetch("/swiss-cantons-simplified.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load GeoJSON")
        return res.json()
      })
      .then((geoJSON: GeoJSONData) => {
        const allCoords = geoJSON.features
          .filter((f) => f.geometry && f.geometry.coordinates)
          .flatMap((f) => f.geometry.coordinates[0])
        const globalBounds = getBounds(allCoords)

        const paths = geoJSON.features
          .map((feature) => {
            if (!feature.geometry || !feature.geometry.coordinates) {
              return null
            }

            const cantonId = getCantonIdFromGeoJSONName(feature.properties.NAME)
            if (!cantonId) return null

            const coords = feature.geometry.coordinates[0]
            const svgPath = coordsToSVGPath(coords, globalBounds)
            const centroid = calculateCentroid(coords, globalBounds)

            return {
              id: cantonId,
              path: svgPath,
              centroid,
            }
          })
          .filter((p): p is CantonPath => p !== null)

        setCantonPaths(paths)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const handleCantonClick = (cantonId: string) => {
    if (isValidCantonId(cantonId) && onCantonClick) {
      onCantonClick(cantonId)
    }
  }

  const handleCantonMouseEnter = (
    cantonId: string,
    event: React.MouseEvent,
  ) => {
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

  if (loading) {
    return (
      <Box
        sx={{
          width,
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="text.secondary">Loading map...</Typography>
      </Box>
    )
  }

  if (error) {
    return (
      <Box
        sx={{
          width,
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="error">Error loading map: {error}</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ width, height, position: "relative" }}>
      <svg
        viewBox="0 0 1000 800"
        style={{ width: "100%", height: "100%" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {cantonPaths.map((canton) => {
          const highlighted = isHighlighted(canton.id)
          const cantonName = getCantonName(canton.id, locale)

          return (
            <g
              key={canton.id}
              onClick={() => handleCantonClick(canton.id)}
              onMouseEnter={(e) => handleCantonMouseEnter(canton.id, e)}
              onMouseLeave={handleCantonMouseLeave}
              onMouseMove={handleMouseMove}
              style={{ cursor: onCantonClick ? "pointer" : "default" }}
            >
              <path
                d={canton.path}
                fill={highlighted ? highlightColor : fillColor}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                style={{
                  transition: "fill 0.2s ease-in-out",
                }}
              />
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
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            fontSize: "0.7rem",
            opacity: 0.7,
          }}
        >
          Inspired by{" "}
          <a
            href="https://www.kleinersprachatlas.ch/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            Kleiner Sprachatlas
          </a>
        </Typography>
      )}

      {hoveredCantonId && (
        <Box
          sx={{
            position: "fixed",
            left: mousePosition.x + 10,
            top: mousePosition.y + 10,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "4px 8px",
            borderRadius: 1,
            fontSize: "0.875rem",
            pointerEvents: "none",
            zIndex: 1000,
          }}
        >
          {getCantonName(hoveredCantonId, locale)}
        </Box>
      )}
    </Box>
  )
}

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
