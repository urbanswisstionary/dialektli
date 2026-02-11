"use client"

import type { FC } from "react"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import ColorSchemeToggle from "@/components/ui/ColorSchemeToggle"
import SelectLocale from "@/components/ui/SelectLocale"
import { closeSidebar } from "./sidebar.utils"
import { Link } from "@/i18n/navigation"
import Logo from "@/components/ui/Logo"
import { useMe } from "@/hooks/useUsers"
import dynamic from "next/dynamic"
import Avatar from "@mui/material/Avatar"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
import SupportRoundedIcon from "@mui/icons-material/SupportRounded"
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded"
import { signOut } from "next-auth/react"
import { usePathname } from "@/i18n/navigation"
import CottageRoundedIcon from "@mui/icons-material/CottageRounded"
import MapRoundedIcon from "@mui/icons-material/MapRounded"
import SidebarOption from "./SidebarOption"
import LoginRoundedIcon from "@mui/icons-material/LoginRounded"
import { useTranslations } from "next-intl"

const AuthedSidebarOptions = dynamic(() => import("./AuthedSidebarOptions"), {
  ssr: false,
})

const Sidebar: FC = () => {
  const t = useTranslations()
  const { me, isAdmin } = useMe()
  const pathname = usePathname()

  return (
    <Box
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        maxHeight: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
        overflow: "auto",
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
          bgcolor: "action.disabledBackground",
          transition: "opacity 0.25s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={closeSidebar}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Link href="/">
          <Logo />
        </Link>
        <ColorSchemeToggle sx={{ ml: "auto" }} />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", py: 1 }}>
        <SelectLocale />
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <List sx={{ flexGrow: 0 }}>
          <SidebarOption
            label={t("layout.sidebar.home")}
            startDecorator={<CottageRoundedIcon />}
            selected={pathname === "/"}
            link={"/"}
          />
          <SidebarOption
            label={t("layout.sidebar.sprachatlas")}
            startDecorator={<MapRoundedIcon />}
            selected={pathname === "/sprachatlas"}
            link={"/sprachatlas"}
          />
        </List>
        {me ? <AuthedSidebarOptions isAdmin={isAdmin} /> : null}

        <List sx={{ mt: "auto", flexGrow: 0 }}>
          <SidebarOption
            label={t("layout.sidebar.support")}
            startDecorator={<SupportRoundedIcon />}
            disabled
            selected={pathname === "/support"}
            link="/support"
            hide
          />
          <Divider sx={{ my: 1 }} />

          {me ? (
            <Box display="flex" gap={1} alignItems="center" px={2} py={1}>
              {me.image ? (
                <Avatar src={me.image} sx={{ width: 32, height: 32 }} />
              ) : (
                <Avatar sx={{ width: 32, height: 32 }}>
                  {me.name?.length ? me.name[0] : (me.email?.[0] ?? "?")}
                </Avatar>
              )}
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography variant="subtitle2" noWrap>
                  {me.name}
                </Typography>
                <Typography variant="body2" noWrap color="text.secondary">
                  {me.email}
                </Typography>
              </Box>
              <IconButton
                size="small"
                color="default"
                onClick={() => signOut({ callbackUrl: "/" })}
                title={t("layout.sidebar.signOut")}
              >
                <LogoutRoundedIcon />
              </IconButton>
            </Box>
          ) : (
            <SidebarOption
              label={t("layout.sidebar.signIn")}
              startDecorator={<LoginRoundedIcon />}
              selected={pathname === "/auth/signin"}
              link={"/auth/signin"}
            />
          )}
        </List>
      </Box>
    </Box>
  )
}

export default Sidebar
