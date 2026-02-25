/**
 * Canton map utilities for SVG path rendering.
 *
 * Used by CantonMap to compute centroids and bounding boxes from the
 * pre-computed SVG path data in /public/swiss-cantons.json.
 */

export interface CantonPathData {
  id: string
  paths: string[]
  centroid: { x: number; y: number }
}

/**
 * Compute a centroid from an SVG path string by averaging all coordinate pairs.
 * Handles M, L, Z commands.
 */
export function computeCentroidFromPath(pathStr: string): {
  x: number
  y: number
} {
  const coords: { x: number; y: number }[] = []
  const regex = /(-?\d+(?:\.\d+)?)\s*[,\s]\s*(-?\d+(?:\.\d+)?)/g
  let match
  while ((match = regex.exec(pathStr)) !== null) {
    coords.push({ x: parseFloat(match[1]), y: parseFloat(match[2]) })
  }
  if (coords.length === 0) return { x: 0, y: 0 }

  const sum = coords.reduce((acc, c) => ({ x: acc.x + c.x, y: acc.y + c.y }), {
    x: 0,
    y: 0,
  })
  return { x: sum.x / coords.length, y: sum.y / coords.length }
}

/**
 * Compute the bounding box of all paths in the canton data.
 */
export function computeBoundingBox(cantons: CantonPathData[]): {
  minX: number
  minY: number
  maxX: number
  maxY: number
} {
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  for (const canton of cantons) {
    for (const pathStr of canton.paths) {
      const regex = /(-?\d+(?:\.\d+)?)\s*[,\s]\s*(-?\d+(?:\.\d+)?)/g
      let match
      while ((match = regex.exec(pathStr)) !== null) {
        const x = parseFloat(match[1])
        const y = parseFloat(match[2])
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
    }
  }

  return { minX, minY, maxX, maxY }
}
