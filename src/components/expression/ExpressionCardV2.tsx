"use client"

import { useState, type FC } from "react"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded"
import ThumbUpTwoToneIcon from "@mui/icons-material/ThumbUpTwoTone"
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded"
import ThumbDownTwoToneIcon from "@mui/icons-material/ThumbDownTwoTone"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import TrendingDownIcon from "@mui/icons-material/TrendingDown"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import Tooltip from "@mui/material/Tooltip"
import Link from "@mui/material/Link"
import Button from "@mui/material/Button"
import { ExpressionFragmentFragment } from "@/generated/graphql"
import ExpressionCardActionButton from "./ExpressionCardActionButton"
import ExpressionCardShareButtons from "./ExpressionCardShareButtons"
import Flag from "@/components/ui/Flag"
import { useTranslations } from "next-intl"
import { useRouter, usePathname } from "@/i18n/navigation"
import { useSearchParams } from "next/navigation"
import { setQueryOnPage } from "@/utils/setQueryOnPage"
import { formatExpressionDate } from "@/utils/formatExpressionDate"
import { Link as I18nLink } from "@/i18n/navigation"
import { useLocale } from "next-intl"
import { useMe } from "@/hooks/useUsers"
import DialectDistributionMap from "@/components/maps/DialectDistributionMap"
import { getCantonName, CANTON_COLORS } from "@/config/cantons"

type ExpressionCardV2Props = {
  expression: ExpressionFragmentFragment
  disableActions?: boolean
}

/**
 * Navigate to filter: on homepage, update query params in-place.
 * On any other page, redirect to homepage with the filter applied.
 */
function navigateToFilter(
  router: ReturnType<typeof useRouter>,
  pathname: string,
  searchParams: ReturnType<typeof useSearchParams>,
  query: Record<string, string>,
) {
  if (pathname === "/") {
    setQueryOnPage(router, pathname, searchParams, query)
  } else {
    const params = new URLSearchParams()
    Object.entries(query).forEach(([k, v]) => params.set(k, v))
    router.push(`/?${params.toString()}`)
  }
}

const TYPE_CHIP_CONFIG: Record<
  string,
  {
    color: "primary" | "secondary" | "success" | "warning" | "info" | "error"
    label?: string
  }
> = {
  NOUN: { color: "primary" },
  VERB: { color: "secondary" },
  ADJECTIVE: { color: "success" },
  ADVERB: { color: "info" },
  INTERJECTION: { color: "warning" },
  CONJUNCTION: { color: "info" },
  PREPOSITION: { color: "info" },
  PRONOUN: { color: "secondary" },
  PARTICLE: { color: "info" },
}

function getPopularityScore(likes: number, dislikes: number): number | null {
  const total = likes + dislikes
  if (total === 0) return null
  return (likes - dislikes) / total
}

const ExpressionCardV2: FC<ExpressionCardV2Props> = ({
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
  const likes = expression.likesCount ?? 0
  const dislikes = expression.dislikesCount ?? 0
  const popularityScore = getPopularityScore(likes, dislikes)
  const hasCantons = expression.cantons && expression.cantons.length > 0
  const examples = expression.examples ?? []
  const synonyms = expression.synonyms ?? []

  const MAX_VISIBLE_CANTONS = 4
  const allCantons = expression.cantons ?? []
  const [showAllCantons, setShowAllCantons] = useState(false)
  const visibleCantons =
    showAllCantons || allCantons.length <= MAX_VISIBLE_CANTONS
      ? allCantons
      : allCantons.slice(0, MAX_VISIBLE_CANTONS)
  const hiddenCantonCount = allCantons.length - MAX_VISIBLE_CANTONS

  return (
    <Card
      component="article"
      aria-label={`Expression: ${expression?.title}`}
      sx={{
        wordBreak: "break-word",
        p: 2,
        transition: "box-shadow 0.2s ease-in-out",
        "&:hover": {
          boxShadow: 4,
        },
      }}
    >
      {/* ── HEADER: Title + Gender + Type Badge | Share ── */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" alignItems="center" gap={1} flexWrap="wrap">
            <Link
              component={I18nLink}
              href={`/expressions/${expression.id}`}
              variant="h6"
              underline="hover"
              sx={{
                fontWeight: 700,
                fontSize: "1.15rem",
                lineHeight: 1.3,
                color: "text.primary",
                "&:hover": { color: "primary.main" },
              }}
              aria-label={`View expression: ${expression?.title}`}
            >
              {expression?.title}
            </Link>

            {expression?.gender && (
              <Typography
                component="span"
                variant="caption"
                title={t(`expression.genders.${expression.gender}`)}
                sx={{
                  color: "text.secondary",
                  textTransform: "lowercase",
                  fontStyle: "italic",
                }}
              >
                ({expression.gender})
              </Typography>
            )}

            {expression?.type && (
              <Chip
                label={t(`expression.types.${expression.type}.label`)}
                title={t(`expression.types.${expression.type}.description`)}
                size="small"
                color={TYPE_CHIP_CONFIG[expression.type]?.color ?? "default"}
                variant="outlined"
                sx={{ fontWeight: 500, fontSize: "0.7rem", height: 22 }}
              />
            )}

            {/* Popularity indicator */}
            {popularityScore !== null && (
              <Tooltip title={`${likes} likes, ${dislikes} dislikes`}>
                <Chip
                  icon={
                    popularityScore >= 0 ? (
                      <TrendingUpIcon sx={{ fontSize: 14 }} />
                    ) : (
                      <TrendingDownIcon sx={{ fontSize: 14 }} />
                    )
                  }
                  label={`${Math.round(Math.abs(popularityScore) * 100)}%`}
                  size="small"
                  variant="outlined"
                  color={
                    popularityScore >= 0.5
                      ? "success"
                      : popularityScore >= 0
                        ? "default"
                        : "error"
                  }
                  sx={{ fontWeight: 500, fontSize: "0.65rem", height: 20 }}
                />
              </Tooltip>
            )}
          </Stack>

          {/* Date + Author row */}
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            mt={0.5}
            flexWrap="wrap"
          >
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {formatExpressionDate({
                date: expression?.createdAt,
                locale: locale,
              })}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              &middot;
            </Typography>
            {isOwnExpression ? (
              <Typography variant="caption" color="text.secondary">
                {expression.author?.name}
              </Typography>
            ) : (
              <Link
                variant="caption"
                onClick={() =>
                  navigateToFilter(router, pathname, searchParams, {
                    author: expression.author?.name ?? "",
                  })
                }
                sx={{
                  cursor: "pointer",
                  color: "text.secondary",
                  "&:hover": {
                    color: "primary.main",
                    textDecoration: "underline",
                  },
                }}
                aria-label={`Filter by author ${expression.author?.name}`}
              >
                {expression.author?.name}
              </Link>
            )}
          </Stack>
        </Box>

        <ExpressionCardShareButtons expression={expression} />
      </Stack>

      {/* ── DEFINITION ── */}
      <Typography
        variant="body1"
        sx={{
          mt: 1.5,
          mb: 1.5,
          fontSize: "1.05rem",
          lineHeight: 1.6,
          color: "text.primary",
        }}
      >
        {expression?.definition}
      </Typography>

      {/* ── GEOGRAPHY: Compact map + Canton chips ── */}
      {hasCantons && (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "flex-start",
            mb: 1.5,
            p: 1.5,
            borderRadius: 1,
            bgcolor: "action.hover",
          }}
        >
          <Box
            sx={{
              width: 140,
              minWidth: 140,
              height: 100,
              flexShrink: 0,
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <DialectDistributionMap
              highlightedCantons={expression.cantons!}
              locale={locale as "de" | "fr" | "it" | "en"}
              height={100}
              width={140}
              compact
            />
          </Box>

          <Stack
            direction="row"
            gap={0.75}
            flexWrap="wrap"
            alignItems="center"
            sx={{ flex: 1, minWidth: 0 }}
          >
            {visibleCantons.map((canton) => (
              <Chip
                key={canton}
                icon={
                  <Box sx={{ display: "flex", alignItems: "center", ml: 0.5 }}>
                    <Flag mode="canton" code={canton} />
                  </Box>
                }
                label={getCantonName(
                  canton,
                  locale as "de" | "fr" | "it" | "en",
                )}
                size="small"
                onClick={() =>
                  navigateToFilter(router, pathname, searchParams, {
                    canton: canton,
                  })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    navigateToFilter(router, pathname, searchParams, {
                      canton: canton,
                    })
                  }
                }}
                sx={{
                  fontWeight: 500,
                  fontSize: "0.75rem",
                  borderLeft: `3px solid ${CANTON_COLORS[canton] ?? "#999"}`,
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: "action.selected",
                  },
                }}
                aria-label={`Filter by canton ${getCantonName(canton, locale as "de" | "fr" | "it" | "en")}`}
              />
            ))}
            {!showAllCantons && hiddenCantonCount > 0 && (
              <Chip
                label={`+${hiddenCantonCount}`}
                size="small"
                onClick={() => setShowAllCantons(true)}
                sx={{
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  cursor: "pointer",
                  bgcolor: "action.selected",
                  "&:hover": { bgcolor: "action.focus" },
                }}
                aria-label={`Show ${hiddenCantonCount} more cantons`}
              />
            )}
            {showAllCantons && allCantons.length > MAX_VISIBLE_CANTONS && (
              <Chip
                label={t("actions.collapse")}
                size="small"
                onClick={() => setShowAllCantons(false)}
                variant="outlined"
                sx={{
                  fontWeight: 500,
                  fontSize: "0.7rem",
                  cursor: "pointer",
                }}
              />
            )}
          </Stack>
        </Box>
      )}

      {/* ── EXAMPLES (Accordion, default expanded) ── */}
      {examples.length > 0 && (
        <Accordion
          defaultExpanded
          disableGutters
          elevation={0}
          sx={{
            "&:before": { display: "none" },
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "8px !important",
            mb: 1,
            overflow: "hidden",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              minHeight: 40,
              "& .MuiAccordionSummary-content": { my: 0.5 },
              bgcolor: "action.hover",
            }}
          >
            <Typography variant="subtitle2" fontWeight={600}>
              {t("expression.examples")} ({examples.length})
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <List dense disablePadding>
              {examples.map((example: any, i: number) => (
                <ListItem
                  key={example.id}
                  sx={{
                    px: 2,
                    py: 0.5,
                    borderTop: i > 0 ? "1px solid" : "none",
                    borderColor: "divider",
                  }}
                >
                  <ListItemText>
                    <Typography variant="body2" color="text.secondary">
                      {i + 1}. {example.definition}
                    </Typography>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}

      {/* ── SYNONYMS (Accordion, default collapsed) ── */}
      {synonyms.length > 0 && (
        <Accordion
          disableGutters
          elevation={0}
          sx={{
            "&:before": { display: "none" },
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "8px !important",
            mb: 1,
            overflow: "hidden",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              minHeight: 40,
              "& .MuiAccordionSummary-content": { my: 0.5 },
              bgcolor: "action.hover",
            }}
          >
            <Typography variant="subtitle2" fontWeight={600}>
              {t("expression.synonyms")} ({synonyms.length})
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <List dense disablePadding>
              {synonyms.map(({ synonymOf: s }, i) =>
                s ? (
                  <ListItem
                    key={i}
                    sx={{
                      px: 2,
                      py: 0.5,
                      borderTop: i > 0 ? "1px solid" : "none",
                      borderColor: "divider",
                    }}
                  >
                    <ListItemText>
                      <Grid container spacing={1} alignItems="center">
                        <Grid size={{ xs: 8 }}>
                          <Link
                            component={I18nLink}
                            href={`/expressions/${s.id}`}
                            variant="body2"
                          >
                            {s.title}
                          </Link>
                        </Grid>
                        <Grid
                          size={{ xs: 4 }}
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            flexWrap: "wrap",
                            gap: "4px",
                          }}
                        >
                          {s.cantons?.map((canton: string, j: number) => (
                            <Flag key={j} mode="canton" code={canton} />
                          ))}
                        </Grid>
                      </Grid>
                    </ListItemText>
                  </ListItem>
                ) : null,
              )}
              <Divider />
              <ListItem sx={{ px: 2, py: 1 }}>
                <Link
                  href={`/expressions/new?synonym=${expression.id}`}
                  variant="subtitle2"
                  fontWeight={600}
                  component={I18nLink}
                >
                  {t("expression.suggestSynonym")}
                </Link>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      )}

      {/* ── FOOTER: Author link + Voting ── */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pt: 1,
          mt: 0.5,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack direction="row" gap={1} alignItems="center">
          {!isOwnExpression && expression.author?.name && (
            <Button
              size="small"
              variant="text"
              onClick={() =>
                navigateToFilter(router, pathname, searchParams, {
                  author: expression.author?.name ?? "",
                })
              }
              aria-label={`Show more expressions from ${expression.author?.name}`}
              sx={{
                textTransform: "none",
                fontSize: "0.75rem",
                color: "text.secondary",
                px: 1,
                minHeight: 32,
                "&:hover": {
                  color: "primary.main",
                  bgcolor: "action.hover",
                },
              }}
            >
              More from {expression.author?.name}
            </Button>
          )}
        </Stack>

        <Stack direction="row" gap={1} alignItems="center">
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
            {likes} likes, {dislikes} dislikes
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
        </Stack>
      </Box>
    </Card>
  )
}

export default ExpressionCardV2
