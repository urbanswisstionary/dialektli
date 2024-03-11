import { GetStaticProps, NextPage } from "next"
import Layout from "@/features/layout/layout"
import CreateExpressionForm from "@/features/expression/createExpressionForm"
import { useMe } from "@/hooks/useUsers"
import { getStaticPropsTranslations } from "@/utils/i18n"
import { NextSeo } from "next-seo"
import { ParsedUrlQuery } from "querystring"
import CircularProgress from "@mui/joy/CircularProgress"
import { useRouter } from "next/router"
import Stack from "@mui/joy/Stack"

type Query = ParsedUrlQuery & {
  synonym?: string
}

const NewTermPage: NextPage = () => {
  const { me, loading: loadingMe } = useMe()
  const router = useRouter()
  const query = router.query as Query

  if (!loadingMe && !me) {
    const redirectParam = `?redirect=/expression/new${query.synonym ? `?synonym=${query.synonym}` : ""}`
    router?.push(`/account/signin${redirectParam}`)
    return <>Redirecting ...</>
  }

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
        {loadingMe ? (
          <Stack>
            <CircularProgress
              sx={{ alignSelf: "center", my: 5 }}
              size="lg"
              variant="soft"
            />
          </Stack>
        ) : (
          <CreateExpressionForm />
        )}
      </Layout>
    </>
  )
}

export default NewTermPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await getStaticPropsTranslations(locale)) },
})
