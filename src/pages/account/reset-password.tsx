import Typography from "@mui/joy/Typography"
import Stack from "@mui/joy/Stack"
import LayoutWithImage from "@/features/layout/layoutWithImage"
import type { GetStaticProps, NextPage } from "next"
import ResetPasswordForm from "@/features/Auth/signinSignup/components/resetPassword"
import RecaptchaProvider from "@/providers/Recaptcha"
import { getStaticPropsTranslations } from "@/utils/i18n"
import { useTranslation } from "next-i18next"
import { NextSeo } from "next-seo"

const SigninPage: NextPage = () => {
  const { t } = useTranslation("common", {
    keyPrefix: "auth.resetPasswordPage",
  })
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
        <LayoutWithImage>
          <Stack gap={1}>
            <Typography level="h3">{t("title")}</Typography>
          </Stack>
          <Stack gap={4}>
            <ResetPasswordForm />
          </Stack>
        </LayoutWithImage>
      </RecaptchaProvider>
    </>
  )
}

export default SigninPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await getStaticPropsTranslations(locale)) },
})
