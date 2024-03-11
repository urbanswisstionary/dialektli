import type { FC } from "react"
import Card from "@/ui/Card"
import Typography from "@mui/joy/Typography"
import NextLink from "next/link"
import JoyLink from "@mui/joy/Link"
import Grid from "@mui/joy/Grid"
import GuidelinesList from "@/ui/GuidelineList"
import { useTranslation, Trans } from "next-i18next"

const ReviewGuidelines: FC = () => {
  const { t } = useTranslation("common", { keyPrefix: "term.reviewGuidelines" })

  return (
    <Card sx={{ paddingBlock: 0 }}>
      <Typography level="title-sm">
        <Trans
          i18nKey="pleaseReviewContentGuidelines"
          t={t}
          components={[
            <JoyLink
              key="link"
              component={NextLink}
              href="/guidelines"
              target="_blank"
            />,
          ]}
        />
      </Typography>
      <Typography level="title-sm">{t("shortVersion.title")}</Typography>
      <Grid
        container
        spacing={2}
        sx={{ marginTop: "0 !important", justifyContent: "space-evenly" }}
      >
        <Grid xs={12} sm={6}>
          <GuidelinesList
            mode="dos"
            guiedlines={t("shortVersion.dos", { returnObjects: true })}
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <GuidelinesList
            mode="dont's"
            guiedlines={t("shortVersion.donts", { returnObjects: true })}
          />
        </Grid>
      </Grid>
    </Card>
  )
}

export default ReviewGuidelines
