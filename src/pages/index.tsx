import { useMe } from "@/hooks/useMe"
import Layout from "@/features/layout/layout"
import SearchTermsInput from "@/ui/SearchTermsInput"
import Box from "@mui/joy/Box"
import Stack from "@mui/joy/Stack"
import { GetStaticProps, NextPage } from "next"
import { useTermsQuery } from "@/hooks/useTerms"
import SelectSingleLocation from "@/ui/Autocomplete/selectSingleLocation"
import { ParsedUrlQuery } from "querystring"
import { useRouter } from "next/router"
import { setQueryOnPage } from "@/utils/setQueryOnPage"
import SelectLetter from "@/ui/selectLetter"
import Accordion from "@/ui/Accordion"
import TermsCardsList from "@/features/termsCardsList"
import { usePaginationState } from "@/hooks/usePaginationState"
import NewTermButton from "@/ui/NewTermButton"
import { useTranslation } from "next-i18next"
import { getStaticPropsTranslations } from "@/utils/i18n"

type Query = ParsedUrlQuery & {
  q?: string
  canton?: string
  firstChar?: string
}

const Home: NextPage = () => {
  const { t } = useTranslation("common")
  const router = useRouter()
  const query = router.query as Query
  const me = useMe().me

  const { onDataCountChange, ...paginationProps } = usePaginationState()
  const {
    data,
    previousData,
    loading: loadingTermsQuery,
  } = useTermsQuery({
    offset: (paginationProps.pageIndex - 1) * paginationProps.pageSize,
    limit: paginationProps.pageSize,
    slug: query.q,
    canton: query.canton,
    firstChar: query.firstChar,
  })

  const termsQuery = data?.termsQuery ?? previousData?.termsQuery
  onDataCountChange(termsQuery?.count)

  return (
    <Layout hideSidebar={!me}>
      <Stack sx={{ mt: 1, mb: 3, gap: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
          <SearchTermsInput sx={{ flex: 1 }} disabled={loadingTermsQuery} />
          <NewTermButton disabled={loadingTermsQuery} />
        </Box>
        <SelectSingleLocation
          mode="canton"
          value={query.canton}
          onChange={(canton) => setQueryOnPage(router, { canton })}
          placeholder={t("filterBy.canton")}
          disabled={loadingTermsQuery}
        />
        {!query.q ? (
          <Accordion
            content={[
              {
                label: t("filterBy.firstChar"),
                children: (
                  <SelectLetter
                    value={query.firstChar}
                    onChange={(firstChar) =>
                      setQueryOnPage(router, {
                        firstChar:
                          query.firstChar === firstChar ? null : firstChar,
                      })
                    }
                    disabled={loadingTermsQuery}
                  />
                ),
              },
            ]}
          />
        ) : null}
      </Stack>
      <TermsCardsList
        terms={termsQuery?.terms}
        paginationProps={paginationProps}
        loading={loadingTermsQuery}
      />
    </Layout>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await getStaticPropsTranslations(locale)) },
})
