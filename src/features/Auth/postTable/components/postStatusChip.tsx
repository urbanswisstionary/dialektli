import type { FC } from "react"
import Chip from "@mui/joy/Chip"
import PublishedIcon from "@mui/icons-material/CheckCircleRounded"
import UnpublishedIcon from "@mui/icons-material/UnpublishedRounded"
import FlaggedIcon from "@mui/icons-material/FlagRounded"
import type { ColorPaletteProp } from "@mui/joy/styles"

export type PostStatus = "published" | "unpublished" | "flagged"

const PostStatusChip: FC<{ status: PostStatus }> = ({ status }) => (
  <Chip
    variant="soft"
    size="sm"
    startDecorator={
      {
        published: <PublishedIcon />,
        unpublished: <UnpublishedIcon />,
        flagged: <FlaggedIcon />,
      }[status]
    }
    color={
      {
        published: "success",
        unpublished: "neutral",
        flagged: "danger",
      }[status] as ColorPaletteProp
    }
  >
    {status}
  </Chip>
)

export default PostStatusChip
