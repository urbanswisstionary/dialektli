import Typography from "@mui/joy/Typography"
import Stack from "@mui/joy/Stack"
import GoogleIcon from "@/ui/icons/GoogleIcon"
import { signIn } from "next-auth/react"
import LayoutWithImage from "@/features/layout/layoutWithImage"
import type { GetStaticProps, NextPage } from "next"
import Button from "@/ui/Button"

import { getStaticPropsTranslations } from "@/utils/i18n"
import { useTranslation } from "next-i18next"

const SigninPage: NextPage = () => {
  const { t } = useTranslation("common", { keyPrefix: "auth.signinPage" })
  const onClick = () => {
    signIn("google", {
      redirect: false,
      callbackUrl: `${window?.location?.origin}`,
    })
  }

  return (
    <LayoutWithImage>
      <Stack gap={4}>
        <Typography level="h3" textAlign={"center"} textTransform={"uppercase"}>
          {t("title")}
        </Typography>
        <Button startDecorator={<GoogleIcon />} onClick={onClick}>
          {t("withGoogle")}
        </Button>
      </Stack>
    </LayoutWithImage>
  )
}
export default SigninPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await getStaticPropsTranslations(locale)) },
})
