import JoiLink from "@mui/joy/Link"
import Link from "next/link"
import Typography from "@mui/joy/Typography"
import Stack from "@mui/joy/Stack"
import GoogleIcon from "@/ui/icons/GoogleIcon"
import { signIn } from "next-auth/react"
import SignupForm from "@/features/Auth/signinSignup/signup"
import LayoutWithImage from "@/features/layout/layoutWithImage"
import type { GetStaticProps, NextPage } from "next"
import Divider from "@mui/joy/Divider"
import Button from "@/ui/Button"
import RecaptchaProvider from "@/providers/Recaptcha"
import { getStaticPropsTranslations } from "@/utils/i18n"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { NextSeo } from "next-seo"

const SignupPage: NextPage = () => {
  const { t } = useTranslation("common", { keyPrefix: "auth.signupPage" })
  const router = useRouter()
  useEffect(() => {
    router.replace("signin") // signup with credentials is not yet available for now just redirect to signin
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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
            <Typography level="body-sm">
              {t("alreadyHaveAccount")}{" "}
              <JoiLink component={Link} href="/account/signin" level="title-sm">
                {t("signIn")}
              </JoiLink>
            </Typography>
          </Stack>
          <Stack gap={4}>
            <SignupForm />
          </Stack>
          <Divider>{t("or")}</Divider>
          <Button
            startDecorator={<GoogleIcon />}
            onClick={() => signIn("google")}
          >
            {t("withGoogle")}
          </Button>
        </LayoutWithImage>
      </RecaptchaProvider>
    </>
  )
}

export default SignupPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await getStaticPropsTranslations(locale)) },
})
