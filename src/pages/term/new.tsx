import { GetStaticProps, NextPage } from "next"
import Layout from "@/features/layout/layout"
import NewTermForm from "@/features/termForms/newTermForm"
import { useMe } from "@/hooks/useMe"
import { getStaticPropsTranslations } from "@/utils/i18n"
import { NextSeo } from "next-seo"
import dynamic from "next/dynamic"

const RecaptchaProvider = dynamic(() => import("@/providers/Recaptcha"), {
  ssr: false,
})
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
      <RecaptchaProvider>
        <Layout hideSidebar={!me}>
          <NewTermForm authorId={me?.id} />
        </Layout>
      </RecaptchaProvider>
    </>
  )
}

export default NewTermPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await getStaticPropsTranslations(locale)) },
})
