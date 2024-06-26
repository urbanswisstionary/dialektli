import Layout from "@/features/layout/layout"
import { useMe } from "@/hooks/useUsers"
import { GetStaticProps, NextPage } from "next"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import type { ParsedUrlQuery } from "querystring"
import Box from "@mui/joy/Box"
import CircularProgress from "@mui/joy/CircularProgress"
import Stack from "@mui/joy/Stack"
import { getStaticPropsTranslations } from "@/utils/i18n"
import { NoSEO } from "@/providers/Head"
import NoUserFound from "@/features/Auth/profile/components/noUserFound"

const MyProfile = dynamic(() => import("@/features/Auth/profile"), {
  ssr: false,
})
const ExpressionsTable = dynamic(
  () => import("@/features/Auth/expressionsTable"),
  { ssr: false },
)

const UsersTable = dynamic(() => import("@/features/Auth/usersTable"), {
  ssr: false,
})

type Query = ParsedUrlQuery & {
  view?: "expressions" | "users"
}

const ProfilePage: NextPage = () => {
  const { me, loading: meLoading, isAdmin } = useMe()
  const router = useRouter()
  const query = router.query as Query

  const view = query.view ?? "profile"

  return (
    <>
      <NoSEO />
      <Layout>
        <Box mt={2}>
          {meLoading ? (
            <Stack direction="row" justifyContent="center" my={5}>
              <CircularProgress size="lg" variant="soft" />
            </Stack>
          ) : !me ? (
            <NoUserFound />
          ) : view === "expressions" ? (
            <ExpressionsTable />
          ) : view === "users" && isAdmin ? (
            <UsersTable />
          ) : (
            <MyProfile me={me} />
          )}
        </Box>
      </Layout>
    </>
  )
}

export default ProfilePage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await getStaticPropsTranslations(locale)) },
})
