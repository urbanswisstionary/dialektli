import Layout from "@/features/layout/layout"
import { useMe } from "@/hooks/useMe"
import Link from "@mui/joy/Link"
import { NextPage } from "next"
import dynamic from "next/dynamic"
import NextLink from "next/link"

import { useRouter } from "next/router"
import type { ParsedUrlQuery } from "querystring"

const MyProfile = dynamic(() => import("@/features/Auth/profile"), {
  ssr: false,
})
const TermsAdmin = dynamic(() => import("@/features/Auth/termsAdmin"), {
  ssr: false,
})

type Query = ParsedUrlQuery & {
  view?: "terms" | "users"
}

const ProfilePage: NextPage = () => {
  const { me, loading: meLoading, isAdmin } = useMe()
  const router = useRouter()
  const query = router.query as Query

  if (meLoading) return <>Loading..</>

  return (
    <Layout>
      {me ? (
        query.view === "terms" ? (
          <TermsAdmin />
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
