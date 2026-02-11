"use client"

import type { FC, PropsWithChildren } from "react"
import IconButton from "@mui/material/IconButton"
import Badge from "@mui/material/Badge"
import CircularProgress from "@mui/material/CircularProgress"
import Tooltip from "@mui/material/Tooltip"
import { useExpressionAction } from "@/hooks/useExpressions"
import Link from "@mui/material/Link"
import { Link as I18nLink } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import { useMe } from "@/hooks/useUsers"

interface ExpressionCardActionButtonProps {
  badgeContent?: number | string
  disabled?: boolean
  expressionId: string
  action: "like" | "dislike" | "flag"
}

const ExpressionCardActionButton: FC<
  PropsWithChildren<ExpressionCardActionButtonProps>
> = ({ children, badgeContent, disabled, expressionId, action }) => {
  const { me } = useMe()
  const t = useTranslations()

  const { expressionAction, loading: loadingExpressionAction } =
    useExpressionAction(expressionId)

  const onActionClick = () => {
    expressionAction(action)
  }

  const content = (
    <Badge
      badgeContent={badgeContent}
      invisible={!badgeContent}
      color="default"
      aria-label={
        badgeContent
          ? `${badgeContent} ${action === "like" ? "likes" : action === "dislike" ? "dislikes" : "flags"}`
          : undefined
      }
    >
      <IconButton
        size="small"
        title={t(`actions.${action}`)}
        aria-label={
          action === "like"
            ? "Like this expression"
            : action === "dislike"
              ? "Dislike this expression"
              : t(`actions.${action}`)
        }
        sx={{
          transition: "transform 0.1s ease",
          "&:hover": {
            background: "transparent",
            transform: "translateY(-2px)",
          },
        }}
        onClick={!me || disabled ? undefined : onActionClick}
      >
        {loadingExpressionAction ? (
          <CircularProgress size={20} color="inherit" aria-label="Loading" />
        ) : (
          children
        )}
      </IconButton>
    </Badge>
  )

  if (!me)
    return (
      <Tooltip
        title={t("expression.pleaseSignInForExpressionAction", {
          action: t(`actions.${action}`),
        })}
      >
        <Link component={I18nLink} href="/auth/signin">
          {content}
        </Link>
      </Tooltip>
    )
  return content
}

export default ExpressionCardActionButton
