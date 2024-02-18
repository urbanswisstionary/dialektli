import Box from "@mui/joy/Box"
import Typography from "@mui/joy/Typography"
import PostsTable from "./components/postsTable"
import { FC, useMemo, useState } from "react"

import { PostFragment, usePosts } from "@/hooks/usePosts"
import { getFragmentData } from "@@/generated"
import type { PaginationState } from "@tanstack/react-table"
import {
  PostWithCountQueryMode,
  type MeFragmentFragment,
} from "@@/generated/graphql"

const initialPagination: PaginationState = {
  pageIndex: 0,
  pageSize: 10,
}

const Posts: FC<{ me: MeFragmentFragment }> = () => {
  const [globalFilter, setGlobalFilter] = useState("")

  const [pagination, setPagination] =
    useState<PaginationState>(initialPagination)

  const { data, previousData, loading } = usePosts({
    offset: pagination.pageIndex * pagination.pageSize,
    limit: pagination.pageSize,
    mode: PostWithCountQueryMode.All,
  })
  const postsWithCount = data?.postsWithCount ?? previousData?.postsWithCount
  const posts = useMemo(() => {
    const posts = getFragmentData(PostFragment, postsWithCount?.posts) ?? []
    return [...posts]
  }, [postsWithCount?.posts])
  const totalPages = Math.ceil(
    (postsWithCount?.count ?? 0) / pagination.pageSize,
  )

  if (loading) return <div>Loading...</div>

  return (
    <Box sx={{ height: "100%", overflow: "auto" }}>
      <Box sx={{ mb: 1, alignItems: { xs: "start", sm: "center" } }}>
        <Typography level="h2" component="h1">
          Posts
        </Typography>
      </Box>

      <PostsTable
        posts={posts}
        totalPages={totalPages}
        pagination={pagination}
        onPaginationChange={setPagination}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </Box>
  )
}

export default Posts
