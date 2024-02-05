import { useMe } from "@/hooks/useMe"
import Layout from "@/features/layout/layout"
import SearchPostsInput from "@/features/searchPostsInput"
import { Box } from "@mui/joy"
import { NextPage } from "next"
import PostCard from "@/features/postCard"

const Home: NextPage = () => {
  const me = useMe().me

  return (
    <Layout hideSidebar={!me}>
      <SearchPostsInput />
      <Box sx={{ width: "100%", height: "100%" }}>{/* <PostCard /> */}</Box>

      {/* <Box py={"1rem"}>
        <PostCard />
      </Box> */}
    </Layout>
  )
}

export default Home
