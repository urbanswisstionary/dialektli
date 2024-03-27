import Typography from "@mui/joy/Typography"
import Stack from "@mui/joy/Stack"
import Layout from "@/features/layout/layout"
import type { GetStaticProps, NextPage } from "next"
import RecaptchaProvider from "@/providers/Recaptcha"
import { getStaticPropsTranslations } from "@/utils/i18n"
import { useTranslation } from "next-i18next"
import { NextSeo } from "next-seo"
import ContactUsForm from "@/features/contactUsForm"

const SignupPage: NextPage = () => {
  const { t } = useTranslation("common", { keyPrefix: "contactUs" })

  return (
    <>
      <NextSeo title={t("title")} />
      <RecaptchaProvider>
        <Layout hideSidebar>
          <Stack gap={1}>
            <Typography level="h1" textAlign="center">
              {t("title")}
            </Typography>
          </Stack>
          <Stack gap={4}>
            <ContactUsForm />
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
