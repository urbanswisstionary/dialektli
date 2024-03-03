import LayoutWithImage from "@/features/layout/layoutWithImage"
import { useMe } from "@/hooks/useMe"
import Link from "@mui/joy/Link"
import { GetStaticProps, NextPage } from "next"
import dynamic from "next/dynamic"
import NextLink from "next/link"
import { useRouter } from "next/router"
import Box from "@mui/joy/Box"
import CircularProgress from "@mui/joy/CircularProgress"
import Stack from "@mui/joy/Stack"
import { getStaticPropsTranslations } from "@/utils/i18n"
import { NoSEO } from "@/providers/Head"
import Typography from "@mui/joy/Typography"
import { useTranslation } from "next-i18next"
import NoUserFound from "@/features/Auth/profile/components/noUserFound"

const WelcomeForm = dynamic(
  () => import("@/features/Auth/profile/welcomeForm"),
  { ssr: false },
)

const WelcomePage: NextPage = () => {
  const { t } = useTranslation("common", {
    keyPrefix: "auth.profile.welcome",
  })
  const router = useRouter()
  const { me, loading: meLoading } = useMe()

  // if (me && me.name.length) {
  //   router.replace(`/account/profile`)
  //   return <>redirecting...</>
  // }

  return (
    <>
      <NoSEO />

      <LayoutWithImage>
        <Box mt={2}>
          {meLoading ? (
            <Stack direction="row" justifyContent="center" my={5}>
              <CircularProgress size="lg" variant="soft" />
            </Stack>
          ) : me ? (
            <Stack gap={5}>
              <Stack gap={1}>
                <Typography level="h3">{t("title")}</Typography>
                <Typography level="body-md">{t("description")}</Typography>
              </Stack>
              <WelcomeForm userId={me.id} />
            </Stack>
          ) : (
            <NoUserFound />
          )}
        </Box>
      </LayoutWithImage>
    </>
  )
}

export default WelcomePage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await getStaticPropsTranslations(locale)) },
})
