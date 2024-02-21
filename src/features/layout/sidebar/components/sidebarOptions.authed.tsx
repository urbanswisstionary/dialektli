import type { FC } from "react"
import Avatar from "@mui/joy/Avatar"
import Box from "@mui/joy/Box"
import Divider from "@mui/joy/Divider"
import IconButton from "@mui/joy/IconButton"
import List from "@mui/joy/List"
import { listItemButtonClasses } from "@mui/joy/ListItemButton"
import Typography from "@mui/joy/Typography"
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd"
import GroupRoundedIcon from "@mui/icons-material/GroupRounded"
import SupportRoundedIcon from "@mui/icons-material/SupportRounded"
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded"
import AllInboxIcon from "@mui/icons-material/AllInbox"
import { signOut } from "next-auth/react"
import { MeFragmentFragment } from "@@/generated/graphql"
import { useRouter } from "next/router"
import type { ParsedUrlQuery } from "querystring"
import { setQueryOnPage } from "@/utils/setQueryOnPage"
import RecentActorsIcon from "@mui/icons-material/RecentActors"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import SidebarOption from "./sidebarOption"

type ProfileView = "terms" | "users"

type Query = ParsedUrlQuery & {
  view?: ProfileView
}

const profilePagePathname = "/account/profile"

const AuthedSidebarOptions: FC<{
  me: MeFragmentFragment
  isAdmin?: boolean
}> = ({ me, isAdmin }) => {
  const router = useRouter()
  const query = router.query as Query
  const isProfilePage = router.pathname === profilePagePathname
  const getLink = ({ view }: Query = {}) => {
    if (isProfilePage) return
    const urlParam = view ? `?view=${view}` : ""
    return `${profilePagePathname}${urlParam}`
  }
  const onClickHandler = (
    { view }: { view: ProfileView | null } = { view: null },
  ) => {
    if (!isProfilePage) return
    setQueryOnPage(router, { view })
  }
  return (
    <>
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
          ul: {
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
            "--List-nestedInsetStart": "1rem",
            gap: 1,
            textTransform: "capitalize",
          },
        }}
      >
        <List size="sm">
          <SidebarOption
            label="My Profile"
            startDecorator={<AssignmentIndIcon />}
            selected={isProfilePage && !Object.keys(query).length}
            onClick={onClickHandler}
            link={getLink()}
          />
          <SidebarOption
            label="My Terms"
            startDecorator={<AllInboxIcon />}
            selected={query.view === "terms"}
            onClick={() => onClickHandler({ view: "terms" })}
            link={getLink({ view: "terms" })}
          />
          <SidebarOption
            hide={!isAdmin}
            label="Users"
            startDecorator={<GroupRoundedIcon />}
            nested
            defaultExpanded={!!query.users}
            nestedOptions={[
              {
                label: "Create a new user",
                selected: query.view === "users",
                onClick: () => onClickHandler({ view: "users" }),
                link: getLink({ view: "users" }),
                startDecorator: <PersonAddIcon />,
              },
              {
                label: "Roles & permission",
                selected: query.view === "users",
                onClick: () => onClickHandler({ view: "users" }),
                link: getLink({ view: "users" }),
                startDecorator: <RecentActorsIcon />,
              },
            ]}
          />
        </List>
        <List size="sm" sx={{ flexGrow: 0 }}>
          <SidebarOption
            label="support"
            startDecorator={<SupportRoundedIcon />}
            disabled
            onClick={() => router.push("/support")}
          />
        </List>
      </Box>
      <Divider />

      <Box display="flex" gap={1} alignItems="center">
        {me.image ? (
          <Avatar variant="outlined" size="sm" src={me?.image} />
        ) : (
          <Avatar variant="outlined" size="sm">
            {me.name?.length ? me.name[0] : me.email[0]}
          </Avatar>
        )}
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm" noWrap>
            {me.name}
          </Typography>
          <Typography level="body-xs" noWrap>
            {me.email}
          </Typography>
        </Box>
        <IconButton
          size="sm"
          variant="plain"
          color="neutral"
          onClick={() => signOut()}
          title="Sign out"
        >
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </>
  )
}

export default AuthedSidebarOptions
