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

type Query = ParsedUrlQuery & { id: string; review?: string }

const PostPage: NextPage = () => {
  const { me, isAdmin, loading: loadingMe } = useMe()
  const router = useRouter()
  const query = router.query as Query

  const { data: postData, loading: loadingPost } = usePost(query.id)

  if (loadingMe || loadingPost) return <>Loading...</>

  const post = getFragmentData(PostFragment, postData?.post)
  const authorized = me?.id === post?.author.id || isAdmin
  if (!post) {
    router.push("/")
    return <>Post not found...</>
  }

  return (
    <Layout hideSidebar={!me}>
      <EditPostForm
        post={post}
        authorized={authorized}
        reviewBeforPublish={query.review !== undefined}
        anonymous={!me}
      />
    </Layout>
  )
}

export default PostPage
