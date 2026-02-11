"use client"

import type { FC } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import MuiLink from "@mui/material/Link"
import { Link, usePathname } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import Stack from "@mui/material/Stack"

const companyName = "Dialektli"

const footerSections = {
  about: [{ href: "/about", label: "about" }],
  legal: [
    { href: "/tos", label: "termsOfService" },
    { href: "/privacy-policy", label: "privacyPolicy" },
    { href: "/dmca", label: "dmca" },
    { href: "/accessibility", label: "accessibility" },
  ],
  connect: [
    { href: "/contact-us", label: "contact" },
    { href: "/bug-report", label: "bugReport" },
  ],
} as const

const Footer: FC = () => {
  const t = useTranslations()
  const pathname = usePathname()

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        py: 8,
        px: 3,
        borderTop: 1,
        borderColor: "divider",
        bgcolor: "background.default",
      }}
    >
      <Stack gap={6}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          gap={{ xs: 4, sm: 6 }}
          justifyContent="space-between"
        >
          <Box flex={1}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 600,
                mb: 2,
                color: "primary.main",
              }}
            >
              {t("layout.footer.sections.about")}
            </Typography>
            <Stack spacing={1.5}>
              {footerSections.about.map(({ href, label }, i) => {
                const active = pathname === href
                return (
                  <MuiLink
                    key={i}
                    component={Link}
                    href={href}
                    color={active ? "primary" : "text.secondary"}
                    underline="hover"
                    sx={{
                      transition: "all 0.2s ease",
                      fontSize: "0.95rem",
                      ":hover": {
                        color: "primary.main",
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    {t(`layout.footer.${label}`)}
                  </MuiLink>
                )
              })}
            </Stack>
          </Box>

          <Box flex={1}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 600,
                mb: 2,
                color: "primary.main",
              }}
            >
              {t("layout.footer.sections.legal")}
            </Typography>
            <Stack spacing={1.5}>
              {footerSections.legal.map(({ href, label }, i) => {
                const active = pathname === href
                return (
                  <MuiLink
                    key={i}
                    component={Link}
                    href={href}
                    color={active ? "primary" : "text.secondary"}
                    underline="hover"
                    sx={{
                      transition: "all 0.2s ease",
                      fontSize: "0.95rem",
                      ":hover": {
                        color: "primary.main",
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    {t(`layout.footer.${label}`)}
                  </MuiLink>
                )
              })}
            </Stack>
          </Box>

          <Box flex={1}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 600,
                mb: 2,
                color: "primary.main",
              }}
            >
              {t("layout.footer.sections.connect")}
            </Typography>
            <Stack spacing={1.5}>
              {footerSections.connect.map(({ href, label }, i) => {
                const active = pathname === href
                return (
                  <MuiLink
                    key={i}
                    component={Link}
                    href={href}
                    color={active ? "primary" : "text.secondary"}
                    underline="hover"
                    sx={{
                      transition: "all 0.2s ease",
                      fontSize: "0.95rem",
                      ":hover": {
                        color: "primary.main",
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    {t(`layout.footer.${label}`)}
                  </MuiLink>
                )
              })}
            </Stack>
          </Box>
        </Stack>

        <Box
          sx={{
            borderTop: 1,
            borderColor: "divider",
            pt: 4,
          }}
        >
          <Typography
            variant="body2"
            textAlign="center"
            color="text.secondary"
            sx={{ fontSize: "0.875rem" }}
          >
            © {companyName} {new Date().getFullYear()}. All rights reserved.
          </Typography>
        </Box>
      </Stack>
    </Box>
  )
}

export default Footer
