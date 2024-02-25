import Layout from "@/features/layout/layout"
import Box from "@mui/joy/Box"
import { GetStaticProps, NextPage } from "next"
import { useTranslation } from "next-i18next"
import { getStaticPropsTranslations } from "@/utils/i18n"
import Typography from "@mui/joy/Typography"
import { Button } from "@mui/joy"
import SearchOffIcon from "@mui/icons-material/SearchOff"
import { useRouter } from "next/router"
import { NextSeo } from "next-seo"

const Home: NextPage = () => {
  const { t } = useTranslation("common", { keyPrefix: "404Page" })
  const router = useRouter()

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
      <Layout hideSidebar>
        <Box
          sx={{
            backgroundColor: "background.paper",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 4,
            pt: { xs: 5, sm: 10, md: 15 },
            height: "100%",
            margin: "auto 0",
            textAlign: "center",
          }}
        >
          <Typography
            level="h1"
            sx={{ margin: "auto" }}
            endDecorator={<SearchOffIcon sx={{ fontSize: 36 }} />}
          >
            {t("title")}
          </Typography>
          <Typography level="h2">{t("description")}</Typography>
          <Button onClick={() => router.push("/")}>{t("toHome")}</Button>
        </Box>
      </Layout>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await getStaticPropsTranslations(locale)) },
})
