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
import { ExpressionFragmentFragment } from "@@/generated/graphql"
import ExpressionCardActionButton from "./expressionCardActionButton"
import ExpressionCardExamples from "./expressionCardExamples"
import Flag from "@/ui/Flag"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import JoyLink from "@mui/joy/Link"
import { setQueryOnPage } from "@/utils/setQueryOnPage"
import ExpressionCardShareButtons from "./expressionCardShareButton"
import ExpressionCardSynonyms from "./expressionCardSynonyms"
import { formatExpressionDate } from "./utils"
import NextLink from "next/link"

type ExpressionCardProps = {
  expression: ExpressionFragmentFragment
  disableActions?: boolean
}

const ExpressionCard: FC<ExpressionCardProps> = ({
  expression,
  disableActions,
}) => {
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
          {/* <Flag mode="country" code={expression.language} /> */}
          {expression.cantons ? (
            <Stack direction="row" gap={1} flexWrap="wrap">
              {expression.cantons.map((canton, i) => (
                <Flag key={i} mode="canton" code={canton} />
              ))}
            </Stack>
          ) : null}
          <Typography level="title-lg">{expression?.title}</Typography>
          <JoyLink
            level="body-xs"
            component={NextLink}
            href={`/expression/${expression.id}`}
          >
            {formatExpressionDate({
              date: expression?.createdAt,
              locale: router.locale,
            })}
          </JoyLink>
        </Stack>
        <ExpressionCardShareButtons expression={expression} />
      </Stack>

      <Typography mb={2} level="body-sm">
        {expression?.definition}
      </Typography>

      <CardOverflow sx={{ gap: 0 }}>
        <ExpressionCardExamples expression={expression} />
      </CardOverflow>

      <CardOverflow sx={{ gap: 0 }}>
        <ExpressionCardSynonyms expression={expression} />
      </CardOverflow>
      <CardOverflow
        sx={{ borderTop: "1px solid", borderColor: "divider", px: 2 }}
      >
        <CardActions sx={{ justifyContent: "space-between" }}>
          {/* author */}
          <Stack direction="row" gap={1}>
            <Typography level="title-sm" sx={{ wordBreak: "normal" }}>
              {t("expression.author")}:
            </Typography>
            <JoyLink
              level="body-sm"
              onClick={() =>
                setQueryOnPage(router, { author: expression.author.name })
              }
            >
              {expression.author.name}
            </JoyLink>
          </Stack>

          {/* actions (like / dislike) */}
          <Box sx={{ display: "flex", gap: 1.5, paddingInline: 2 }}>
            <ExpressionCardActionButton
              action="dislike"
              expressionId={expression.id}
              badgeContent={expression?.dislikesCount}
              disabled={disableActions}
            >
              {expression.dislikedByMe ? (
                <ThumbDownRoundedIcon />
              ) : (
                <ThumbDownTwoToneIcon />
              )}
            </ExpressionCardActionButton>
            <ExpressionCardActionButton
              action="like"
              expressionId={expression.id}
              badgeContent={expression.likesCount}
              disabled={disableActions}
            >
              {expression.likedByMe ? (
                <ThumbUpRoundedIcon color="inherit" />
              ) : (
                <ThumbUpTwoToneIcon />
              )}
            </ExpressionCardActionButton>
          </Box>
        </CardActions>
      </CardOverflow>
    </Card>
  )
}

export default ExpressionCard
