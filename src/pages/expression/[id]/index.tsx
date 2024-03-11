import type { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"
import Layout from "@/features/layout/layout"
import { useMe } from "@/hooks/useUsers"
import { ParsedUrlQuery } from "querystring"
import { TermFragment, useTerm } from "@/hooks/useTerms"
import { getFragmentData } from "@@/generated"
import dynamic from "next/dynamic"
import { getStaticPropsTranslations } from "@/utils/i18n"
import CircularProgress from "@mui/joy/CircularProgress"
import Stack from "@mui/joy/Stack"
import { useTranslation } from "next-i18next"
import HeadProvider from "@/providers/Head"

const TermCard = dynamic(() => import("@/features/expression/expressionCard"), {
  ssr: false,
})

type Query = ParsedUrlQuery & { id: string }

const ExpressionIdPage: NextPage = () => {
  const { t } = useTranslation("common")

  const { me, loading: loadingMe } = useMe()
  const router = useRouter()
  const query = router.query as Query

  const { data, loading: loadingTerm } = useTerm(query.id, !query.id)

  const loading = loadingMe || loadingTerm
  const term = getFragmentData(TermFragment, data?.term)

  return (
    <>
      <HeadProvider
        title={term?.title}
        description={term?.content}
        pagePathname={`/expression/${term?.id}`}
      />

      <Layout hideSidebar={!me}>
        {loading ? (
          <Stack>
            <CircularProgress
              sx={{ alignSelf: "center", my: 5 }}
              size="lg"
              variant="soft"
            />
          </Stack>
        ) : term ? (
          <TermCard term={term} disableActions={!me} />
        ) : (
          <>{t("noData")}</>
        )}
      </Layout>
    </>
  )
}

export default ExpressionIdPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await getStaticPropsTranslations(locale)) },
})

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" }
}
