import type { FC } from "react"
import Box from "@mui/joy/Box"
import Typography from "@mui/joy/Typography"
import SelectLocale from "@/ui/Select/selectLocale"
import Grid, { GridProps } from "@mui/joy/Grid"
import NextLink from "next/link"
import JoyLink, { LinkProps } from "@mui/joy/Link"
import { useTranslation } from "next-i18next"
import { companyName } from "@/config/constants"
import Stack from "@mui/joy/Stack"

const Footer: FC = () => {
  const { t } = useTranslation("common", { keyPrefix: "layout.footer" })
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        maxWidth: "1024px",
        margin: "0 auto",
        mt: "auto",
        pt: 10,
      }}
    >
      <Stack gap={5}>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          flexWrap="wrap"
          gap={2}
          alignItems="center"
          justifyContent={{ xs: "center", md: "space-between" }}
        >
          <Link href="/tos">{t("termsOfService")}</Link>
          <Link href="/privacy-policy">{t("privacyPolicy")}</Link>
          <Link href="/dmca">{t("dmca")}</Link>
          <Link href="/bug-report">{t("bugReport")}</Link>
          <SelectLocale />
        </Stack>
        <Typography level="body-xs" textAlign="center">
          © {companyName} {new Date().getFullYear()}
        </Typography>
      </Stack>
    </Box>
  )
}

export default Footer

const Link: FC<LinkProps> = ({ sx, ...props }) => (
  <JoyLink
    component={NextLink}
    color="neutral"
    sx={[
      {
        transition: "transform 0.1s ease",
        ":hover": { textDecoration: "none", transform: "scale(1.05)" },
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
    {...props}
  />
)
