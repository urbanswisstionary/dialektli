"use client"

import { useTranslations } from "next-intl"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

export default function BugReportPage() {
  const t = useTranslations()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement bug report submission
    alert(t("bugReport.thankYou"))
  }

  return (
    <Stack spacing={3} sx={{ py: 4 }}>
      <Card elevation={2}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
            {t("bugReport.title")}
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 3 }}>
            {t("bugReport.subtitle")}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                type="email"
                label={t("bugReport.email")}
                required
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label={t("bugReport.bugDescription.label")}
                helperText={t("bugReport.bugDescription.helperText")}
                required
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label={t("bugReport.reproductionSteps.label")}
                helperText={t("bugReport.reproductionSteps.helperText")}
                placeholder={t("bugReport.reproductionSteps.placeholder")}
                required
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                label={t("bugReport.expectedBehavior.label")}
                helperText={t("bugReport.expectedBehavior.helperText")}
                required
              />
              <TextField
                fullWidth
                label={t("bugReport.desktopDescription.label")}
                helperText={t("bugReport.desktopDescription.helperText")}
              />
              <TextField
                fullWidth
                label={t("bugReport.mobileDescription.label")}
                helperText={t("bugReport.mobileDescription.helperText")}
              />
              <TextField
                fullWidth
                label={t("bugReport.browserDetails.label")}
                helperText={t("bugReport.browserDetails.helperText")}
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                label={t("bugReport.additionalContext.label")}
                helperText={t("bugReport.additionalContext.helperText")}
              />
              <Button type="submit" variant="contained" size="large">
                {t("bugReport.submit")}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Stack>
  )
}
