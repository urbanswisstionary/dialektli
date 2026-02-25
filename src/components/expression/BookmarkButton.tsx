"use client"

import type { FC } from "react"

import { Bookmark, Loader2 } from "lucide-react"
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

interface BookmarkButtonProps {
  expressionId: string
  bookmarkedByMe: boolean
  size?: "sm" | "default"
}

const BookmarkButton: FC<BookmarkButtonProps> = ({
  expressionId,
  bookmarkedByMe,
  size = "default",
}) => {
  const t = useTranslations()
  const { me } = useMe()
  const { expressionAction, loading } = useExpressionAction(expressionId)

  const handleBookmark = () => {
    if (me) {
      expressionAction("bookmark")
    }
  }

  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5"

  const button = (
    <Button
      variant="ghost"
      size="icon"
      disabled={loading}
      onClick={handleBookmark}
      className={cn(
        "relative z-10 rounded-full transition-colors",
        bookmarkedByMe && "text-primary hover:text-primary",
      )}
      aria-label={
        bookmarkedByMe ? t("actions.removeBookmark") : t("actions.addBookmark")
      }
    >
      {loading ? (
        <Loader2 className={cn(iconSize, "animate-spin")} />
      ) : (
        <Bookmark className={cn(iconSize, bookmarkedByMe && "fill-current")} />
      )}
    </Button>
  )

  if (!me) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/auth/signin">{button}</Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {t("expression.pleaseSignInForExpressionAction", {
                action: t("actions.bookmark"),
              })}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return button
}

export default BookmarkButton
