/* eslint-disable @next/next/no-img-element */
import Box from "@mui/joy/Box"
import AspectRatio from "@mui/joy/AspectRatio"
import type { GetStaticProps, NextPage } from "next"
import Layout from "@/features/layout/layout"
import Typography from "@mui/joy/Typography"
import { getStaticPropsTranslations } from "@/utils/i18n"
import List from "@mui/joy/List"
import ListItem from "@mui/joy/ListItem"
import Link from "@mui/joy/Link"
import NextLink from "next/link"

const companyName = "UrbanSwisstionary"

const PrivacyPolicyPage: NextPage = () => {
  return (
    <Layout hideSidebar>
      {/* Terms of use */}
      <Typography level="h1" textAlign="center" mb={5}>
        Privacy Policy
      </Typography>
      <Box pt={10}>
        <AspectRatio objectFit="contain" maxHeight={500}>
          <img
            src="https://freesvg.org/img/under-construction_geek_man_01.png"
            style={{ background: "white" }}
            alt="Under construction"
          />
        </AspectRatio>
      </Box>
    </Layout>
  )
}

export default PrivacyPolicyPage
