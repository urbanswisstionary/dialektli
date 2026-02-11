"use client"

import { useTranslations } from "next-intl"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"

export default function DMCAPage() {
  const t = useTranslations()

  return (
    <Stack spacing={3} sx={{ py: 4 }}>
      <Card elevation={2}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            {t("layout.footer.dmca")}
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            {t("legal.dmca.section1.title")}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
            {t("legal.dmca.section1.content")}
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            {t("legal.dmca.section2.title")}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
            {t("legal.dmca.section2.content")}
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            {t("legal.dmca.section3.title")}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
            {t("legal.dmca.section3.content")}
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            {t("legal.dmca.section4.title")}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
            {t("legal.dmca.section4.content")}
          </Typography>

          <Typography
            variant="body2"
            sx={{ mt: 5, fontStyle: "italic", color: "text.secondary" }}
          >
            {t("legal.lastUpdated")}: {new Date().toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  )
}
