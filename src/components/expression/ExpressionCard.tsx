"use client"

import type { FC } from "react"

import { Pencil } from "lucide-react"
import { useTranslations } from "next-intl"
import { useLocale } from "next-intl"
import { useSearchParams } from "next/navigation"

import type { ExpressionFragmentFragment } from "@/generated/graphql"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import CantonBadge from "@/components/ui/CantonBadge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useMe } from "@/hooks/useUsers"
import { useRouter, usePathname, Link } from "@/i18n/navigation"
import { formatExpressionDate } from "@/utils/formatExpressionDate"
import { setQueryOnPage } from "@/utils/setQueryOnPage"

import BookmarkButton from "./BookmarkButton"
import ExpressionCardExamples from "./ExpressionCardExamples"
import ExpressionCardShareButtons from "./ExpressionCardShareButtons"
import ExpressionCardSynonyms from "./ExpressionCardSynonyms"
import LikeDislikeButtons from "./LikeDislikeButtons"

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

  const maxCantonsToShow = 4
  const cantons = expression.cantons ?? []
  const visibleCantons = cantons.slice(0, maxCantonsToShow)
  const remainingCount = cantons.length - maxCantonsToShow

  return (
    <Card
      className="group relative p-6 transition-colors hover:border-primary/30"
      role="article"
      aria-label={`Expression: ${expression?.title}`}
    >
      <Link
        href={`/expressions/${expression.id}`}
        className="absolute inset-0 z-0"
        aria-label={`View expression: ${expression?.title}`}
      />

      <CardContent className="relative p-0">
        {/* Header: Title, Cantons, Bookmark */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-bold">{expression?.title}</h3>
              {expression?.gender && (
                <span
                  className="text-xs text-muted-foreground lowercase"
                  title={t(`expression.genders.${expression.gender}`)}
                >
                  ({expression.gender})
                </span>
              )}
              {expression?.type && (
                <Badge
                  variant="outline"
                  className="text-xs"
                  title={t(`expression.types.${expression.type}.description`)}
                >
                  {t(`expression.types.${expression.type}.label`)}
                </Badge>
              )}
              {expression?.language && (
                <Badge variant="secondary" className="text-xs">
                  {t(`selectLanguage.${expression.language}`)}
                </Badge>
              )}
            </div>

            {/* Canton badges */}
            {cantons.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-1">
                <TooltipProvider>
                  {visibleCantons.map((canton, i) => (
                    <Tooltip key={i}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            setQueryOnPage(router, pathname, searchParams, {
                              canton: canton,
                            })
                          }}
                          className="inline-flex rounded transition-all hover:scale-105 focus:outline-2 focus:outline-offset-2 focus:outline-primary"
                          aria-label={`Filter by canton ${canton}`}
                        >
                          <CantonBadge
                            code={canton}
                            className="hover:bg-primary/10 hover:text-foreground"
                          />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t("filterBy.canton")}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                  {remainingCount > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      +{remainingCount}
                    </Badge>
                  )}
                </TooltipProvider>
              </div>
            )}
          </div>

          <div className="flex items-start gap-2">
            {isOwnExpression && (
              <Button
                variant="ghost"
                size="icon"
                className="relative z-10 h-8 w-8 shrink-0"
                asChild
              >
                <Link
                  href={`/expressions/${expression.id}/edit`}
                  aria-label={`Edit expression: ${expression?.title}`}
                >
                  <Pencil className="h-4 w-4" />
                </Link>
              </Button>
            )}
            <ExpressionCardShareButtons expression={expression} />
            <BookmarkButton
              expressionId={expression.id ?? ""}
              bookmarkedByMe={expression.bookmarkedByMe ?? false}
            />
          </div>
        </div>

        {/* Definition */}
        <p className="mb-4 text-sm leading-relaxed text-foreground/90">
          {expression?.definition}
        </p>

        {/* Examples section */}
        {!!expression.examples?.length && (
          <div className="mb-2">
            <ExpressionCardExamples expression={expression} />
          </div>
        )}

        {/* Synonyms section */}
        {!!expression.synonyms.length && (
          <div className="mb-2">
            <ExpressionCardSynonyms expression={expression} />
          </div>
        )}

        {/* Footer: Author, Date, Actions */}
        <div className="mt-4 border-t border-border pt-4">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center ">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-medium">{t("expression.author")}:</span>
              {isOwnExpression ? (
                <span>{expression.author?.name}</span>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setQueryOnPage(router, pathname, searchParams, {
                      author: expression.author?.name ?? "",
                    })
                  }}
                  className="relative z-10 cursor-pointer px-1 py-3 text-primary hover:underline"
                  aria-label={`Filter expressions by author ${expression.author?.name}`}
                >
                  {expression.author?.name}
                </button>
              )}
              <span>•</span>
              <time
                dateTime={expression?.createdAt ?? undefined}
                className="text-muted-foreground"
              >
                {formatExpressionDate({
                  date: expression?.createdAt,
                  locale: locale,
                })}
              </time>
            </div>

            <LikeDislikeButtons
              expressionId={expression.id ?? ""}
              likesCount={expression?.likesCount ?? 0}
              dislikesCount={expression?.dislikesCount ?? 0}
              likedByMe={expression.likedByMe ?? false}
              dislikedByMe={expression.dislikedByMe ?? false}
              disabled={disableActions}
              isOwnExpression={isOwnExpression}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ExpressionCard
