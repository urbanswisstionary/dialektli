import { useMe } from "@/hooks/useUsers"
import Layout from "@/features/layout/layout"
import SearchExpressionsInput from "@/ui/SearchExpressionsInput"
import Box from "@mui/joy/Box"
import Stack from "@mui/joy/Stack"
import { GetStaticProps, NextPage } from "next"
import { useExpressionsQuery } from "@/hooks/useExpressions"
import SelectSingleLocation from "@/ui/Autocomplete/selectSingleLocation"
import { ParsedUrlQuery } from "querystring"
import { useRouter } from "next/router"
import { setQueryOnPage } from "@/utils/setQueryOnPage"
import { usePaginationState } from "@/hooks/usePaginationState"
import NewExpressionButton from "@/ui/NewExpressionButton"
import { useTranslation } from "next-i18next"
import { getStaticPropsTranslations } from "@/utils/i18n"
import { useMemo } from "react"
import { sanitizeCanton, sanitizeFirstChar } from "@/utils/sanitizeQueries"
import dynamic from "next/dynamic"
import HeadProvider from "@/providers/Head"

const SelectLetter = dynamic(() => import("@/ui/Select/selectLetter"), {
  ssr: false,
})
const Accordion = dynamic(() => import("@/ui/Accordion"), { ssr: false })
const ExpressionCardsList = dynamic(
  () => import("@/features/expression/expressionCardsList"),
  { ssr: false },
)

type Query = ParsedUrlQuery & {
  q?: string
  canton?: string
  firstChar?: string
  author?: string
}

const Home: NextPage = () => {
  const { t } = useTranslation("common")
  const router = useRouter()
  const query = router.query as Query
  const me = useMe().me
  const { sanitizedQ, sanitizedCanton, sanitizedFirstChar, sanizedAuthor } =
    useMemo(() => {
      const trimmedQ = query.q?.trim() ?? ""
      const trimmedAuthor = query.author?.trim() ?? ""
      return {
        sanitizedCanton: sanitizeCanton(query.canton),
        sanitizedFirstChar: sanitizeFirstChar(query.firstChar),
        sanitizedQ: trimmedQ.length ? trimmedQ : undefined,
        sanizedAuthor: trimmedAuthor.length ? trimmedAuthor : undefined,
      }
    }, [query])

  const { onDataCountChange, ...paginationProps } = usePaginationState()

  const {
    data,
    previousData,
    loading: loadingExpressionsQuerysQuery,
  } = useExpressionsQuery({
    offset: (paginationProps.pageIndex - 1) * paginationProps.pageSize,
    limit: paginationProps.pageSize,
    slug: sanitizedQ,
    canton: sanitizedCanton,
    firstChar: sanitizedFirstChar,
    authorName: sanizedAuthor,
  })

  const expressionsQuery =
    data?.expressionsQuery ?? previousData?.expressionsQuery
  onDataCountChange(expressionsQuery?.count)

  return (
    <>
      <HeadProvider />
      <Layout hideSidebar={!me}>
        <Stack sx={{ mt: 1, mb: 3, gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column-reverse", sm: "row" },
              gap: "1rem",
            }}
          >
            <SearchExpressionsInput
              sx={{ flex: 1 }}
              disabled={loadingExpressionsQuerysQuery}
            />
            <NewExpressionButton
              sx={{ flex: 1 }}
              disabled={loadingExpressionsQuerysQuery}
            />
          </Box>
          <SelectSingleLocation
            mode="canton"
            value={sanitizedCanton}
            onChange={(canton) => setQueryOnPage(router, { canton })}
            placeholder={t("filterBy.canton")}
            disabled={loadingExpressionsQuerysQuery}
            groupOptions
          />
          {!sanitizedQ ? (
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
                      disabled={loadingExpressionsQuerysQuery}
                    />
                  ),
                },
              ]}
            />
          ) : null}
        </Stack>
        <ExpressionCardsList
          expressions={expressionsQuery?.expressions}
          paginationProps={paginationProps}
          loading={loadingExpressionsQuerysQuery}
        />
      </Layout>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await getStaticPropsTranslations(locale)) },
})
