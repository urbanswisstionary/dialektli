import type { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"
import Layout from "@/features/layout/layout"
import { useMe } from "@/hooks/useUsers"
import { ParsedUrlQuery } from "querystring"
import { ExpressionFragment, useExpression } from "@/hooks/useExpressions"
import { getFragmentData } from "@@/generated"
import dynamic from "next/dynamic"
import { getStaticPropsTranslations } from "@/utils/i18n"
import CircularProgress from "@mui/joy/CircularProgress"
import Stack from "@mui/joy/Stack"
import { useTranslation } from "next-i18next"
import { NextSeo } from "next-seo"

const EditExpressionForm = dynamic(
  () => import("@/features/expression/editExpressionForm"),
  { ssr: false },
)

interface Query extends ParsedUrlQuery {
  id: string
}

const EditExpressionPage: NextPage = () => {
  const { t } = useTranslation("common")

  const { me, isAdmin, loading: loadingMe } = useMe()
  const router = useRouter()
  const query = router.query as Query

  const { data, loading: loadingExpression } = useExpression(
    query.id,
    !query.id,
  )

  const loading = loadingMe || loadingExpression
  const expression = getFragmentData(ExpressionFragment, data?.expression)
  const authorized = me?.id === expression?.author.id || isAdmin

  return (
    <>
      <NextSeo
        noindex
        nofollow
        robotsProps={{
          nosnippet: true,
          notranslate: true,
          noimageindex: true,
          noarchive: true,
          maxSnippet: -1,
          maxImagePreview: "none",
          maxVideoPreview: -1,
        }}
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
        ) : expression ? (
          <EditExpressionForm expression={expression} authorized={authorized} />
        ) : (
          <>{t("noData")}</>
        )}
      </Layout>
    </>
  )
}

export default EditExpressionPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await getStaticPropsTranslations(locale)) },
})

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" }
}
