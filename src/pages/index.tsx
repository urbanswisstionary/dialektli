import { useMe } from "@/hooks/useMe"
import Layout from "@/features/layout/layout"
import SearchPostsInput from "@/features/searchPostsInput"
import Box from "@mui/joy/Box"
import Stack from "@mui/joy/Stack"
import { NextPage } from "next"
import AccordionGroup from "@mui/joy/AccordionGroup"
import Accordion from "@mui/joy/Accordion"
import AccordionDetails from "@mui/joy/AccordionDetails"
import AccordionSummary from "@mui/joy/AccordionSummary"

import PostCard from "@/features/postCard"
import Link from "next/link"
import IconButton from "@mui/joy/IconButton"

import AddIcon from "@mui/icons-material/Add"
import { PostFragment, usePostsQuery } from "@/hooks/usePosts"
import { getFragmentData } from "@@/generated"

import { useState } from "react"
import TablePagination from "@/features/Auth/postTable/components/pagination"
import SelectLocation from "@/ui/selectLocation"
import { ParsedUrlQuery } from "querystring"
import { useRouter } from "next/router"
import Divider from "@mui/joy/Divider"
import { setQueryOnPage } from "@/utils/setQueryOnPage"
import SelectLetter from "@/ui/selectLetter"

type Query = ParsedUrlQuery & {
  canton?: string
  firstChar?: string
}

const defaultPageSize = 10
const Home: NextPage = () => {
  const router = useRouter()
  const query = router.query as Query
  const me = useMe().me
  const [{ page, pageSize }, setPagination] = useState({
    page: 1,
    pageSize: defaultPageSize,
  })

  const postQuery = usePostsQuery({
    offset: (page - 1) * pageSize,
    limit: pageSize,
    canton: query.canton,
    firstChar: query.firstChar,
  })
  const data = postQuery.data?.posts ?? postQuery.previousData?.posts
  const pagesCount = Math.max(1, Math.ceil((data?.count ?? 0) / pageSize))

  const posts = getFragmentData(PostFragment, data?.posts)

  const pagination = (
    <TablePagination
      currentPage={page}
      totalPages={pagesCount}
      onChange={(page) => setPagination((prev) => ({ ...prev, page }))}
      itemsPerPage={pageSize}
      onItemsPerPageChange={(pageSize) =>
        setPagination((prev) => ({ ...prev, pageSize }))
      }
    />
  )
  return (
    <Layout hideSidebar={!me}>
      <Stack sx={{ mt: 5, mb: 3, gap: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
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

        <SelectLocation
          mode="canton"
          value={query.canton}
          onChange={(canton) => setQueryOnPage(router, { canton })}
          label="Filter by canton"
        />
        <AccordionGroup>
          <Accordion>
            <AccordionSummary sx={{ p: 0, fontSize: "sm" }}>
              Select First Letter
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0, pt: 2 }}>
              <SelectLetter
                value={query.firstChar}
                onChange={(firstChar) =>
                  setQueryOnPage(router, {
                    firstChar: query.firstChar === firstChar ? null : firstChar,
                  })
                }
                label={false}
              />
            </AccordionDetails>
          </Accordion>
        </AccordionGroup>
      </Stack>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          pt: 5,
        }}
      >
        {pagination}
        {posts?.length ? (
          posts.map((post) => (
            <PostCard key={post.id} post={post} disableActions={!me} />
          ))
        ) : (
          <>No data sorry :(</>
        )}
        {pagination}
      </Box>
    </Layout>
  )
}

export default Home
