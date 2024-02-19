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

import Pagination, { PaginationProps } from "@mui/material/Pagination"
import { ChangeEvent, useState } from "react"
import { PostWithCountQueryMode } from "@@/generated/graphql"

const defaultPageSize = 10
const Home: NextPage = () => {
  const me = useMe().me
  const [page, setPage] = useState(1)
  const data = usePosts({
    offset: (page - 1) * defaultPageSize,
    limit: defaultPageSize,
    mode: PostWithCountQueryMode.ExcludeUnpublished,
  }).data?.postsWithCount

  const pagesCount = Math.max(
    1,
    Math.ceil((data?.count ?? 0) / defaultPageSize),
  )
  const paginationProps: PaginationProps = {
    page: page,
    onChange: (_event: ChangeEvent<unknown>, page: number) => setPage(page),
    count: pagesCount,
    disabled: pagesCount <= 1,
    shape: "rounded",
    variant: "outlined",
    boundaryCount: 2,
  }
  const posts = getFragmentData(PostFragment, data?.posts)
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Pagination {...paginationProps} />
        {posts?.map((post) => <PostCard key={post.id} post={post} />)}
        <Pagination {...paginationProps} />
      </Box>
    </Layout>
  )
}

export default Home
