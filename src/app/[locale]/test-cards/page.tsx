"use client"

import { useState } from "react"
import {
  Container,
  Typography,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
  CircularProgress,
  Box,
} from "@mui/material"
import { useExpressionsQuery, ExpressionFragment } from "@/hooks/useExpressions"
import { getFragmentData } from "@/generated"
import ExpressionCard from "@/components/expression/ExpressionCard"
import ExpressionCardSkeleton from "@/components/expression/ExpressionCardSkeleton"

type ViewMode = "cards" | "skeleton"

export default function TestCardsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("cards")

  const { data, loading } = useExpressionsQuery({
    limit: 4,
    offset: 0,
  })

  const expressions = data?.expressionsQuery?.expressions ?? []

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
            Expression Cards Test
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Test expression cards with real data.
          </Typography>
        </Box>

        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(_, v) => v && setViewMode(v)}
          size="small"
        >
          <ToggleButton value="cards">Cards</ToggleButton>
          <ToggleButton value="skeleton">Skeleton</ToggleButton>
        </ToggleButtonGroup>

        {viewMode === "skeleton" && (
          <Grid container spacing={3}>
            {[1, 2, 3, 4].map((i) => (
              <Grid key={i} size={{ xs: 12, md: 6 }}>
                <ExpressionCardSkeleton />
              </Grid>
            ))}
          </Grid>
        )}

        {viewMode === "cards" && (
          <Grid container spacing={3}>
            {expressions.map((rawExpr, idx) => {
              const expression = getFragmentData(ExpressionFragment, rawExpr)
              return (
                <Grid key={idx} size={{ xs: 12, md: 6 }}>
                  <ExpressionCard expression={expression} />
                </Grid>
              )
            })}
          </Grid>
        )}
      </Stack>
    </Container>
  )
}
