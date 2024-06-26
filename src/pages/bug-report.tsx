import Typography from "@mui/joy/Typography"
import Stack from "@mui/joy/Stack"
import Layout from "@/features/layout/layout"
import type { GetStaticProps, NextPage } from "next"
import RecaptchaProvider from "@/providers/Recaptcha"
import { getStaticPropsTranslations } from "@/utils/i18n"
import { useTranslation } from "next-i18next"
import { NextSeo } from "next-seo"
import BugReportForm from "@/features/bugReportForm"

const SignupPage: NextPage = () => {
  const { t } = useTranslation("common", { keyPrefix: "bugReport" })

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
        title={t("title")}
      />
      <RecaptchaProvider>
        <Layout hideSidebar>
          <Stack gap={1}>
            <Typography level="h1" textAlign="center">
              {t("title")}
            </Typography>
            <Typography level="body-sm">{t("subtitle")}</Typography>
          </Stack>
          <Stack gap={4}>
            <BugReportForm />
          </Stack>
        </Layout>
      </RecaptchaProvider>
    </>
  )
}

export default SignupPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await getStaticPropsTranslations(locale)) },
})
