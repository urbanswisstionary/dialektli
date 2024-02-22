import { useMe } from "@/hooks/useMe"
import Layout from "@/features/layout/layout"
import SearchTermsInput from "@/ui/SearchTermsInput"
import Box from "@mui/joy/Box"
import Stack from "@mui/joy/Stack"
import { NextPage } from "next"
import { useTermsQuery } from "@/hooks/useTerms"
import SelectSingleLocation from "@/ui/selectLocation/selectSingleLocation"
import { ParsedUrlQuery } from "querystring"
import { useRouter } from "next/router"
import { setQueryOnPage } from "@/utils/setQueryOnPage"
import SelectLetter from "@/ui/selectLetter"
import Accordion from "@/ui/Accordion"
import TermsCardsList from "@/features/termsCardsList"
import { usePaginationState } from "@/hooks/usePaginationState"
import NewTermButton from "@/ui/NewTermButton"

type Query = ParsedUrlQuery & {
  canton?: string
  firstChar?: string
}

const Home: NextPage = () => {
  const router = useRouter()
  const query = router.query as Query
  const me = useMe().me

  const { onDataCountChange, ...paginationProps } = usePaginationState()
  const termQuery = useTermsQuery({
    offset: (paginationProps.pageIndex - 1) * paginationProps.pageSize,
    limit: paginationProps.pageSize,
    canton: query.canton,
    firstChar: query.firstChar,
  })

  const data = termQuery.data?.termsQuery ?? termQuery.previousData?.termsQuery
  onDataCountChange(data?.count)

  return (
    <Layout hideSidebar={!me}>
      <Stack sx={{ mt: 1, mb: 3, gap: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
          <SearchTermsInput sx={{ flex: 1 }} />
          <NewTermButton />
        </Box>

        <SelectSingleLocation
          mode="canton"
          value={query.canton}
          onChange={(canton) => setQueryOnPage(router, { canton })}
          placeholder="Filter by canton"
        />
        <Accordion
          content={[
            {
              label: "Filter by first charachter",
              children: (
                <SelectLetter
                  value={query.firstChar}
                  onChange={(firstChar) =>
                    setQueryOnPage(router, {
                      firstChar:
                        query.firstChar === firstChar ? null : firstChar,
                    })
                  }
                />
              ),
            },
          ]}
        />
      </Stack>
      <TermsCardsList terms={data?.terms} paginationProps={paginationProps} />
    </Layout>
  )
}

export default Home
