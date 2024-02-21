import type { NextPage } from "next"
import { useRouter } from "next/router"
import Layout from "@/features/layout/layout"
import { useMe } from "@/hooks/useMe"
import { ParsedUrlQuery } from "querystring"
import { TermFragment, useTerm } from "@/hooks/useTerms"
import { getFragmentData } from "@@/generated"
import dynamic from "next/dynamic"

const EditTermForm = dynamic(
  () => import("@/features/termForms/editTermForm"),
  { ssr: false },
)

type Query = ParsedUrlQuery & { id: string; review?: string }

const EditTermPage: NextPage = () => {
  const { me, isAdmin, loading: loadingMe } = useMe()
  const router = useRouter()
  const query = router.query as Query

  const { data, loading: loadingTerm } = useTerm(query.id)

  if (loadingMe || loadingTerm) return <>Loading...</>

  const term = getFragmentData(TermFragment, data?.term)
  const authorized = me?.id === term?.author.id || isAdmin
  if (!term) {
    router.push("/")
    return <>Term not found...</>
  }

  return (
    <Layout hideSidebar={!me}>
      <EditTermForm
        term={term}
        authorized={authorized}
        reviewBeforPublish={query.review !== undefined}
        anonymous={!me}
      />
    </Layout>
  )
}

export default EditTermPage
