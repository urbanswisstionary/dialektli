/* eslint-disable @next/next/no-img-element */
import Box from "@mui/joy/Box"
import AspectRatio from "@mui/joy/AspectRatio"
import { GetStaticProps, NextPage } from "next"
import Layout from "@/features/layout/layout"
import Typography from "@mui/joy/Typography"
import { getStaticPropsTranslations } from "@/utils/i18n"
// import { useTranslation } from "next-i18next"

const DMCAPage: NextPage = () => {
  // const { t } = useTranslation("common", { keyPrefix: "guidelinesPage" })

  return (
    <Layout hideSidebar>
      <Typography level="h1" textAlign="center" mb={5}>
        The following describes the DMCA Compliance for our website.
      </Typography>

      {/* <Typography level="body-md">
        We are committed to responding to any alleged copyright violations,
        should they occur. Notice of any alleged violation should take the form
        proposed by the U.S. Digital Millennium Copyright Act as revealed at
        http://www.copyright.gov.
      </Typography> */}
      <Box pt={5}>
        <AspectRatio
          objectFit="contain"
          maxHeight={500}
          slotProps={{
            content: { sx: { background: "transparent" } },
          }}
        >
          <img
            src="https://freesvg.org/img/under-construction_geek_man_01.png"
            alt="Under construction"
          />
        </AspectRatio>
      </Box>
    </Layout>
  )
}

export default DMCAPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await getStaticPropsTranslations(locale)) },
})
