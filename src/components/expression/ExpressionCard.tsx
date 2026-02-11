"use client"

import type { FC } from "react"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import CardActions from "@mui/material/CardActions"
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded"
import ThumbUpTwoToneIcon from "@mui/icons-material/ThumbUpTwoTone"
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded"
import ThumbDownTwoToneIcon from "@mui/icons-material/ThumbDownTwoTone"
import { ExpressionFragmentFragment } from "@/generated/graphql"
import ExpressionCardActionButton from "./ExpressionCardActionButton"
import ExpressionCardExamples from "./ExpressionCardExamples"
import Flag from "@/components/ui/Flag"
import { useTranslations } from "next-intl"
import { useRouter, usePathname } from "@/i18n/navigation"
import { useSearchParams } from "next/navigation"
import Link from "@mui/material/Link"
import { setQueryOnPage } from "@/utils/setQueryOnPage"
import ExpressionCardShareButtons from "./ExpressionCardShareButtons"
import ExpressionCardSynonyms from "./ExpressionCardSynonyms"
import { formatExpressionDate } from "@/utils/formatExpressionDate"
import { Link as I18nLink } from "@/i18n/navigation"
import { useLocale } from "next-intl"
import { useMe } from "@/hooks/useUsers"
import Tooltip from "@mui/material/Tooltip"
import { SwitzerlandMap } from "@/components/maps/SwitzerlandMap"
import Button from "@mui/material/Button"

type ExpressionCardProps = {
  expression: ExpressionFragmentFragment
  disableActions?: boolean
}

const ExpressionCard: FC<ExpressionCardProps> = ({
  expression,
  disableActions,
}) => {
  const t = useTranslations()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const locale = useLocale()
  const { me } = useMe()

  const isOwnExpression = expression.author?.id === me?.id

  return (
    <Card
      component="article"
      aria-label={`Expression: ${expression?.title}`}
      sx={{
        wordBreak: "break-word",
        p: 3,
        transition: "box-shadow 0.2s ease-in-out",
        "&:hover": {
          boxShadow: 4,
        },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Stack direction="column" gap={2}>
          {expression.cantons && expression.cantons.length > 0 ? (
            <Box>
              <Stack direction="row" gap={1} flexWrap="wrap" mb={2}>
                {expression.cantons.map((canton, i) => (
                  <Tooltip key={i} title={t("filterBy.canton")}>
                    <Box
                      onClick={() =>
                        setQueryOnPage(router, pathname, searchParams, {
                          canton: canton,
                        })
                      }
                      aria-label={`Filter by canton ${canton}`}
                      sx={{
                        cursor: "pointer",
                        display: "inline-flex",
                        padding: "4px 8px",
                        borderRadius: "6px",
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                          backgroundColor: "rgba(63, 81, 181, 0.08)",
                          transform: "scale(1.1)",
                        },
                        "&:focus": {
                          outline: "2px solid #3F51B5",
                          outlineOffset: "2px",
                        },
                      }}
                      tabIndex={0}
                      role="button"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          setQueryOnPage(router, pathname, searchParams, {
                            canton: canton,
                          })
                        }
                      }}
                    >
                      <Flag mode="canton" code={canton} />
                    </Box>
                  </Tooltip>
                ))}
              </Stack>
              <Box sx={{ maxWidth: "100%", height: 300, mb: 2 }}>
                <SwitzerlandMap
                  highlightedCantons={expression.cantons}
                  strokeColor="#FFFFFF"
                  strokeWidth={1.5}
                  locale={locale as "de" | "fr" | "it" | "en"}
                  showLabels={false}
                  showAttribution={false}
                  height={300}
                  width="100%"
                />
              </Box>
            </Box>
          ) : null}
          <Typography variant="h6">
            {expression?.title}{" "}
            {expression?.gender ? (
              <Typography
                component="span"
                variant="body2"
                title={t(`expression.genders.${expression.gender}`)}
                sx={{
                  textTransform: "lowercase",
                }}
              >
                ({expression.gender})
              </Typography>
            ) : null}{" "}
            {expression?.type ? (
              <Typography
                component="span"
                variant="body2"
                color="warning.main"
                title={t(`expression.types.${expression.type}.description`)}
              >
                {t(`expression.types.${expression.type}.label`)}
              </Typography>
            ) : null}
          </Typography>
          <Link
            variant="caption"
            component={I18nLink}
            href={`/expressions/${expression.id}`}
            aria-label={`View full expression posted on ${formatExpressionDate({
              date: expression?.createdAt,
              locale: locale,
            })}`}
          >
            {formatExpressionDate({
              date: expression?.createdAt,
              locale: locale,
            })}
          </Link>
        </Stack>
        <ExpressionCardShareButtons expression={expression} />
      </Stack>

      <Typography mb={2} variant="body1" mt={2}>
        {expression?.definition}
      </Typography>

      <Box sx={{ gap: 0 }}>
        <ExpressionCardExamples expression={expression} />
      </Box>

      <Box sx={{ gap: 0 }}>
        <ExpressionCardSynonyms expression={expression} />
      </Box>
      <Box
        sx={{ borderTop: "1px solid", borderColor: "divider", px: 2, mt: 2 }}
      >
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" gap={1} alignItems="center">
            <Typography variant="subtitle2" sx={{ wordBreak: "normal" }}>
              {t("expression.author")}:
            </Typography>
            {isOwnExpression ? (
              <Typography variant="body2">{expression.author?.name}</Typography>
            ) : (
              <>
                <Link
                  variant="body2"
                  onClick={() =>
                    setQueryOnPage(router, pathname, searchParams, {
                      author: expression.author?.name ?? "",
                    })
                  }
                  aria-label={`Filter expressions by author ${expression.author?.name}`}
                  sx={{
                    cursor: "pointer",
                    transition: "color 0.2s ease-in-out",
                    "&:hover": {
                      color: "primary.dark",
                      textDecoration: "underline",
                    },
                  }}
                >
                  {expression.author?.name}
                </Link>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() =>
                    setQueryOnPage(router, pathname, searchParams, {
                      author: expression.author?.name ?? "",
                    })
                  }
                  aria-label={`Show more expressions from ${expression.author?.name}`}
                  sx={{
                    textTransform: "none",
                    fontSize: "0.75rem",
                    ml: 1,
                  }}
                >
                  More from author
                </Button>
              </>
            )}
          </Stack>

          <Box sx={{ display: "flex", gap: 1.5, paddingInline: 2 }}>
            <Box
              component="span"
              sx={{
                position: "absolute",
                left: "-10000px",
                width: "1px",
                height: "1px",
                overflow: "hidden",
              }}
              aria-live="polite"
            >
              {expression.likesCount ?? 0} likes,{" "}
              {expression.dislikesCount ?? 0} dislikes
            </Box>
            <Tooltip
              title={
                isOwnExpression ? t("expression.cannotVoteOwnExpression") : ""
              }
              disableHoverListener={!isOwnExpression}
            >
              <span>
                <ExpressionCardActionButton
                  action="dislike"
                  expressionId={expression.id ?? ""}
                  badgeContent={expression?.dislikesCount ?? undefined}
                  disabled={disableActions || isOwnExpression}
                >
                  {expression.dislikedByMe ? (
                    <ThumbDownRoundedIcon />
                  ) : (
                    <ThumbDownTwoToneIcon />
                  )}
                </ExpressionCardActionButton>
              </span>
            </Tooltip>
            <Tooltip
              title={
                isOwnExpression ? t("expression.cannotVoteOwnExpression") : ""
              }
              disableHoverListener={!isOwnExpression}
            >
              <span>
                <ExpressionCardActionButton
                  action="like"
                  expressionId={expression.id ?? ""}
                  badgeContent={expression.likesCount ?? undefined}
                  disabled={disableActions || isOwnExpression}
                >
                  {expression.likedByMe ? (
                    <ThumbUpRoundedIcon color="inherit" />
                  ) : (
                    <ThumbUpTwoToneIcon />
                  )}
                </ExpressionCardActionButton>
              </span>
            </Tooltip>
          </Box>
        </CardActions>
      </Box>
    </Card>
  )
}

export default ExpressionCard
