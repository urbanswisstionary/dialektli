import type { FC } from "react"
import Box from "@mui/joy/Box"
import Typography from "@mui/joy/Typography"
import SelectLocale from "@/ui/Select/selectLocale"
import NextLink from "next/link"
import JoyLink from "@mui/joy/Link"
import { useTranslation } from "next-i18next"
import { companyName } from "@/config/constants"
import Stack from "@mui/joy/Stack"
import { useRouter } from "next/router"

const links = [
  { href: "/about", label: "about" },
  { href: "/contact-us", label: "contact" },
  { href: "/tos", label: "termsOfService" },
  { href: "/privacy-policy", label: "privacyPolicy" },
  { href: "/dmca", label: "dmca" },
  { href: "/bug-report", label: "bugReport" },
] as const

const Footer: FC = () => {
  const { t } = useTranslation("common", { keyPrefix: "layout.footer" })
  const pathname = useRouter().pathname

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
          direction={{ xs: "column", md: "row" }}
          flexWrap="wrap"
          gap={2}
          alignItems="center"
          justifyContent={{ xs: "center", md: "space-between" }}
        >
          {links.map(({ href, label }, i) => {
            const active = pathname === href
            return (
              <JoyLink
                key={i}
                href={href}
                component={NextLink}
                color={active ? "primary" : "neutral"}
                sx={[
                  {
                    transition: "transform 0.1s ease",
                    ":hover": {
                      textDecoration: "none",
                      transform: "scale(1.05)",
                    },
                  },
                  active
                    ? { textDecoration: "underline", pointerEvents: "none" }
                    : {},
                ]}
              >
                {t(label)}
              </JoyLink>
            )
          })}
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
