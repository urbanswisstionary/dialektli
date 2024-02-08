import { useMe } from "@/hooks/useMe"
import Layout from "@/features/layout/layout"
import SearchPostsInput from "@/features/searchPostsInput"
import { Box } from "@mui/joy"
import { NextPage } from "next"
import PostCard from "@/features/postCard"
import Link from "next/link"
import IconButton from "@mui/joy/IconButton"

import AddIcon from "@mui/icons-material/Add"
import { PostFragment, usePosts } from "@/hooks/usePosts"
import { getFragmentData } from "@@/generated"

import Pagination from "@mui/material/Pagination"
import { useState } from "react"

const defaultPostsPerPage = 10
const Home: NextPage = () => {
  const me = useMe().me
  const [page, setPage] = useState(1)
  const data = usePosts({
    offset: (page - 1) * defaultPostsPerPage,
    limit: defaultPostsPerPage,
  }).data?.postsWithCount

  const posts = getFragmentData(PostFragment, data?.posts)
  const count = data?.count ?? 0
  const totalPages = Math.ceil(count / defaultPostsPerPage)
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
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Pagination
          count={totalPages > 1 ? totalPages : 0}
          shape="rounded"
          variant="outlined"
          boundaryCount={2}
          page={page}
          onChange={(_event, value) => setPage(value)}
        />
        {posts?.map((post) => <PostCard key={post.id} post={post} />)}
      </Box>
    </Layout>
  )
}

export default Home
