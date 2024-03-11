import type { FC } from "react"
import Box, { BoxProps } from "@mui/joy/Box"
import ExpressionCard from "@/features/expression/expressionCard"
import Pagination, { PaginationProps } from "@/ui/Pagination"
import { FragmentType, getFragmentData } from "@@/generated"
import { ExpressionFragment } from "@/hooks/useExpressions"
import { useMe } from "@/hooks/useUsers"
import CircularProgress from "@mui/joy/CircularProgress"
import { useTranslation } from "next-i18next"

type ExpressionsCardsListProps = Pick<BoxProps, "sx"> & {
  paginationProps?: PaginationProps
  expressions?: FragmentType<typeof ExpressionFragment>[]
  loading?: boolean
}

const ExpressionsCardsList: FC<ExpressionsCardsListProps> = ({
  sx,
  loading,
  ...props
}) => {
  const { t } = useTranslation("common")
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
        <CircularProgress
          sx={{ alignSelf: "center", my: 5 }}
          size="lg"
          variant="soft"
        />
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
