import Layout from "@/features/layout/layout"
import { useMe } from "@/hooks/useMe"
import { NextPage } from "next"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import type { ParsedUrlQuery } from "querystring"

const MyProfile = dynamic(() => import("@/features/Auth/profile"), {
  ssr: false,
})
const PostsTable = dynamic(() => import("@/features/Auth/postTable"), {
  ssr: false,
})

type Query = ParsedUrlQuery & {
  view?: "posts" | "users"
}

const ProfilePage: NextPage = () => {
  const { me, loading: meLoading, isAdmin } = useMe()
  const router = useRouter()
  const query = router.query as Query

  if (meLoading) return <>Loading..</>

  if (!me?.id) {
    router.push("/")
    return <>Redirecting..</>
  }

  return (
    <Layout>
      {query.view === "posts" ? (
        <PostsTable me={me} />
      ) : query.view === "users" && isAdmin ? (
        <h1>Users: {query.users}</h1>
      ) : (
        <MyProfile me={me} />
      )}
    </Layout>
  )
}

export default ProfilePage
