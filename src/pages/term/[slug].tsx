import type { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"
import Layout from "@/features/layout/layout"
import { useMe } from "@/hooks/useMe"
import { ParsedUrlQuery } from "querystring"
import { useTermsQuery } from "@/hooks/useTerms"
import { usePaginationState } from "@/hooks/usePaginationState"
import { setQueryOnPage } from "@/utils/setQueryOnPage"
import Stack from "@mui/joy/Stack"
import Box from "@mui/joy/Box"
import SearchTermsInput from "@/ui/SearchTermsInput"
import NewTermButton from "@/ui/NewTermButton"
import SelectSingleLocation from "@/ui/Autocomplete/selectSingleLocation"
import TermsCardsList from "@/features/termsCardsList"
import { getStaticPropsTranslations } from "@/utils/i18n"
import { useTranslation } from "next-i18next"

type Query = ParsedUrlQuery & { canton?: string; slug: string }

const TermPage: NextPage = () => {
  const { t } = useTranslation("common")
  const { me } = useMe()
  const router = useRouter()
  const query = router.query as Query
  const { onDataCountChange, ...paginationProps } = usePaginationState()
  const {
    data,
    previousData,
    loading: loadingTermsQuery,
  } = useTermsQuery({
    offset: (paginationProps.pageIndex - 1) * paginationProps.pageSize,
    limit: paginationProps.pageSize,
    slug: query.slug,
    canton: query.canton,
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
      </Stack>
      <TermsCardsList
        terms={termsQuery?.terms}
        paginationProps={paginationProps}
        loading={loadingTermsQuery}
      />
    </Layout>
  )
}

export default TermPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await getStaticPropsTranslations(locale)) },
})

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" }
}
