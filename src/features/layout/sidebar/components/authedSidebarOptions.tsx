import type { FC } from "react"
import List from "@mui/joy/List"
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd"
import GroupRoundedIcon from "@mui/icons-material/GroupRounded"
import AllInboxIcon from "@mui/icons-material/AllInbox"
import { useRouter } from "next/router"
import type { ParsedUrlQuery } from "querystring"
import SidebarOption from "./sidebarOption"
import { useTranslation } from "next-i18next"

type ProfileView = "expressions" | "users"

type Query = ParsedUrlQuery & {
  view?: ProfileView
}

const profilePagePathname = "/account/profile"

const AuthedSidebarOptions: FC<{
  isAdmin?: boolean
}> = ({ isAdmin }) => {
  const { t } = useTranslation("common", { keyPrefix: "layout.sidebar" })
  const router = useRouter()
  const query = router.query as Query

  const isProfilePage = router.pathname === profilePagePathname

  const getLink = ({ view }: Query = {}) =>
    `${profilePagePathname}${view ? `?view=${view}` : ""}`

  return (
    <List size="sm">
      <SidebarOption
        label={t("profile")}
        startDecorator={<AssignmentIndIcon />}
        selected={isProfilePage && !Object.keys(query).length}
        link={getLink()}
      />
      <SidebarOption
        label={t("expressions")}
        startDecorator={<AllInboxIcon />}
        selected={isProfilePage && query.view === "expressions"}
        link={getLink({ view: "expressions" })}
      />
      <SidebarOption
        hide={!isAdmin}
        label={t("users")}
        startDecorator={<GroupRoundedIcon />}
        selected={isProfilePage && query.view === "users"}
        link={getLink({ view: "users" })}
      />
    </List>
  )
}

export default AuthedSidebarOptions
