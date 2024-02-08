import type { FC } from "react"
import Card from "@/ui/Card"
import Typography from "@mui/joy/Typography"
import Link from "next/link"
import JoyLink from "@mui/joy/Link"
import Grid from "@mui/joy/Grid"
import GuidelinesList from "@/ui/GuidelineList"

const dos = [
  { title: "Share definitions that other people will find meaningful" },
]
const donts = [
  { title: "never post hate speech" },
  { title: "never post people’s personal information." },
]

const ReviewGuidelines: FC = () => (
  <Card sx={{ paddingBlock: 0 }}>
    <Typography level="title-sm">
      Please review our{" "}
      <Link legacyBehavior href="guidelines" passHref>
        <JoyLink>content guidelines</JoyLink>
      </Link>{" "}
      before writing your definition.
    </Typography>
    <Typography level="title-sm">Here's the short version:</Typography>
    <Grid
      container
      spacing={2}
      sx={{ marginTop: "0 !important", justifyContent: "space-evenly" }}
    >
      <Grid xs={12} sm={6}>
        <GuidelinesList mode="dos" guiedlines={dos} />
      </Grid>
      <Grid xs={12} sm={6}>
        <GuidelinesList mode="dont's" guiedlines={donts} />
      </Grid>
    </Grid>
  </Card>
)

export default ReviewGuidelines
