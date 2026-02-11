"use client"

import type { FC } from "react"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import Skeleton from "@mui/material/Skeleton"

const ExpressionCardSkeleton: FC = () => (
  <Card sx={{ p: 2 }}>
    {/* Header */}
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Box sx={{ flex: 1 }}>
        <Stack direction="row" alignItems="center" gap={1}>
          <Skeleton variant="text" width={180} height={28} />
          <Skeleton variant="rounded" width={50} height={22} />
          <Skeleton variant="rounded" width={40} height={20} />
        </Stack>
        <Stack direction="row" gap={1} mt={0.5}>
          <Skeleton variant="text" width={100} height={16} />
          <Skeleton variant="text" width={80} height={16} />
        </Stack>
      </Box>
      <Skeleton variant="circular" width={32} height={32} />
    </Stack>

    {/* Definition */}
    <Skeleton variant="text" width="100%" height={22} sx={{ mt: 1.5 }} />
    <Skeleton variant="text" width="85%" height={22} />

    {/* Geography */}
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mt: 1.5,
        mb: 1.5,
        p: 1.5,
        borderRadius: 1,
        bgcolor: "action.hover",
      }}
    >
      <Skeleton
        variant="rounded"
        width={140}
        height={100}
        sx={{ flexShrink: 0 }}
      />
      <Stack direction="row" gap={0.75} flexWrap="wrap" sx={{ flex: 1 }}>
        <Skeleton variant="rounded" width={90} height={24} />
        <Skeleton variant="rounded" width={75} height={24} />
      </Stack>
    </Box>

    {/* Examples accordion */}
    <Skeleton
      variant="rounded"
      width="100%"
      height={44}
      sx={{ mb: 1, borderRadius: "8px" }}
    />

    {/* Footer */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        pt: 1,
        mt: 0.5,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Skeleton variant="text" width={120} height={32} />
      <Stack direction="row" gap={1}>
        <Skeleton variant="circular" width={28} height={28} />
        <Skeleton variant="circular" width={28} height={28} />
      </Stack>
    </Box>
  </Card>
)

export default ExpressionCardSkeleton
