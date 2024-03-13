import type { GetStaticProps, NextPage } from "next"
import Layout from "@/features/layout/layout"
import Typography from "@mui/joy/Typography"
import { getStaticPropsTranslations } from "@/utils/i18n"
import List from "@mui/joy/List"
import ListItem from "@mui/joy/ListItem"
import Link from "@mui/joy/Link"
import NextLink from "next/link"
import HeadProvider from "@/providers/Head"

const TermsOfServicePage: NextPage = () => {
  return (
    <>
      <HeadProvider title={"About"} pagePathname={"/about"} />
      <Layout hideSidebar></Layout>
    </>
  )
}

export default TermsOfServicePage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await getStaticPropsTranslations(locale)) },
})
