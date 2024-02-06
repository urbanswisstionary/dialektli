import Layout from "@/features/layout/layout"
import { useMe } from "@/hooks/useMe"
import { NextPage } from "next"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"

const MyProfile = dynamic(() => import("@/features/Auth/profile"), {
  ssr: false,
})

const ProfilePage: NextPage = () => {
  const { me, loading: meLoading } = useMe()
  const router = useRouter()

  if (meLoading) return <>Loading..</>

  if (!me?.id) {
    router.push("/")
    return <>Redirecting..</>
  }
  return (
    <Layout>
      <MyProfile me={me} />
    </Layout>
  )
}

export default ProfilePage
