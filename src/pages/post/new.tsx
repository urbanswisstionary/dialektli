import { NextPage } from "next"
import Layout from "@/features/layout/layout"
import NewPostForm from "@/features/postForm/newPostForm"
import { useMe } from "@/hooks/useMe"

const NewPost: NextPage = () => {
  const { me } = useMe()

  return (
    <Layout hideSidebar={!me}>
      <NewPostForm authorId={me?.id} />
    </Layout>
  )
}

export default NewPost
