import type { FC } from "react"
import Box from "@mui/joy/Box"
import RowMenu from "./rowMenu"
import type { PostFragmentFragment } from "@@/generated/graphql"
import { formatDate } from "../utils/helper"
import PostStatusChip from "./postStatusChip"
import Typography from "@mui/joy/Typography"
import ListItem from "@mui/joy/ListItem"
import ListItemContent from "@mui/joy/ListItemContent"
import ListItemDecorator from "@mui/joy/ListItemDecorator"

const PostListItem: FC<{ post: PostFragmentFragment }> = ({ post }) => (
  <ListItem
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "start",
    }}
  >
    <ListItemContent sx={{ display: "flex", gap: 2, alignItems: "start" }}>
      <ListItemDecorator>
        <RowMenu post={post} />
      </ListItemDecorator>

      <ListItemContent>
        <Typography fontWeight={600} gutterBottom>
          {post.title}
        </Typography>

        <Typography level="body-xs" gutterBottom>
          {post.content}
        </Typography>
        <Box sx={{ my: 1 }}>
          <Typography level="body-xs">
            <b>Created At:</b> {formatDate(post.createdAt)}
          </Typography>

          <Typography level="body-xs">
            <b>Last Updated:</b> {formatDate(post.updatedAt)}
          </Typography>
        </Box>
      </ListItemContent>
    </ListItemContent>

    <PostStatusChip status={post.published ? "published" : "unpublished"} />
  </ListItem>
)
export default PostListItem
