"use client"

import { useTranslations } from "next-intl"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Box from "@mui/material/Box"

export default function TOSPage() {
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
            {t("legal.tos.title")}
          </Typography>

          {/* Description */}
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 2 }}>
            {t("legal.tos.description.0")}
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
            {t("legal.tos.description.1")}
          </Typography>

          {/* Table of Contents */}
          <Box
            sx={{ my: 4, p: 3, bgcolor: "background.default", borderRadius: 2 }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 600, color: "primary.main" }}
            >
              {t("legal.tos.tableOfContent.title")}
            </Typography>
            <Box component="ol" sx={{ pl: 3, mt: 2 }}>
              {[...Array(10)].map((_, index) => (
                <Box component="li" key={index} sx={{ mb: 1 }}>
                  <Typography variant="body1">
                    {t(`legal.tos.tableOfContent.list.${index}` as any)}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* NO WARRANTIES */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{ mt: 5, mb: 2, fontWeight: 600 }}
          >
            {t("legal.tos.noGuarantee.title")}
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
            {t("legal.tos.noGuarantee.paragraph")}
          </Typography>

          {/* LIMITATION OF LIABILITY */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{ mt: 5, mb: 2, fontWeight: 600 }}
          >
            {t("legal.tos.limitationOfLiabilty.title")}
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
            {t("legal.tos.limitationOfLiabilty.paragraph")}
          </Typography>

          {/* Terms of Usage */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{ mt: 5, mb: 2, fontWeight: 600 }}
          >
            {t("legal.tos.termsOfUsage.title")}
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
            {t("legal.tos.termsOfUsage.paragraph")}
          </Typography>

          {/* User Conduct */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{ mt: 5, mb: 2, fontWeight: 600 }}
          >
            {t("legal.tos.userConduct.title")}
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 1 }}>
            {t("legal.tos.userConduct.paragraph1.paragraph")}
          </Typography>
          {renderListItems([
            t("legal.tos.userConduct.paragraph1.list.0" as any),
            t("legal.tos.userConduct.paragraph1.list.1" as any),
            t("legal.tos.userConduct.paragraph1.list.2" as any),
          ])}

          <Typography
            variant="body1"
            paragraph
            sx={{ lineHeight: 1.8, mb: 1, mt: 2 }}
          >
            {t("legal.tos.userConduct.paragraph2.paragraph")}
          </Typography>
          {renderListItems([
            t("legal.tos.userConduct.paragraph2.list.0" as any),
            t("legal.tos.userConduct.paragraph2.list.1" as any),
            t("legal.tos.userConduct.paragraph2.list.2" as any),
            t("legal.tos.userConduct.paragraph2.list.3" as any),
            t("legal.tos.userConduct.paragraph2.list.4" as any),
            t("legal.tos.userConduct.paragraph2.list.5" as any),
          ])}

          <Typography
            variant="body1"
            paragraph
            sx={{ lineHeight: 1.8, mb: 2, mt: 2 }}
          >
            {t("legal.tos.userConduct.paragraph3")}
          </Typography>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 2 }}>
            {t("legal.tos.userConduct.paragraph4")}
          </Typography>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 1 }}>
            {t("legal.tos.userConduct.paragraph5.paragraph")}
          </Typography>
          {renderListItems([
            t("legal.tos.userConduct.paragraph5.list.0" as any),
            t("legal.tos.userConduct.paragraph5.list.1" as any),
            t("legal.tos.userConduct.paragraph5.list.2" as any),
            t("legal.tos.userConduct.paragraph5.list.3" as any),
          ])}

          <Typography
            variant="body1"
            paragraph
            sx={{ lineHeight: 1.8, mb: 2, mt: 2 }}
          >
            {t("legal.tos.userConduct.paragraph6")}
          </Typography>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 2 }}>
            {t("legal.tos.userConduct.paragraph7")}
          </Typography>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 2 }}>
            {t("legal.tos.userConduct.paragraph8")}
          </Typography>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
            {t("legal.tos.userConduct.paragraph9")}
          </Typography>

          {/* Copyright and Ownership */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{ mt: 5, mb: 2, fontWeight: 600 }}
          >
            {t("legal.tos.copyrightsAndOwnership.title")}
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 2 }}>
            {t("legal.tos.copyrightsAndOwnership.paragraph1")}
          </Typography>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 1 }}>
            {t("legal.tos.copyrightsAndOwnership.paragraph2.paragraph")}
          </Typography>
          {renderListItems([
            t("legal.tos.copyrightsAndOwnership.paragraph2.list.0" as any),
            t("legal.tos.copyrightsAndOwnership.paragraph2.list.1" as any),
            t("legal.tos.copyrightsAndOwnership.paragraph2.list.2" as any),
            t("legal.tos.copyrightsAndOwnership.paragraph2.list.3" as any),
            t("legal.tos.copyrightsAndOwnership.paragraph2.list.4" as any),
            t("legal.tos.copyrightsAndOwnership.paragraph2.list.5" as any),
          ])}

          <Typography
            variant="body1"
            paragraph
            sx={{ lineHeight: 1.8, mb: 3, mt: 2 }}
          >
            {t("legal.tos.copyrightsAndOwnership.paragraph3")}
          </Typography>

          {/* Disclaimer for Participation */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{ mt: 5, mb: 2, fontWeight: 600 }}
          >
            {t("legal.tos.participationDisclaimer.title")}
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
            {t("legal.tos.participationDisclaimer.paragraph")}
          </Typography>

          {/* Unsolicited Ideas Policy */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{ mt: 5, mb: 2, fontWeight: 600 }}
          >
            {t("legal.tos.unsolicitedIdeaPolicy.title")}
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
            {t("legal.tos.unsolicitedIdeaPolicy.paragraph")}
          </Typography>

          {/* Terms of Idea Submission */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{ mt: 5, mb: 2, fontWeight: 600 }}
          >
            {t("legal.tos.termsOfIdeaSubmission.title")}
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
            {t("legal.tos.termsOfIdeaSubmission.paragraph")}
          </Typography>

          {/* Feedback and Information */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{ mt: 5, mb: 2, fontWeight: 600 }}
          >
            {t("legal.tos.feedbackAndInformation.title")}
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
            {t("legal.tos.feedbackAndInformation.paragraph")}
          </Typography>

          {/* Updated */}
          <Box sx={{ mt: 6, pt: 3, borderTop: 1, borderColor: "divider" }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              {t("legal.tos.updates.title")}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontStyle: "italic", color: "text.secondary", mb: 1 }}
            >
              {t("legal.tos.updates.updated")}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontStyle: "italic", color: "text.secondary" }}
            >
              {t("legal.tos.updates.copyrights")}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  )
}
