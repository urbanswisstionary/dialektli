import ProfileLayout from "@/features/layout/layout"
import { NextPage } from "next"
import dynamic from "next/dynamic"

const MyProfile = dynamic(() => import("@/features/Auth/profile"), {
  ssr: false,
})

const ProfilePage: NextPage = () => {
  return (
    <ProfileLayout>
      <MyProfile />
    </ProfileLayout>
  )
}

export default ProfilePage
