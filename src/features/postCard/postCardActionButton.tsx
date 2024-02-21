import type { FC, PropsWithChildren } from "react"
import IconButton, { IconButtonProps } from "@mui/joy/IconButton"
import Badge from "@mui/joy/Badge"
import CircularProgress from "@mui/joy/CircularProgress"
import Tooltip from "@mui/joy/Tooltip"
import { usePostAction } from "@/hooks/usePosts"
import NextLink from "next/link"
import Link from "@mui/joy/Link"

type PostCardActionButtonProps = PropsWithChildren<{
  badgeContent?: number | string
  disabled?: boolean
  postId: string
  action: "like" | "dislike" | "flag"
  color?: IconButtonProps["color"]
  variant?: IconButtonProps["variant"]
  size?: IconButtonProps["size"]
  sx?: IconButtonProps["sx"]
}>

const PostCardActionButton: FC<PostCardActionButtonProps> = ({
  children,
  variant = "plain",
  size = "sm",
  sx,
  badgeContent,
  disabled,
  postId,
  action,
  ...props
}) => {
  const { postAction, loading: postActionLoading } = usePostAction(postId)

  const onActionClick = () => {
    postAction(action)
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
        {postActionLoading ? (
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
            to {action} this post.
          </>
        }
      >
        {content}
      </Tooltip>
    )
  return content
}
export default PostCardActionButton
