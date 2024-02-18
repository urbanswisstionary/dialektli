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
import EditPostForm from "@/features/postForm/editPostForm"

type Query = ParsedUrlQuery & { id: string }

const PostPage: NextPage = () => {
  const { me, isAdmin, loading: loadingMe } = useMe()
  const router = useRouter()
  const { id } = router.query as Query

  const { data: postData, loading: loadingPost } = usePost(id)

  if (loadingMe || loadingPost) return <>Loading...</>
  const post = getFragmentData(PostFragment, postData?.post)

  if (!me) {
    router.push("/account/signin")
    return <>Redirecting...</>
  }
  if (!post || (!!me && me.id !== post?.author.id && !isAdmin)) {
    router.push("/")
    return <>{!post ? "Post not found" : "unauthorized"}...</>
  }

  return (
    <Layout hideSidebar={!me}>
      <Box my={5}>
        {me.id === post.author.id ? (
          <EditPostForm post={post} />
        ) : (
          <PostCard post={post} disableActions={!me} />
        )}
      </Box>
    </Layout>
  )
}

export default PostPage
