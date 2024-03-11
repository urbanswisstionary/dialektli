import type { FC, PropsWithChildren } from "react"
import IconButton, { IconButtonProps } from "@mui/joy/IconButton"
import Badge from "@mui/joy/Badge"
import CircularProgress from "@mui/joy/CircularProgress"
import Tooltip from "@mui/joy/Tooltip"
import { useTermAction } from "@/hooks/useTerms"
import NextLink from "next/link"
import Link from "@mui/joy/Link"
import { useTranslation, Trans } from "next-i18next"
import { useMe } from "@/hooks/useUsers"

type TermCardActionButtonProps = PropsWithChildren<{
  badgeContent?: number | string
  disabled?: boolean
  termId: string
  action: "like" | "dislike" | "flag"
  color?: IconButtonProps["color"]
  variant?: IconButtonProps["variant"]
  size?: IconButtonProps["size"]
  sx?: IconButtonProps["sx"]
}>

const TermCardActionButton: FC<TermCardActionButtonProps> = ({
  children,
  variant = "plain",
  size = "sm",
  sx,
  badgeContent,
  disabled,
  termId,
  action,
  ...props
}) => {
  const { me } = useMe()
  const { t } = useTranslation("common")

  const { termAction, loading: termActionLoading } = useTermAction(termId)

  const onActionClick = () => {
    termAction(action)
  }

  const content = (
    <Badge
      badgeContent={badgeContent}
      invisible={!badgeContent}
      variant={variant}
      size={size}
      color="neutral"
    >
      <IconButton
        variant={variant}
        size={size}
        title={t(`actions.${action}`)}
        sx={[
          {
            transition: "transform 0.1s ease",
            "&:hover": {
              background: "transparent",
              transform: "translateY(-2px)",
            },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        onClick={!me || disabled ? undefined : onActionClick}
        {...props}
      >
        {termActionLoading ? (
          <CircularProgress variant={variant} size={size} color="neutral" />
        ) : (
          children
        )}
      </IconButton>
    </Badge>
  )
  if (!me)
    return (
      <Tooltip
        variant="soft"
        title={
          <Trans
            i18nKey={"term.pleaseSignInForTermAction"}
            components={[
              <Link key="link" component={NextLink} href="/account/signin" />,
            ]}
            values={{ action: t(`actions.${action}`) }}
          />
        }
      >
        <Link key="link" component={NextLink} href="/account/signin">
          {content}
        </Link>
      </Tooltip>
    )
  return content
}
export default TermCardActionButton
