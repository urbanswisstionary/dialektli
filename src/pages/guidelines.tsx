import { GetStaticProps, NextPage } from "next"
import Layout from "@/features/layout/layout"
import Typography from "@mui/joy/Typography"
import GuidelinesList from "@/ui/GuidelineList"
import { getStaticPropsTranslations } from "@/utils/i18n"
import { useTranslation } from "next-i18next"
import HeadProvider from "@/providers/Head"

const ContentGuidlines: NextPage = () => {
  const { t } = useTranslation("common", { keyPrefix: "guidelinesPage" })

  return (
    <>
      <HeadProvider title={t("title")} pagePathname="/guidelines" />
      <Layout hideSidebar={true}>
        <Typography level="h1" textAlign="center">
          {t("title")}
        </Typography>
        <Typography level="title-md">{t("description")}</Typography>
        <GuidelinesList
          mode="dos"
          guiedlines={t("dos", { returnObjects: true })}
        />
        <GuidelinesList
          mode="dont's"
          guiedlines={t("donts", { returnObjects: true })}
        />
      </Layout>
    </>
  )
}

export default ContentGuidlines

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await getStaticPropsTranslations(locale)) },
})
