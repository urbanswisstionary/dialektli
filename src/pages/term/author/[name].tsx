import type { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"
import Layout from "@/features/layout/layout"
import { useMe } from "@/hooks/useUsers"
import { ParsedUrlQuery } from "querystring"
import { useTermsQuery } from "@/hooks/useTerms"
import dynamic from "next/dynamic"
import { getStaticPropsTranslations } from "@/utils/i18n"
import { usePaginationState } from "@/hooks/usePaginationState"
import { NoSEO } from "@/providers/Head"

const TermsCardsList = dynamic(
  () => import("@/features/termsCardsList/index"),
  {
    ssr: false,
  },
)

type Query = ParsedUrlQuery & { name: string }

const TermIdPage: NextPage = () => {
  const { me, loading: loadingMe } = useMe()
  const router = useRouter()
  const query = router.query as Query
  const {
    data,
    previousData,
    loading: loadingTermsQuery,
  } = useTermsQuery({ authorName: query.name })

  const { onDataCountChange, ...paginationProps } = usePaginationState()

  const loading = loadingMe || loadingTermsQuery

  const termsQuery = data?.termsQuery ?? previousData?.termsQuery
  onDataCountChange(termsQuery?.count)

  return (
    <>
      <NoSEO />
      <Layout hideSidebar={!me}>
        <TermsCardsList
          terms={termsQuery?.terms}
          paginationProps={paginationProps}
          loading={loading}
        />
      </Layout>
    </>
  )
}

export default TermIdPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await getStaticPropsTranslations(locale)) },
})

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" }
}
