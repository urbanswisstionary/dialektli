import type { NextPage } from "next"
import { useRouter } from "next/router"
import Layout from "@/features/layout/layout"
import { useMe } from "@/hooks/useMe"
import { ParsedUrlQuery } from "querystring"
import { PostFragment, usePost } from "@/hooks/usePosts"
import { getFragmentData } from "@@/generated"
import dynamic from "next/dynamic"

const EditPostForm = dynamic(() => import("@/features/postForm/editPostForm"), {
  ssr: false,
})

type Query = ParsedUrlQuery & { id: string }

const PostPage: NextPage = () => {
  const { me, isAdmin, loading: loadingMe } = useMe()
  const router = useRouter()
  const { id } = router.query as Query

  const { data: postData, loading: loadingPost } = usePost(id)

  if (loadingMe || loadingPost) return <>Loading...</>

  if (!me) {
    router.push("/account/signin")
    return <>Redirecting...</>
  }

  const post = getFragmentData(PostFragment, postData?.post)
  const authorized = me.id === post?.author.id || isAdmin

  if (!post || !authorized) {
    router.push("/")
    return <>{!post ? "Post not found" : "unauthorized"}...</>
  }

  return (
    <Layout hideSidebar={!me}>
      {authorized ? <EditPostForm post={post} /> : null}
    </Layout>
  )
}

export default PostPage
