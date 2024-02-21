import type { FC } from "react"
import Box, { BoxProps } from "@mui/joy/Box"
import PostCard from "@/features/postCard"
import Pagination, {
  PaginationProps,
} from "@/features/Auth/postTable/components/pagination"
import { FragmentType, getFragmentData } from "@@/generated"
import { PostFragment } from "@/hooks/usePosts"
import { useMe } from "@/hooks/useMe"

type PostCardsListProps = Pick<BoxProps, "sx"> & {
  paginationProps?: PaginationProps
  posts?: FragmentType<typeof PostFragment>[]
}

const PostCardsList: FC<PostCardsListProps> = ({ sx, ...props }) => {
  const { me } = useMe()
  const posts = getFragmentData(PostFragment, props.posts) ?? []

  const pagination = <Pagination {...props.paginationProps} />

  return (
    <Box
      sx={[
        { display: "flex", flexDirection: "column", gap: 1 },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {pagination}
      {posts.length ? (
        posts.map((post) => (
          <PostCard key={post.id} post={post} disableActions={!me} />
        ))
      ) : (
        <>No data sorry :(</>
      )}
      {pagination}
    </Box>
  )
}

export default PostCardsList
