import type { FC } from "react"
import Box from "@mui/joy/Box"
import Sheet from "@mui/joy/Sheet"
import ColorSchemeToggle from "../../../ui/ColorSchemeToggle"
import { closeSidebar } from "./sidebar.utils"
import Link from "next/link"
import Logo from "@/ui/Logo"
import { useMe } from "@/hooks/useMe"
import dynamic from "next/dynamic"
import { listItemButtonClasses } from "@mui/joy/ListItemButton"
import Avatar from "@mui/joy/Avatar"
import Divider from "@mui/joy/Divider"
import IconButton from "@mui/joy/IconButton"
import List from "@mui/joy/List"
import Typography from "@mui/joy/Typography"
import SupportRoundedIcon from "@mui/icons-material/SupportRounded"
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded"
import { signOut } from "next-auth/react"
import { useRouter } from "next/router"
import CottageRoundedIcon from "@mui/icons-material/CottageRounded"
import SidebarOption from "./components/sidebarOption"
import LoginRoundedIcon from "@mui/icons-material/LoginRounded"
import { useTranslation } from "next-i18next"

const AuthedSidebarOptions = dynamic(
  () => import("./components/authedSidebarOptions"),
  { ssr: false },
)

const Sidebar: FC = () => {
  const { t } = useTranslation("common", { keyPrefix: "layout.sidebar" })
  const { me, isAdmin } = useMe()
  const router = useRouter()
  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        minHeight: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.25s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={closeSidebar}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Link href="/" passHref>
          <Logo size="md" />
        </Link>

        <ColorSchemeToggle sx={{ ml: "auto" }} />
      </Box>
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
        <List size="sm" sx={{ flexGrow: 0 }}>
          <SidebarOption
            label={t("home")}
            startDecorator={<CottageRoundedIcon />}
            selected={router.pathname === "/"}
            link={"/"}
          />
        </List>
        {me ? <AuthedSidebarOptions isAdmin={isAdmin} /> : null}

        <List size="sm" sx={{ mt: "auto", flexGrow: 0 }}>
        <Divider sx={{ mb: 1, mt: 2 }} />
          <SidebarOption
            label={t("support")}
            startDecorator={<SupportRoundedIcon />}
            disabled
            selected={router.pathname === "/support"}
            link="/support"
          />
          <Divider />

          {me ? (
            <Box display="flex" gap={1} alignItems="center">
              {me.image ? (
                <Avatar variant="outlined" size="sm" src={me.image} />
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
                title={t("signOut")}
              >
                <LogoutRoundedIcon />
              </IconButton>
            </Box>
          ) : (
            <SidebarOption
              label={t("signIn")}
              startDecorator={<LoginRoundedIcon />}
              selected={router.pathname === "/account/signin"}
              link={"/account/signin"}
            />
          )}
        </List>
      </Box>
    </Sheet>
  )
}

export default Sidebar
