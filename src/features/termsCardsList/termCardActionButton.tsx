import type { FC, PropsWithChildren } from "react"
import IconButton, { IconButtonProps } from "@mui/joy/IconButton"
import Badge from "@mui/joy/Badge"
import CircularProgress from "@mui/joy/CircularProgress"
import Tooltip from "@mui/joy/Tooltip"
import { useTermAction } from "@/hooks/useTerms"
import NextLink from "next/link"
import Link from "@mui/joy/Link"

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
  const { termAction, loading: termActionLoading } = useTermAction(termId)

  const onActionClick = () => termAction(action)

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
        onClick={disabled ? undefined : onActionClick}
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
  if (disabled)
    return (
      <Tooltip
        variant="soft"
        title={
          <>
            Please{" "}
            <Link component={NextLink} href="/account/signin">
              sign in
            </Link>{" "}
            to {action} this term.
          </>
        }
      >
        {content}
      </Tooltip>
    )
  return content
}
export default TermCardActionButton
