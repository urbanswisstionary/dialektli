import { useMe } from "@/hooks/useUsers"
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
import SelectLetter from "@/ui/Select/selectLetter"
import Accordion from "@/ui/Accordion"
import TermsCardsList from "@/features/termsCardsList"
import { usePaginationState } from "@/hooks/usePaginationState"
import NewTermButton from "@/ui/NewTermButton"
import { useTranslation } from "next-i18next"
import { getStaticPropsTranslations } from "@/utils/i18n"
import { useMemo } from "react"
import {
  sanitizeCanton,
  sanitizeFirstChar,
  sanitizeLanguage,
} from "@/utils/sanitizeQueries"
import SelectSingleLanguage from "@/ui/Autocomplete/selectSingleLanguage"

type Query = ParsedUrlQuery & {
  q?: string
  canton?: string
  firstChar?: string
  language?: string
}

const Home: NextPage = () => {
  const { t } = useTranslation("common")
  const router = useRouter()
  const query = router.query as Query
  const me = useMe().me
  const { sanitizedCanton, sanitizedFirstChar, sanitizedLanguage } = useMemo(
    () => ({
      sanitizedCanton: sanitizeCanton(query.canton),
      sanitizedFirstChar: sanitizeFirstChar(query.firstChar),
      sanitizedLanguage: sanitizeLanguage(query.language),
    }),
    [query.canton, query.firstChar, query.language],
  )
  const { onDataCountChange, ...paginationProps } = usePaginationState()

  const {
    data,
    previousData,
    loading: loadingTermsQuery,
  } = useTermsQuery({
    offset: (paginationProps.pageIndex - 1) * paginationProps.pageSize,
    limit: paginationProps.pageSize,
    slug: query.q,
    canton: sanitizedCanton,
    firstChar: sanitizedFirstChar,
    language: sanitizedLanguage,
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
        <SelectSingleLanguage
          value={sanitizedLanguage}
          onChange={(language) => setQueryOnPage(router, { language })}
          placeholder={t("filterBy.language")}
        />
        <SelectSingleLocation
          mode="canton"
          value={sanitizedCanton}
          onChange={(canton) => setQueryOnPage(router, { canton })}
          placeholder={t("filterBy.canton")}
          disabled={loadingTermsQuery}
          groupOptions
        />
        {!query.q ? (
          <Accordion
            content={[
              {
                label: t("filterBy.firstChar"),
                expanded: !!sanitizedFirstChar,
                children: (
                  <SelectLetter
                    value={sanitizedFirstChar}
                    onChange={(firstChar) =>
                      setQueryOnPage(router, {
                        firstChar:
                          sanitizedFirstChar === firstChar ? null : firstChar,
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
