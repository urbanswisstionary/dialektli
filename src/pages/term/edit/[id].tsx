import type { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"
import Layout from "@/features/layout/layout"
import { useMe } from "@/hooks/useMe"
import { ParsedUrlQuery } from "querystring"
import { TermFragment, useTerm } from "@/hooks/useTerms"
import { getFragmentData } from "@@/generated"
import dynamic from "next/dynamic"
import { getStaticPropsTranslations } from "@/utils/i18n"
import CircularProgress from "@mui/joy/CircularProgress"
import Stack from "@mui/joy/Stack"
import { useTranslation } from "next-i18next"

const EditTermForm = dynamic(
  () => import("@/features/termForms/editTermForm"),
  { ssr: false },
)

type Query = ParsedUrlQuery & { id: string; review?: string }

const EditTermPage: NextPage = () => {
  const { t } = useTranslation("common")

  const { me, isAdmin, loading: loadingMe } = useMe()
  const router = useRouter()
  const query = router.query as Query

  const { data, loading: loadingTerm } = useTerm(query.id)

  const loading = loadingMe || loadingTerm
  const term = getFragmentData(TermFragment, data?.term)
  const authorized = me?.id === term?.author.id || isAdmin

  return (
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
        <EditTermForm
          term={term}
          authorized={authorized}
          reviewBeforPublish={query.review !== undefined}
          anonymous={!me}
        />
      ) : (
        <>{t("noData")}</>
      )}
    </Layout>
  )
}

export default EditTermPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await getStaticPropsTranslations(locale)) },
})

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" }
}
