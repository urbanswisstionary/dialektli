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
import TermCardActionButton from "./expressionCardActionButton"
import TermCardExamples from "./expressionCardExamples"
import Flag from "@/ui/Flag"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import JoyLink from "@mui/joy/Link"
import { setQueryOnPage } from "@/utils/setQueryOnPage"
import TermCardShareButtons from "./expressionCardShareButton"
import TermCardSynonyms from "./expressionCardSynonyms"
import { formatExpressionDate } from "./utils"
import NextLink from "next/link"

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
          <JoyLink
            level="body-xs"
            component={NextLink}
            href={`/expression/${term.id}`}
          >
            {formatExpressionDate({
              date: term?.createdAt,
              locale: router.locale,
            })}
          </JoyLink>
        </Stack>
        <TermCardShareButtons term={term} />
      </Stack>

      <Typography mb={2} level="body-sm">
        {term?.content}
      </Typography>

      <CardOverflow sx={{ gap: 0 }}>
        <TermCardExamples term={term} />
      </CardOverflow>

      <CardOverflow sx={{ gap: 0 }}>
        <TermCardSynonyms term={term} />
      </CardOverflow>
      <CardOverflow
        sx={{ borderTop: "1px solid", borderColor: "divider", px: 2 }}
      >
        <CardActions sx={{ justifyContent: "space-between" }}>
          {/* author */}
          <Stack direction="row" gap={1}>
            <Typography level="title-sm" sx={{ wordBreak: "normal" }}>
              {t("term.author")}:
            </Typography>
            <JoyLink
              level="body-sm"
              onClick={() =>
                setQueryOnPage(router, { author: term.author.name })
              }
            >
              {term.author.name}
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
