import type { NextPage } from "next"
import { useRouter } from "next/router"
import Layout from "@/features/layout/layout"
import { useMe } from "@/hooks/useMe"
import { ParsedUrlQuery } from "querystring"
import { PostFragment, usePost } from "@/hooks/usePosts"
import { getFragmentData } from "@@/generated"
import Box from "@mui/joy/Box"
import PostCard from "@/features/postCard"
import SearchPostsInput from "@/features/searchPostsInput"
import Link from "next/link"
import IconButton from "@mui/joy/IconButton"
import AddIcon from "@mui/icons-material/Add"

type Query = ParsedUrlQuery & { id: string }

const PostPage: NextPage = () => {
  const { me } = useMe()
  const router = useRouter()
  const { id } = router.query as Query

  const { data: postData, loading: postDataLoading } = usePost(id)

  if (postDataLoading) return <>Loading...</>

  const post = getFragmentData(PostFragment, postData?.post)

  if (!post) {
    router.push("/")
    return <>Post not found</>
  }

  return (
    <Layout hideSidebar={!me}>
        <Box
        sx={{
          mt: 2.5,
          mb: 5,
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
        }}
      >
        <SearchPostsInput sx={{ flex: 1 }} />
        <Link href={"/post/new"} passHref>
          <IconButton
            title="New Post"
            variant="outlined"
            color="neutral"
            size="md"
          >
            <AddIcon />
          </IconButton>
        </Link>
      </Box>
      <Box sx={{ height: "100%" }}>
        <PostCard post={post} disableActions={!me} />
      </Box>
    </Layout>
  )
}

export default PostPage
