import type { FC } from "react"
import Card from "@mui/joy/Card"
import Typography from "@mui/joy/Typography"
import Stack from "@mui/joy/Stack"
import Box from "@mui/joy/Box"
import CardActions from "@mui/joy/CardActions"
import CardOverflow from "@mui/joy/CardOverflow"
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded"
import ThumbUpTwoToneIcon from "@mui/icons-material/ThumbUpTwoTone"
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded"
import ThumbDownTwoToneIcon from "@mui/icons-material/ThumbDownTwoTone"
// import FlagIcon from "@mui/icons-material/Flag"
// import FlagTwoToneIcon from "@mui/icons-material/FlagTwoTone"
import { TermFragmentFragment } from "@@/generated/graphql"
import TermCardActionButton from "./termCardActionButton"
import TermCardExample from "./termCardExamplesList"
import Flag from "@/ui/Flag"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import JoyLink from "@mui/joy/Link"
import { setQueryOnPage } from "@/utils/setQueryOnPage"
import TermCardShareButtons from "./termCardShareButton"
import List from "@mui/joy/List"
import ListItem from "@mui/joy/ListItem"
import ListDivider from "@mui/joy/ListDivider"
import Grid from "@mui/joy/Grid"

const synonymPath = (termId: string = "[id]") => `/term/${termId}`

type TermCardProps = {
  term: TermFragmentFragment
  disableActions?: boolean
}
const TermCard: FC<TermCardProps> = ({ term, disableActions }) => {
  const { t } = useTranslation("common")
  const router = useRouter()

  return (
    <Card size="md" sx={{ wordBreak: "break-word" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Stack direction="column" gap={1}>
          {/* <Flag mode="country" code={term.language} /> */}
          {term.cantons ? (
            <Stack direction="row" gap={1} flexWrap="wrap">
              {term.cantons.map((canton, i) => (
                <Flag key={i} mode="canton" code={canton} />
              ))}
            </Stack>
          ) : null}
          <Typography level="title-lg">{term?.title}</Typography>
        </Stack>
        <TermCardShareButtons term={term} />
      </Stack>

      <Typography mb={2} level="body-xs">
        {term?.content}
      </Typography>

      <TermCardExample examples={term?.examples} />

      <CardOverflow sx={{ gap: 0 }}>
        <Typography
          level="title-sm"
          sx={{ borderBottom: "1.5px solid", borderColor: "divider", pb: 1 }}
        >
          Synonyms:
        </Typography>
        <List>
          {term.synonyms.map(({ synonymOf: s }, i) => (
            <ListItem key={i}>
              <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid xs={8}>
                  <JoyLink href={synonymPath(s.id)} level="body-sm">
                    {s.title}
                  </JoyLink>
                </Grid>
                <Grid
                  xs={4}
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    flexWrap: "wrap",
                    gap: "2px",
                  }}
                >
                  {s.cantons.map((canton, i) => (
                    <Flag key={i} mode="canton" code={canton} />
                  ))}
                </Grid>
              </Grid>
            </ListItem>
          ))}
          {term.synonyms.length ? <ListDivider /> : null}
          <ListItem>
            <JoyLink
              href={`/term/new?synonym=${term.id}`}
              level="title-sm"
              fontWeight={600}
            >
              {t("term.suggestSynonym")}
            </JoyLink>
          </ListItem>
        </List>
      </CardOverflow>
      <CardOverflow
        sx={{ borderTop: "1px solid", borderColor: "divider", px: 2 }}
      >
        <CardActions sx={{ justifyContent: "space-between" }}>
          {/* author */}
          <Stack direction="row" gap={1}>
            <Typography level="title-sm">{t("term.author")}:</Typography>
            <JoyLink
              level="body-sm"
              onClick={() =>
                setQueryOnPage(router, { author: term.author.name })
              }
            >
              {term.author.name ?? "anonymous"}
            </JoyLink>
          </Stack>

          {/* actions (like / dislike) */}
          <Box sx={{ display: "flex", gap: 1.5, paddingInline: 2 }}>
            <TermCardActionButton
              action="dislike"
              termId={term.id}
              badgeContent={term?.dislikesCount}
              disabled={disableActions}
            >
              {term.dislikedByMe ? (
                <ThumbDownRoundedIcon />
              ) : (
                <ThumbDownTwoToneIcon />
              )}
            </TermCardActionButton>
            <TermCardActionButton
              action="like"
              termId={term.id}
              badgeContent={term.likesCount}
              disabled={disableActions}
            >
              {term.likedByMe ? (
                <ThumbUpRoundedIcon color="inherit" />
              ) : (
                <ThumbUpTwoToneIcon />
              )}
            </TermCardActionButton>
          </Box>
        </CardActions>
      </CardOverflow>
    </Card>
  )
}

export default TermCard
