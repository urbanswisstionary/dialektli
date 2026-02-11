"use client"

import type { FC } from "react"
import List from "@mui/material/List"
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd"
import GroupRoundedIcon from "@mui/icons-material/GroupRounded"
import AllInboxIcon from "@mui/icons-material/AllInbox"
import { usePathname, useRouter } from "@/i18n/navigation"
import { useSearchParams } from "next/navigation"
import SidebarOption from "./SidebarOption"
import { useTranslations } from "next-intl"

type ProfileView = "expressions" | "users"

const profilePagePathname = "/account/profile"

const AuthedSidebarOptions: FC<{
  isAdmin?: boolean
}> = ({ isAdmin }) => {
  const t = useTranslations()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const view = searchParams.get("view") as ProfileView | null

  const isProfilePage = pathname === profilePagePathname

  const getLink = (viewParam?: ProfileView) =>
    `${profilePagePathname}${viewParam ? `?view=${viewParam}` : ""}`

  return (
    <List>
      <SidebarOption
        label={t("layout.sidebar.profile")}
        startDecorator={<AssignmentIndIcon />}
        selected={isProfilePage && !view}
        link={getLink()}
      />
      <SidebarOption
        label={t("layout.sidebar.expressions")}
        startDecorator={<AllInboxIcon />}
        selected={isProfilePage && view === "expressions"}
        link={getLink("expressions")}
      />
      <SidebarOption
        hide={!isAdmin}
        label={t("layout.sidebar.users")}
        startDecorator={<GroupRoundedIcon />}
        selected={isProfilePage && view === "users"}
        link={getLink("users")}
      />
    </List>
  )
}

export default AuthedSidebarOptions
