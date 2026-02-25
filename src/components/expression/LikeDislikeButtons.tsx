"use client"

import type { FC } from "react"

import { ThumbsUp, ThumbsDown, Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useExpressionAction } from "@/hooks/useExpressions"
import { useMe } from "@/hooks/useUsers"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

interface LikeDislikeButtonsProps {
  expressionId: string
  likesCount: number
  dislikesCount: number
  likedByMe: boolean
  dislikedByMe: boolean
  disabled?: boolean
  isOwnExpression?: boolean
}

const LikeDislikeButtons: FC<LikeDislikeButtonsProps> = ({
  expressionId,
  likesCount,
  dislikesCount,
  likedByMe,
  dislikedByMe,
  disabled,
  isOwnExpression,
}) => {
  const t = useTranslations()
  const { me } = useMe()
  const { expressionAction, loading } = useExpressionAction(expressionId)

  const handleDislike = () => {
    if (!disabled && !isOwnExpression && me) {
      expressionAction("dislike")
    }
  }

  const handleLike = () => {
    if (!disabled && !isOwnExpression && me) {
      expressionAction("like")
    }
  }

  const dislikeButton = (
    <Button
      variant="ghost"
      size="sm"
      disabled={disabled || isOwnExpression || loading}
      onClick={handleDislike}
      className={cn(
        "relative z-10 gap-1.5 transition-colors",
        dislikedByMe &&
          "bg-destructive/10 text-destructive hover:bg-destructive/20 hover:text-destructive",
      )}
      aria-label={`${t("actions.dislike")} (${dislikesCount})`}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <ThumbsDown className={cn("h-4 w-4", dislikedByMe && "fill-current")} />
      )}
      <span className="text-xs">{dislikesCount}</span>
    </Button>
  )

  const likeButton = (
    <Button
      variant="ghost"
      size="sm"
      disabled={disabled || isOwnExpression || loading}
      onClick={handleLike}
      className={cn(
        "relative z-10 gap-1.5 transition-colors",
        likedByMe &&
          "bg-success/10 text-success hover:bg-success/20 hover:text-success",
      )}
      aria-label={`${t("actions.like")} (${likesCount})`}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <ThumbsUp className={cn("h-4 w-4", likedByMe && "fill-current")} />
      )}
      <span className="text-xs">{likesCount}</span>
    </Button>
  )

  const tooltipContent = isOwnExpression
    ? t("expression.cannotVoteOwnExpression")
    : !me
      ? t("expression.pleaseSignInForExpressionAction", {
          action: t("actions.like"),
        })
      : ""

  if (!me) {
    return (
      <TooltipProvider>
        <div className="flex gap-1.5">
          <span
            className="sr-only"
            aria-live="polite"
          >{`${likesCount} likes, ${dislikesCount} dislikes`}</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/auth/signin">{dislikeButton}</Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {t("expression.pleaseSignInForExpressionAction", {
                  action: t("actions.dislike"),
                })}
              </p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/auth/signin">{likeButton}</Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {t("expression.pleaseSignInForExpressionAction", {
                  action: t("actions.like"),
                })}
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    )
  }

  if (isOwnExpression) {
    return (
      <TooltipProvider>
        <div className="flex gap-1.5">
          <span
            className="sr-only"
            aria-live="polite"
          >{`${likesCount} likes, ${dislikesCount} dislikes`}</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>{dislikeButton}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipContent}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>{likeButton}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipContent}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    )
  }

  return (
    <div className="flex gap-1.5">
      <span
        className="sr-only"
        aria-live="polite"
      >{`${likesCount} likes, ${dislikesCount} dislikes`}</span>
      {dislikeButton}
      {likeButton}
    </div>
  )
}

export default LikeDislikeButtons
