import type { FC } from "react"
import Box, { BoxProps } from "@mui/joy/Box"
import TermCard from "@/features/termsCardsList/termCard"
import Pagination, { PaginationProps } from "@/ui/Pagination"
import { FragmentType, getFragmentData } from "@@/generated"
import { TermFragment } from "@/hooks/useTerms"
import { useMe } from "@/hooks/useMe"
import CircularProgress from "@mui/joy/CircularProgress"

type TermsCardsListProps = Pick<BoxProps, "sx"> & {
  paginationProps?: PaginationProps
  terms?: FragmentType<typeof TermFragment>[]
  loading?: boolean
}

const TermsCardsList: FC<TermsCardsListProps> = ({ sx, loading, ...props }) => {
  const { me } = useMe()
  const terms = getFragmentData(TermFragment, props.terms) ?? []

  const pagination = (
    <Pagination disabled={loading} {...props.paginationProps} />
  )

  return (
    <Box
      sx={[
        { display: "flex", flexDirection: "column", gap: 1 },
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
      ) : terms.length ? (
        terms.map((term) => (
          <TermCard key={term.id} term={term} disableActions={!me} />
        ))
      ) : (
        <>No data sorry :(</>
      )}
      {pagination}
    </Box>
  )
}

export default TermsCardsList
