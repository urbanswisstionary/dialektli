import type { FC } from "react"
import Card from "@mui/joy/Card"
import Typography from "@mui/joy/Typography"
import Stack from "@mui/joy/Stack"
import Box from "@mui/joy/Box"
import CardActions from "@mui/joy/CardActions"
import CardOverflow from "@mui/joy/CardOverflow"
import Avatar from "@mui/joy/Avatar"
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded"
import ThumbUpTwoToneIcon from "@mui/icons-material/ThumbUpTwoTone"
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded"
import ThumbDownTwoToneIcon from "@mui/icons-material/ThumbDownTwoTone"
import FlagIcon from "@mui/icons-material/Flag"
import FlagTwoToneIcon from "@mui/icons-material/FlagTwoTone"
import { PostFragmentFragment } from "@@/generated/graphql"
import PostCardActionButton from "./components/actionButton"
import PostCardExample from "./components/examples"

type PostCardProps = {
  post: PostFragmentFragment
  disableActions?: boolean
}
const PostCard: FC<PostCardProps> = ({ post, disableActions }) => (
  <Card size="md" sx={{ wordBreak: "break-word" }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography level="title-lg">{post?.title}</Typography>
      <PostCardActionButton
        action="flag"
        postId={post.id}
        disabled={disableActions}
        color="warning"
      >
        {post.flaggedByMe ? <FlagIcon /> : <FlagTwoToneIcon />}
      </PostCardActionButton>
    </Stack>

    <Typography mb={2} level="body-xs">
      {post?.content}
    </Typography>

    <PostCardExample examples={post?.examples} />

    <CardOverflow
      sx={{ borderTop: "1px solid", borderColor: "divider", px: 2 }}
    >
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          {post?.author.image ? (
            <Avatar src={post?.author.image} alt={post?.author.name ?? ""} />
          ) : null}
          <div>
            <Typography level="body-xs">Author:</Typography>
            <Typography level="body-sm">
              {post?.author.name ?? "annonymus"}
            </Typography>
          </div>
        </Box>
        <Box sx={{ display: "flex", gap: 1.5, paddingInline: 2 }}>
          <PostCardActionButton
            action="dislike"
            postId={post.id}
            badgeContent={post?.dislikesCount}
            disabled={disableActions}
          >
            {post?.dislikedByMe ? (
              <ThumbDownRoundedIcon />
            ) : (
              <ThumbDownTwoToneIcon />
            )}
          </PostCardActionButton>
          <PostCardActionButton
            action="like"
            postId={post.id}
            badgeContent={post?.likesCount}
            disabled={disableActions}
          >
            {post?.likedByMe ? (
              <ThumbUpRoundedIcon color="inherit" />
            ) : (
              <ThumbUpTwoToneIcon />
            )}
          </PostCardActionButton>
        </Box>
      </CardActions>
    </CardOverflow>
  </Card>
)

export default PostCard
