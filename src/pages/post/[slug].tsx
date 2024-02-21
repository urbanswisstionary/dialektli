import type { NextPage } from "next"
import { useRouter } from "next/router"
import Layout from "@/features/layout/layout"
import { useMe } from "@/hooks/useMe"
import { ParsedUrlQuery } from "querystring"
import { usePostsQuery } from "@/hooks/usePosts"
import { usePaginationState } from "@/hooks/usePaginationState"
import { setQueryOnPage } from "@/utils/setQueryOnPage"
import Stack from "@mui/joy/Stack"
import Box from "@mui/joy/Box"
import SearchPostsInput from "@/ui/searchPostsInput"
import NewPostButton from "@/ui/newPostButton"
import SelectLocation from "@/ui/selectLocation"
import PostCardsList from "@/features/postCardsList"

type Query = ParsedUrlQuery & { canton?: string; slug: string }

const PostPage: NextPage = () => {
  const { me } = useMe()
  const router = useRouter()
  const query = router.query as Query
  const { setPageCount, ...paginationProps } = usePaginationState()
  const postQuery = usePostsQuery({
    offset: (paginationProps.pageIndex - 1) * paginationProps.pageSize,
    limit: paginationProps.pageSize,
    slug: query.slug,
    canton: query.canton,
  })

  const data = postQuery.data?.postsQuery ?? postQuery.previousData?.postsQuery
  setPageCount(data?.count)

  return (
    <Layout hideSidebar={!me}>
      <Stack sx={{ mt: 1, mb: 3, gap: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
          <SearchPostsInput sx={{ flex: 1 }} />
          <NewPostButton />
        </Box>

        <SelectLocation
          mode="canton"
          value={query.canton}
          onChange={(canton) => setQueryOnPage(router, { canton })}
          placeholder="Filter by canton"
        />
      </Stack>
      <PostCardsList posts={data?.posts} paginationProps={paginationProps} />
    </Layout>
  )
}

export default PostPage
