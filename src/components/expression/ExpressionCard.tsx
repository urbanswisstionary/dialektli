"use client"

import type { FC } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ExpressionFragmentFragment } from "@/generated/graphql"
import ExpressionCardExamples from "./ExpressionCardExamples"
import Flag from "@/components/ui/Flag"
import { useTranslations } from "next-intl"
import { useRouter, usePathname, Link } from "@/i18n/navigation"
import { useSearchParams } from "next/navigation"
import { setQueryOnPage } from "@/utils/setQueryOnPage"
import ExpressionCardShareButtons from "./ExpressionCardShareButtons"
import ExpressionCardSynonyms from "./ExpressionCardSynonyms"
import { formatExpressionDate } from "@/utils/formatExpressionDate"
import { useLocale } from "next-intl"
import { useMe } from "@/hooks/useUsers"

import LikeDislikeButtons from "./LikeDislikeButtons"
import BookmarkButton from "./BookmarkButton"
import { getFragmentData } from "@/generated"
import { ExpressionExampleFragment } from "@/hooks/useExpressions"

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

      <CardContent className="p-0 relative">
        {/* Header: Title, Cantons, Bookmark */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
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
              <div className="flex gap-1 flex-wrap mb-2">
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
                          className="inline-flex p-1 rounded transition-all hover:bg-primary/10 hover:scale-110 focus:outline-primary focus:outline-2 focus:outline-offset-2"
                          aria-label={`Filter by canton ${canton}`}
                        >
                          <Flag mode="canton" code={canton} />
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
            <ExpressionCardShareButtons expression={expression} />
            <BookmarkButton
              expressionId={expression.id ?? ""}
              bookmarkedByMe={expression.bookmarkedByMe ?? false}
            />
          </div>
        </div>

        {/* Definition */}
        <p className="text-sm leading-relaxed text-foreground/90 mb-4 line-clamp-2">
          {expression?.definition}
        </p>

        {/* First example preview */}
        {expression.examples && expression.examples.length > 0 && (
          <p className="text-sm italic text-muted-foreground line-clamp-1 mb-2">
            {
              getFragmentData(ExpressionExampleFragment, expression.examples[0])
                ?.definition
            }
          </p>
        )}

        {/* Examples section */}
        {expression.examples && expression.examples.length > 0 && (
          <div className="mb-2">
            <ExpressionCardExamples expression={expression} />
          </div>
        )}

        {/* Synonyms section */}
        {expression.synonyms && expression.synonyms.length > 0 && (
          <div className="mb-2">
            <ExpressionCardSynonyms expression={expression} />
          </div>
        )}

        {/* Footer: Author, Date, Actions */}
        <div className="border-t border-border pt-4 mt-4">
          <div className="flex justify-between items-center">
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
                  className="text-primary hover:underline relative z-10"
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
