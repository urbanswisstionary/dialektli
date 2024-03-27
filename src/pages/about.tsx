import type { GetStaticProps, NextPage } from "next"
import Layout from "@/features/layout/layout"
import Typography from "@mui/joy/Typography"
import { getStaticPropsTranslations } from "@/utils/i18n"
import Link from "@mui/joy/Link"
import HeadProvider from "@/providers/Head"
import { useTranslation, Trans } from "next-i18next"

const AboutPage: NextPage = () => {
  const { t } = useTranslation("about")

  return (
    <>
      <HeadProvider title={t("title")} pagePathname={"/about"} />
      <Layout hideSidebar>
        <Typography level="h1" textAlign="center" mb={5}>
          {t("title")}
        </Typography>
        {t("paragraphs", { returnObjects: true }).map((content, i) => (
          <Typography level="body-lg" py={1} key={i}>
            <Trans
              t={t}
              i18nKey={`paragraphs.${i}` as any} // TODO: Fix this type error
              components={[<Link key={0} target="_blank" />]}
            >
              {content}
            </Trans>
          </Typography>
        ))}
      </Layout>
    </>
  )
}

export default AboutPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await getStaticPropsTranslations(locale, "about")) },
})
