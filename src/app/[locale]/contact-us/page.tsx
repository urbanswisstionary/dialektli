"use client"

import { useTranslations } from "next-intl"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

export default function ContactUsPage() {
  const t = useTranslations()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement contact form submission
    alert(t("contactUs.thankYou"))
  }

  return (
    <Stack spacing={3} sx={{ py: 4 }}>
      <Card elevation={2}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
            {t("layout.footer.contact")}
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 3 }}>
            {t("contactUs.subtitle")}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField fullWidth label={t("contactUs.name")} required />
              <TextField
                fullWidth
                type="email"
                label={t("contactUs.email")}
                required
              />
              <TextField fullWidth label={t("contactUs.subject")} required />
              <TextField
                fullWidth
                multiline
                rows={6}
                label={t("contactUs.message")}
                required
              />
              <Button type="submit" variant="contained" size="large">
                {t("actions.submit")}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Stack>
  )
}
