"use client"

import { useTranslations } from "next-intl"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Box from "@mui/material/Box"

export default function PrivacyPolicyPage() {
  const t = useTranslations()

  return (
    <Stack spacing={3} sx={{ py: 4, maxWidth: "900px", mx: "auto", px: 3 }}>
      <Card elevation={3}>
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ mb: 4, fontWeight: 600, color: "primary.main" }}
          >
            {t("legal.privacyPolicy.title")}
          </Typography>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 2 }}>
            {t("legal.privacyPolicy.description.0")}
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            {[0, 1].map((index) => (
              <Box component="li" key={index} sx={{ mb: 0.5 }}>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  {t(`legal.privacyPolicy.description.1.${index}` as any)}
                </Typography>
              </Box>
            ))}
          </Box>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
            {t("legal.privacyPolicy.description.2")}
          </Typography>

          <Box
            sx={{ my: 4, p: 3, bgcolor: "background.default", borderRadius: 2 }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 600, color: "primary.main" }}
            >
              {t("legal.privacyPolicy.tableOfContent.title")}
            </Typography>
            <Box component="ol" sx={{ pl: 3, mt: 2 }}>
              {[...Array(10)].map((_, index) => (
                <Box component="li" key={index} sx={{ mb: 1 }}>
                  <Typography variant="body1">
                    {t(
                      `legal.privacyPolicy.tableOfContent.list.${index}` as any,
                    )}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Typography
            variant="h5"
            gutterBottom
            sx={{ mt: 5, mb: 2, fontWeight: 600 }}
          >
            {t("legal.privacyPolicy.informationWeCollect.title")}
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
            {t("legal.privacyPolicy.informationWeCollect.paragraph")}
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{ mt: 5, mb: 2, fontWeight: 600 }}
          >
            {t("legal.privacyPolicy.howWeUseYourInformation.title")}
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
            {t("legal.privacyPolicy.howWeUseYourInformation.paragraph")}
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{ mt: 5, mb: 2, fontWeight: 600 }}
          >
            {t("legal.privacyPolicy.whenDoWeShareYourData.title")}
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
            {t("legal.privacyPolicy.whenDoWeShareYourData.paragraph")}
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{ mt: 5, mb: 2, fontWeight: 600 }}
          >
            {t("legal.privacyPolicy.yourPrivacyRights.title")}
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
            {t("legal.privacyPolicy.yourPrivacyRights.paragraph")}
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{ mt: 5, mb: 2, fontWeight: 600 }}
          >
            {t(
              "legal.privacyPolicy.informationRequestsAndDeletionRequests.title",
            )}
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
            {t(
              "legal.privacyPolicy.informationRequestsAndDeletionRequests.paragraph",
            )}
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{ mt: 5, mb: 2, fontWeight: 600 }}
          >
            {t("legal.privacyPolicy.dataStorage.title")}
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
            {t("legal.privacyPolicy.dataStorage.paragraph")}
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{ mt: 5, mb: 2, fontWeight: 600 }}
          >
            {t("legal.privacyPolicy.security.title")}
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
            {t("legal.privacyPolicy.security.paragraph")}
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{ mt: 5, mb: 2, fontWeight: 600 }}
          >
            {t("legal.privacyPolicy.children.title")}
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
            {t("legal.privacyPolicy.children.paragraph")}
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{ mt: 5, mb: 2, fontWeight: 600 }}
          >
            {t("legal.privacyPolicy.changes.title")}
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
            {t("legal.privacyPolicy.changes.paragraph")}
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{ mt: 5, mb: 2, fontWeight: 600 }}
          >
            {t("legal.privacyPolicy.questions.title")}
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
            {t("legal.privacyPolicy.questions.paragraph")}
          </Typography>

          <Box sx={{ mt: 6, pt: 3, borderTop: 1, borderColor: "divider" }}>
            <Typography
              variant="body2"
              sx={{ fontStyle: "italic", color: "text.secondary" }}
            >
              {t("legal.lastUpdated")}: February 2024
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  )
}
