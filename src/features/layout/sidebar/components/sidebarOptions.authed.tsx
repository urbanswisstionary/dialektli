import type { FC } from "react"
import Avatar from "@mui/joy/Avatar"
import Box from "@mui/joy/Box"
import Chip from "@mui/joy/Chip"
import Divider from "@mui/joy/Divider"
import IconButton from "@mui/joy/IconButton"
import List from "@mui/joy/List"
import { listItemButtonClasses } from "@mui/joy/ListItemButton"
import Typography from "@mui/joy/Typography"
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded"
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded"
import UnpublishedRoundedIcon from "@mui/icons-material/UnpublishedRounded"
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd"
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded"
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

type Query = ParsedUrlQuery & {
  values?: "all" | "published" | "unpublished"
  users?: "new" | "permissions"
}

const profilePagePathname = "/account/profile"

const ChipCounter: FC<{ count: number }> = ({ count }) => (
  <Chip size="sm" color="primary" variant="outlined">
    {count}
  </Chip>
)

const AuthedSidebarOptions: FC<{
  me: MeFragmentFragment
  isAdmin?: boolean
}> = ({ me, isAdmin }) => {
  const router = useRouter()
  const query = router.query as Query

  const onClickHandler = ({ values, users }: Query = {}) => {
    const urlParam = values
      ? `?values=${values}`
      : users
        ? `?users=${users}`
        : ""
    router.pathname !== profilePagePathname
      ? router.push(`${profilePagePathname}${urlParam}`)
      : setQueryOnPage(router, {
          users: users ?? [],
          values: values ?? [],
        })
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
            selected={
              router.pathname === profilePagePathname &&
              !Object.keys(query).length
            }
            onClick={onClickHandler}
          />

          <SidebarOption
            hide={!isAdmin}
            label="Dashboard"
            startDecorator={<DashboardRoundedIcon />}
            onClick={() => router.push("admin/dashboard")}
            disabled
          />
          <SidebarOption
            label="My Values"
            startDecorator={<AllInboxIcon />}
            nested
            defaultExpanded={!!query.values}
            nestedOptions={[
              {
                label: "All",
                selected: query.values === "all",
                onClick: () => onClickHandler({ values: "all" }),
                startDecorator: <AssignmentRoundedIcon />,
                endDecorator: (
                  <ChipCounter
                    count={
                      me.myPublishedPostsCount + me.myUnpublishedPostsCount
                    }
                  />
                ),
              },
              {
                label: "Published",
                selected: query.values === "published",
                onClick: () => onClickHandler({ values: "published" }),
                startDecorator: <CheckCircleRoundedIcon />,
                endDecorator: <ChipCounter count={me.myPublishedPostsCount} />,
              },
              {
                label: "Unpublished",
                selected: query.values === "unpublished",
                onClick: () => onClickHandler({ values: "unpublished" }),
                startDecorator: <UnpublishedRoundedIcon />,
                endDecorator: (
                  <ChipCounter count={me.myUnpublishedPostsCount} />
                ),
              },
            ]}
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
                selected: query.users === "new",
                onClick: () => onClickHandler({ users: "new" }),
                startDecorator: <PersonAddIcon />,
              },
              {
                label: "Roles & permission",
                selected: query.users === "permissions",
                onClick: () => onClickHandler({ users: "permissions" }),
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
