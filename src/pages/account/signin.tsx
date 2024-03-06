import Typography from "@mui/joy/Typography"
import Stack from "@mui/joy/Stack"
import GoogleIcon from "@/ui/icons/GoogleIcon"
import { signIn } from "next-auth/react"
import LayoutWithImage from "@/features/layout/layoutWithImage"
import type { GetStaticProps, NextPage } from "next"
import Button from "@/ui/Button"

import { getStaticPropsTranslations } from "@/utils/i18n"
import { useTranslation } from "next-i18next"
import { NextSeo } from "next-seo"
// import FacebookIcon from "@/ui/icons/FacebookIcon"
import { BuiltInProviderType } from "next-auth/providers"
import { ParsedUrlQuery } from "querystring"
import { useRouter } from "next/router"

type Query = ParsedUrlQuery & {
  redirect?: string
}

const SigninPage: NextPage = () => {
  const { t } = useTranslation("common", { keyPrefix: "auth.signinPage" })

  const router = useRouter()
  const query = router.query as Query

  const onClick = (provider: BuiltInProviderType) => {
    signIn(provider, {
      redirect: false,
      callbackUrl: `${query.redirect ? query.redirect : "/"}`,
    })
  }

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
      <LayoutWithImage>
        <Stack gap={4}>
          <Typography
            level="h3"
            textAlign={"center"}
            textTransform={"uppercase"}
          >
            {t("title")}
          </Typography>
          <Button
            startDecorator={<GoogleIcon />}
            onClick={() => onClick("google")}
          >
            {t("withGoogle")}
          </Button>

          {/*  facebook login does not yet work, difficulties setting up authentication on facebook's side */}
          {/* <Button
            startDecorator={<FacebookIcon />}
            onClick={() => onClick("facebook")}
          >
            {t("withFacebook")}
          </Button> */}
        </Stack>
      </LayoutWithImage>
    </>
  )
}
export default SigninPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await getStaticPropsTranslations(locale)) },
})
