import { useMe } from "@/hooks/useMe"
import Layout from "@/features/layout/layout"
import SearchPostsInput from "@/ui/searchPostsInput"
import Box from "@mui/joy/Box"
import Stack from "@mui/joy/Stack"
import { NextPage } from "next"
import { usePostsQuery } from "@/hooks/usePosts"
import SelectLocation from "@/ui/selectLocation"
import { ParsedUrlQuery } from "querystring"
import { useRouter } from "next/router"
import { setQueryOnPage } from "@/utils/setQueryOnPage"
import SelectLetter from "@/ui/selectLetter"
import Accordion from "@/ui/Accordion"
import PostCardsList from "@/features/postCardsList"
import { usePaginationState } from "@/hooks/usePaginationState"
import NewPostButton from "@/ui/newPostButton"

type Query = ParsedUrlQuery & {
  canton?: string
  firstChar?: string
}

const Home: NextPage = () => {
  const router = useRouter()
  const query = router.query as Query
  const me = useMe().me

  const { setPageCount, ...paginationProps } = usePaginationState()
  const postQuery = usePostsQuery({
    offset: (paginationProps.pageIndex - 1) * paginationProps.pageSize,
    limit: paginationProps.pageSize,
    canton: query.canton,
    firstChar: query.firstChar,
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
        <Accordion
          content={[
            {
              label: "Filter by first charachter",
              children: (
                <SelectLetter
                  value={query.firstChar}
                  onChange={(firstChar) =>
                    setQueryOnPage(router, {
                      firstChar:
                        query.firstChar === firstChar ? null : firstChar,
                    })
                  }
                />
              ),
            },
          ]}
        />
      </Stack>
      <PostCardsList posts={data?.posts} paginationProps={paginationProps} />
    </Layout>
  )
}

export default Home
