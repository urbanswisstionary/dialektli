"use client"

import type { FC } from "react"
import Box, { BoxProps } from "@mui/material/Box"
import ExpressionCard from "@/components/expression/ExpressionCard"
import Pagination, { PaginationProps } from "@/components/ui/Pagination"
import { FragmentType, getFragmentData } from "@/generated"
import { ExpressionFragment } from "@/hooks/useExpressions"
import { useMe } from "@/hooks/useUsers"
import CircularProgress from "@mui/material/CircularProgress"
import { useTranslations } from "next-intl"

interface ExpressionsCardsListProps extends Pick<BoxProps, "sx"> {
  paginationProps?: PaginationProps
  expressions?: FragmentType<typeof ExpressionFragment>[]
  loading?: boolean
}

const ExpressionsCardsList: FC<ExpressionsCardsListProps> = ({
  sx,
  loading,
  ...props
}) => {
  const t = useTranslations()
  const { me } = useMe()
  const expressions =
    getFragmentData(ExpressionFragment, props.expressions) ?? []

  const pagination = (
    <Pagination disabled={loading} {...props.paginationProps} />
  )

  return (
    <Box
      sx={[
        { display: "flex", flexDirection: "column", gap: 5 },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {pagination}
      {loading ? (
        <CircularProgress sx={{ alignSelf: "center", my: 5 }} size="large" />
      ) : expressions.length ? (
        expressions.map((expression) => (
          <ExpressionCard
            key={expression.id}
            expression={expression}
            disableActions={!me}
          />
        ))
      ) : (
        <>{t("noData")}</>
      )}
      {pagination}
    </Box>
  )
}

export default ExpressionsCardsList
