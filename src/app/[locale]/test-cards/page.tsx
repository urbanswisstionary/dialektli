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
import ExpressionCardV2 from "@/components/expression/ExpressionCardV2"
import ExpressionCardSkeleton from "@/components/expression/ExpressionCardSkeleton"

type ViewMode = "side-by-side" | "v1-only" | "v2-only" | "skeleton"

export default function TestCardsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("side-by-side")

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
            Expression Card Comparison
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Compare V1 (current) vs V2 (redesign) expression cards with real
            data.
          </Typography>
        </Box>

        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(_, v) => v && setViewMode(v)}
          size="small"
        >
          <ToggleButton value="side-by-side">Side by Side</ToggleButton>
          <ToggleButton value="v1-only">V1 Only</ToggleButton>
          <ToggleButton value="v2-only">V2 Only</ToggleButton>
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

        {viewMode === "side-by-side" && (
          <Stack spacing={4}>
            {expressions.map((rawExpr, idx) => (
              <ExpressionPair key={idx} rawExpression={rawExpr} />
            ))}
          </Stack>
        )}

        {viewMode === "v1-only" && (
          <Grid container spacing={3}>
            {expressions.map((rawExpr, idx) => (
              <Grid key={idx} size={{ xs: 12, md: 6 }}>
                <ExpressionV1Card rawExpression={rawExpr} />
              </Grid>
            ))}
          </Grid>
        )}

        {viewMode === "v2-only" && (
          <Grid container spacing={3}>
            {expressions.map((rawExpr, idx) => (
              <Grid key={idx} size={{ xs: 12, md: 6 }}>
                <ExpressionV2Card rawExpression={rawExpr} />
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>
    </Container>
  )
}

function ExpressionPair({ rawExpression }: { rawExpression: any }) {
  const expression = getFragmentData(ExpressionFragment, rawExpression)
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="overline" color="text.secondary" gutterBottom>
          V1 — Current
        </Typography>
        <ExpressionCard expression={expression} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="overline" color="text.secondary" gutterBottom>
          V2 — Redesign
        </Typography>
        <ExpressionCardV2 expression={expression} />
      </Grid>
    </Grid>
  )
}

function ExpressionV1Card({ rawExpression }: { rawExpression: any }) {
  const expression = getFragmentData(ExpressionFragment, rawExpression)
  return <ExpressionCard expression={expression} />
}

function ExpressionV2Card({ rawExpression }: { rawExpression: any }) {
  const expression = getFragmentData(ExpressionFragment, rawExpression)
  return <ExpressionCardV2 expression={expression} />
}
