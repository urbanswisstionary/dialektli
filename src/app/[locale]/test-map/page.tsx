"use client"

import { useState } from "react"
import { Box, Container, Typography, Stack, Button, Chip } from "@mui/material"
import { SwitzerlandMap } from "@/components/maps/SwitzerlandMap"

export default function TestMapPage() {
  const [highlightedCantons, setHighlightedCantons] = useState<string[]>([
    "ZH",
    "BE",
  ])
  const [hoveredCanton, setHoveredCanton] = useState<string | null>(null)
  const [showLabels, setShowLabels] = useState(false)

  const handleCantonClick = (cantonId: string) => {
    setHighlightedCantons((prev) => {
      if (prev.includes(cantonId)) {
        return prev.filter((id) => id !== cantonId)
      }
      return [...prev, cantonId]
    })
  }

  const handleReset = () => {
    setHighlightedCantons([])
  }

  const handleHighlightAll = () => {
    setHighlightedCantons([
      "ZH",
      "BE",
      "LU",
      "UR",
      "SZ",
      "OW",
      "NW",
      "GL",
      "ZG",
      "FR",
      "SO",
      "BS",
      "BL",
      "SH",
      "AR",
      "AI",
      "SG",
      "GR",
      "AG",
      "TG",
      "TI",
      "VD",
      "VS",
      "NE",
      "GE",
      "JU",
    ])
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h3" component="h1" gutterBottom>
            Switzerland Map Test Page
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Testing geographic visualization for Swiss dialect expressions.
            Click cantons to toggle highlighting.
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <Button variant="outlined" onClick={handleReset}>
            Clear All
          </Button>
          <Button variant="outlined" onClick={handleHighlightAll}>
            Highlight All
          </Button>
          <Button variant="outlined" onClick={() => setShowLabels(!showLabels)}>
            {showLabels ? "Hide" : "Show"} Labels
          </Button>
          <Chip
            label={`${highlightedCantons.length} canton(s) selected`}
            color="primary"
            variant="outlined"
          />
          {hoveredCanton && (
            <Chip label={`Hovering: ${hoveredCanton}`} color="secondary" />
          )}
        </Stack>

        <Box sx={{ border: 1, borderColor: "divider", borderRadius: 1, p: 2 }}>
          <SwitzerlandMap
            highlightedCantons={highlightedCantons}
            onCantonClick={handleCantonClick}
            onCantonHover={setHoveredCanton}
            showLabels={showLabels}
            showAttribution={true}
            height={600}
            width="100%"
            strokeColor="#FFFFFF"
            strokeWidth={2}
            locale="de"
          />
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Selected Cantons
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {highlightedCantons.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No cantons selected. Click on the map to select cantons.
              </Typography>
            ) : (
              highlightedCantons.map((canton) => (
                <Chip
                  key={canton}
                  label={canton}
                  onDelete={() => handleCantonClick(canton)}
                  color="primary"
                />
              ))
            )}
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
}
