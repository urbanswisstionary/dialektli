import type { FC } from "react"
import Card from "@mui/joy/Card"
import Typography from "@mui/joy/Typography"
import Stack from "@mui/joy/Stack"
import Box from "@mui/joy/Box"
import CardActions from "@mui/joy/CardActions"
import CardOverflow from "@mui/joy/CardOverflow"
import Avatar from "@mui/joy/Avatar"
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded"
import ThumbUpTwoToneIcon from "@mui/icons-material/ThumbUpTwoTone"
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded"
import ThumbDownTwoToneIcon from "@mui/icons-material/ThumbDownTwoTone"
import FlagIcon from "@mui/icons-material/Flag"
import FlagTwoToneIcon from "@mui/icons-material/FlagTwoTone"
import { TermFragmentFragment } from "@@/generated/graphql"
import TermCardActionButton from "./termCardActionButton"
import TermCardExample from "./termCardExamplesList"
import Flag from "@/ui/Flag"

type TermCardProps = {
  term: TermFragmentFragment
  disableActions?: boolean
}
const TermCard: FC<TermCardProps> = ({ term, disableActions }) => (
  <Card size="md" sx={{ wordBreak: "break-word" }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="column" gap={1}>
        {term.cantons ? (
          <Stack direction="row" gap={1} flexWrap="wrap">
            {term.cantons.map((canton, i) => (
              <Flag key={i} mode="canton" code={canton} />
            ))}
          </Stack>
        ) : null}
        <Typography level="title-lg">{term?.title}</Typography>
      </Stack>
      <TermCardActionButton
        action="flag"
        termId={term.id}
        disabled={disableActions}
        color="warning"
      >
        {term.flaggedByMe ? <FlagIcon /> : <FlagTwoToneIcon />}
      </TermCardActionButton>
    </Stack>

    <Typography mb={2} level="body-xs">
      {term?.content}
    </Typography>

    <TermCardExample examples={term?.examples} />

    <CardOverflow
      sx={{ borderTop: "1px solid", borderColor: "divider", px: 2 }}
    >
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          {term?.author.image ? (
            <Avatar src={term?.author.image} alt={term?.author.name ?? ""} />
          ) : null}
          <div>
            <Typography level="body-xs">Author:</Typography>
            <Typography level="body-sm">
              {term?.author.name ?? "annonymus"}
            </Typography>
          </div>
        </Box>
        <Box sx={{ display: "flex", gap: 1.5, paddingInline: 2 }}>
          <TermCardActionButton
            action="dislike"
            termId={term.id}
            badgeContent={term?.dislikesCount}
            disabled={disableActions}
          >
            {term?.dislikedByMe ? (
              <ThumbDownRoundedIcon />
            ) : (
              <ThumbDownTwoToneIcon />
            )}
          </TermCardActionButton>
          <TermCardActionButton
            action="like"
            termId={term.id}
            badgeContent={term?.likesCount}
            disabled={disableActions}
          >
            {term?.likedByMe ? (
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

export default TermCard
