import type { FC } from "react"
import Box, { BoxProps } from "@mui/joy/Box"
import TermCard from "@/features/termsCardsList/termCard"
import Pagination, {
  PaginationProps,
} from "@/features/Auth/termsAdmin/components/pagination"
import { FragmentType, getFragmentData } from "@@/generated"
import { TermFragment } from "@/hooks/useTerms"
import { useMe } from "@/hooks/useMe"

type TermsCardsListProps = Pick<BoxProps, "sx"> & {
  paginationProps?: PaginationProps
  terms?: FragmentType<typeof TermFragment>[]
}

const TermsCardsList: FC<TermsCardsListProps> = ({ sx, ...props }) => {
  const { me } = useMe()
  const terms = getFragmentData(TermFragment, props.terms) ?? []

  const pagination = <Pagination {...props.paginationProps} />

  return (
    <Box
      sx={[
        { display: "flex", flexDirection: "column", gap: 1 },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {pagination}
      {terms.length ? (
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
