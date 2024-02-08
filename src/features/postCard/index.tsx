import type { FC } from "react"
import Card from "@mui/joy/Card"
import Typography from "@mui/joy/Typography"
import Stack from "@mui/joy/Stack"
import { usePostAction } from "@/hooks/usePosts"
import Box from "@mui/joy/Box"
import CardActions from "@mui/joy/CardActions"
import CardOverflow from "@mui/joy/CardOverflow"
import Avatar from "@mui/joy/Avatar"
import { useState } from "react"
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
const PostCard: FC<PostCardProps> = ({ post, disableActions }) => {
  const [actionClicked, setActionClicked] = useState<
    "like" | "dislike" | "flag" | null
  >(null)

  const { postAction, loading: postActionLoading } = usePostAction(post.id)

  const onActionClick = (action: "like" | "dislike" | "flag") => {
    setActionClicked(action)
    postAction(action, () => setActionClicked(null))
  }

  return (
    <Card size="md">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography level="title-lg">{post?.title}</Typography>

        <PostCardActionButton
          color="warning"
          onClick={() => onActionClick("flag")}
          disabled={disableActions}
          loading={actionClicked === "flag" && postActionLoading}
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
              onClick={() => onActionClick("dislike")}
              badgeContent={post?.dislikesCount}
              loading={actionClicked === "dislike" && postActionLoading}
              disabled={disableActions}
            >
              {post?.dislikedByMe ? (
                <ThumbDownRoundedIcon />
              ) : (
                <ThumbDownTwoToneIcon />
              )}
            </PostCardActionButton>
            <PostCardActionButton
              onClick={() => onActionClick("like")}
              badgeContent={post?.likesCount}
              loading={actionClicked === "like" && postActionLoading}
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
}
export default PostCard
