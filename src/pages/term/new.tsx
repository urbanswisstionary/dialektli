import { GetStaticProps, NextPage } from "next"
import Layout from "@/features/layout/layout"
import NewTermForm from "@/features/termForms/newTermForm"
import { useMe } from "@/hooks/useUsers"
import { getStaticPropsTranslations } from "@/utils/i18n"
import { NextSeo } from "next-seo"

const NewTermPage: NextPage = () => {
  const { me } = useMe()

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
        <NewTermForm />
      </Layout>
    </>
  )
}

export default NewTermPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await getStaticPropsTranslations(locale)) },
})
