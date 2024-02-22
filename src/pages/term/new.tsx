import { GetStaticProps, NextPage } from "next"
import Layout from "@/features/layout/layout"
import NewTermForm from "@/features/termForms/newTermForm"
import { useMe } from "@/hooks/useMe"
import { getStaticPropsTranslations } from "@/utils/i18n"

const NewTermPage: NextPage = () => {
  const { me } = useMe()

  return (
    <Layout hideSidebar={!me}>
      <NewTermForm authorId={me?.id} />
    </Layout>
  )
}

export default NewTermPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await getStaticPropsTranslations(locale)) },
})
