import Layout from "@/features/layout/layout"
import { useMe } from "@/hooks/useMe"
import { setQueryOnPage } from "@/utils/setQueryOnPage"
import Link from "@mui/joy/Link"
import { NextPage } from "next"
import dynamic from "next/dynamic"
import NextLink from "next/link"

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

  if (query.view && query.view !== "posts" && !isAdmin)
    setQueryOnPage(router, { view: [] })

  return (
    <Layout>
      {me ? (
        query.view === "posts" ? (
          <PostsTable me={me} />
        ) : query.view === "users" && isAdmin ? (
          <h1>Users: {query.users}</h1>
        ) : (
          <MyProfile me={me} />
        )
      ) : (
        <>
          User not found, try to{" "}
          <Link component={NextLink} href={"/account/signin"}>
            sign in
          </Link>{" "}
          again
        </>
      )}
    </Layout>
  )
}

export default ProfilePage
