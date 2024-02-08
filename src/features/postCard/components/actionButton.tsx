import type { FC } from "react"
import IconButton, { IconButtonProps } from "@mui/joy/IconButton"
import Badge from "@mui/joy/Badge"
import CircularProgress from "@mui/joy/CircularProgress"

const PostCardActionButton: FC<
  IconButtonProps & { badgeContent?: number | string; loading?: boolean }
> = ({
  children,
  variant = "plain",
  size = "sm",
  sx,
  badgeContent,
  loading,
  ...props
}) => (
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
      {...props}
    >
      {loading ? (
        <CircularProgress variant={variant} size={size} color="neutral" />
      ) : (
        children
      )}
    </IconButton>
  </Badge>
)
export default PostCardActionButton
