import type { InferGetServerSidePropsType, NextPage } from "next"
import { useRouter } from "next/router"
import Layout from "@/features/layout/layout"
import { useMe } from "@/hooks/useMe"
import { ParsedUrlQuery } from "querystring"
import { PostFragment } from "@/hooks/usePosts"
import { getFragmentData, graphql } from "@@/generated"
import dynamic from "next/dynamic"
import { ServerSideGraphqlProps } from "@/dataLoading/ServerSideGraphqlProps"
import { z } from "zod"

const EditPostForm = dynamic(() => import("@/features/postForm/editPostForm"), {
  ssr: false,
})

type QueryParam = ParsedUrlQuery & { id: string; review?: string }

const Query = graphql(/* GraphQL */ `
  query EditPostQuery($id: String!) {
    post(data: { postId: $id }) {
      id
      ...PostFragment
    }
  }
`)

export const getServerSideProps = ServerSideGraphqlProps({
  query: Query,
  variablesSchema: z.object({ id: z.string() }),
})

const PostPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { me, isAdmin, loading: loadingMe } = useMe()
  const router = useRouter()
  const query = router.query as QueryParam

  if (loadingMe) return <>Loading...</>

  const post = getFragmentData(PostFragment, props.post)
  if (!post) {
    router.push("/")
    return <>Post not found...</>
  }
  const authorized = me?.id === post?.author.id || isAdmin

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
