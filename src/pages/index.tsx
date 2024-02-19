import { useMe } from "@/hooks/useMe"
import Layout from "@/features/layout/layout"
import SearchPostsInput from "@/features/searchPostsInput"
import { Box } from "@mui/joy"
import { NextPage } from "next"
import PostCard from "@/features/postCard"
import Link from "next/link"
import IconButton from "@mui/joy/IconButton"

import AddIcon from "@mui/icons-material/Add"
import { PostFragment, usePostsQuery } from "@/hooks/usePosts"
import { getFragmentData } from "@@/generated"

import { useState } from "react"
import TablePagination from "@/features/Auth/postTable/components/pagination"
import SelectLocation from "@/features/Auth/profile/components/selectLocation"

const defaultPageSize = 10
const Home: NextPage = () => {
  const me = useMe().me
  const [{ page, pageSize }, setPagination] = useState({
    page: 1,
    pageSize: defaultPageSize,
  })
  const [queryByCanton, setQueryByCanton] = useState<string | null>(null)

  const data = usePostsQuery({
    offset: (page - 1) * pageSize,
    limit: pageSize,
  }).data?.posts

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
      <Box
        sx={{
          my: 2.5,
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
      <Box>
        <SelectLocation
          mode="canton"
          value={queryByCanton}
          onChange={(canton) => setQueryByCanton(canton)}
          label="Filter by canton"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
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
