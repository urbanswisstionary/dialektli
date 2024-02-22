import Layout from "@/features/layout/layout"
import { useMe } from "@/hooks/useMe"
import Link from "@mui/joy/Link"
import { NextPage } from "next"
import dynamic from "next/dynamic"
import NextLink from "next/link"
import { useRouter } from "next/router"
import type { ParsedUrlQuery } from "querystring"
import Box from "@mui/joy/Box"
import Typography from "@mui/joy/Typography"
import CircularProgress from "@mui/joy/CircularProgress"
import Stack from "@mui/joy/Stack"

const MyProfile = dynamic(() => import("@/features/Auth/profile"), {
  ssr: false,
})
const TermsTable = dynamic(() => import("@/features/Auth/termsTable"), {
  ssr: false,
})

type Query = ParsedUrlQuery & {
  view?: "terms" | "users"
}

const ProfilePage: NextPage = () => {
  const { me, loading: meLoading, isAdmin } = useMe()
  const router = useRouter()
  const query = router.query as Query

  const view = query.view ?? "profile"
  return (
    <Layout>
      <Box sx={{ mb: 2, alignItems: { xs: "start", sm: "center" } }}>
        <Typography level="h2" component="h1" textTransform="capitalize">
          {view}
        </Typography>
      </Box>
      {meLoading ? (
        <Stack direction="row" justifyContent="center" my={5}>
          <CircularProgress size="lg" variant="soft" />
        </Stack>
      ) : !me ? (
        <NoUserFound />
      ) : view === "terms" ? (
        <TermsTable />
      ) : view === "users" && isAdmin ? (
        <h1>Users table</h1>
      ) : (
        <MyProfile me={me} />
      )}
    </Layout>
  )
}

export default ProfilePage

const NoUserFound = () => (
  <>
    User not found, try to{" "}
    <Link component={NextLink} href={"/account/signin"}>
      sign in
    </Link>{" "}
    again
  </>
)
