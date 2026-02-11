"use client"

import { useTranslations } from "next-intl"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Box from "@mui/material/Box"
import Link from "@mui/material/Link"

export default function AccessibilityPage() {
  const t = useTranslations()

  const renderListItems = (items: string[]) => {
    return (
      <Box component="ul" sx={{ pl: 3, mt: 1, mb: 2 }}>
        {items.map((item, index) => (
          <Box component="li" key={index} sx={{ mb: 0.5 }}>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              {item}
            </Typography>
          </Box>
        ))}
      </Box>
    )
  }

  return (
    <Stack spacing={3} sx={{ py: 4, maxWidth: "900px", mx: "auto", px: 3 }}>
      <Card elevation={3}>
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ mb: 4, fontWeight: 600, color: "primary.main" }}
          >
            {t("accessibility.title")}
          </Typography>

          {/* Commitment */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{ mt: 4, mb: 2, fontWeight: 600 }}
          >
            {t("accessibility.commitment.title")}
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
            {t("accessibility.commitment.paragraph")}
          </Typography>

          {/* WCAG Compliance */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{ mt: 5, mb: 2, fontWeight: 600 }}
          >
            {t("accessibility.wcagCompliance.title")}
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
            {t("accessibility.wcagCompliance.paragraph")}
          </Typography>

          {/* Accessibility Features */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{ mt: 5, mb: 2, fontWeight: 600 }}
          >
            {t("accessibility.features.title")}
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 1 }}>
            {t("accessibility.features.intro")}
          </Typography>
          {renderListItems([
            t("accessibility.features.list.0" as any),
            t("accessibility.features.list.1" as any),
            t("accessibility.features.list.2" as any),
            t("accessibility.features.list.3" as any),
            t("accessibility.features.list.4" as any),
            t("accessibility.features.list.5" as any),
          ])}

          {/* Report Issues */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{ mt: 5, mb: 2, fontWeight: 600 }}
          >
            {t("accessibility.reportIssues.title")}
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 2 }}>
            {t("accessibility.reportIssues.paragraph")}
          </Typography>

          {/* Contact Information */}
          <Box
            sx={{
              mt: 4,
              p: 3,
              bgcolor: "background.default",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, color: "primary.main" }}
            >
              {t("accessibility.contact.title")}
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>
              {t("accessibility.contact.paragraph")}
            </Typography>
            <Link
              href="mailto:urbanswisstionary@gmail.com"
              sx={{
                color: "primary.main",
                textDecoration: "none",
                fontWeight: 500,
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              urbanswisstionary@gmail.com
            </Link>
          </Box>

          {/* Ongoing Efforts */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{ mt: 5, mb: 2, fontWeight: 600 }}
          >
            {t("accessibility.ongoingEfforts.title")}
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
            {t("accessibility.ongoingEfforts.paragraph")}
          </Typography>

          {/* Last Updated */}
          <Box sx={{ mt: 6, pt: 3, borderTop: 1, borderColor: "divider" }}>
            <Typography
              variant="body2"
              sx={{ fontStyle: "italic", color: "text.secondary" }}
            >
              {t("accessibility.updated")}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  )
}
