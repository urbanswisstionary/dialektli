import Box from "@mui/joy/Box"
import Typography from "@mui/joy/Typography"
import PostsTable from "./components/postsTable"
import { FC, useMemo, useState } from "react"

import { AdminPostFragment, useAdminPostsQuery } from "@/hooks/usePosts"
import { getFragmentData } from "@@/generated"
import type { MeFragmentFragment } from "@@/generated/graphql"

const Posts: FC<{ me: MeFragmentFragment }> = ({ me }) => {
  const [globalFilter, setGlobalFilter] = useState("")

  const { data, previousData, loading } = useAdminPostsQuery()
  const adminPosts = data?.adminPosts ?? previousData?.adminPosts
  const posts = useMemo(
    () => [...(getFragmentData(AdminPostFragment, adminPosts?.posts) ?? [])],
    [adminPosts?.posts],
  )

  if (loading) return <div>Loading...</div>

  return (
    <>
      <Box sx={{ mb: 1, alignItems: { xs: "start", sm: "center" } }}>
        <Typography level="h2" component="h1">
          Posts
        </Typography>
      </Box>

      <PostsTable
        posts={posts}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </>
  )
}

export default Posts
