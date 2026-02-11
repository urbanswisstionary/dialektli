"use client"

import IconButton from "@mui/material/IconButton"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import MenuRoundedIcon from "@mui/icons-material/MenuRounded"
import { toggleSidebar } from "./sidebar.utils"
import type { FC } from "react"
import ColorSchemeToggle from "@/components/ui/ColorSchemeToggle"
import { Link } from "@/i18n/navigation"
import Logo from "@/components/ui/Logo"
import Box from "@mui/material/Box"
import LoginRoundedIcon from "@mui/icons-material/LoginRounded"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { usePathname } from "@/i18n/navigation"
import { useMe } from "@/hooks/useUsers"
import { useTranslations } from "next-intl"

const signinPagePathname = "/auth/signin"
const profilePagePathname = "/account/profile"

const Header: FC<{ hideSidebar?: boolean }> = ({ hideSidebar }) => {
  const t = useTranslations()

  const pathname = usePathname()
  const { me, loading: MeLoading } = useMe()

  return (
    <AppBar
      position="fixed"
      sx={{
        display: hideSidebar ? "flex" : { xs: "flex", md: "none" },
        height: "var(--Header-height)",
        zIndex: 9998,
        boxShadow: 1,
        pl: hideSidebar
          ? "1rem"
          : { xs: "1rem", md: "calc(var(--Sidebar-width) + 1rem)" },
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Link href="/">
          <Logo />
        </Link>

        {hideSidebar ? (
          <Box display="flex" gap={1}>
            {me ? (
              <Link
                href={profilePagePathname}
                hidden={pathname === profilePagePathname}
              >
                <IconButton
                  title={t("layout.sidebar.profile")}
                  color="inherit"
                  size="small"
                >
                  <AccountCircleIcon />
                </IconButton>
              </Link>
            ) : (
              <Link
                href={signinPagePathname}
                hidden={pathname === signinPagePathname || MeLoading}
              >
                <IconButton
                  title={t("layout.sidebar.signIn")}
                  color="inherit"
                  size="small"
                >
                  <LoginRoundedIcon />
                </IconButton>
              </Link>
            )}
            <ColorSchemeToggle />
          </Box>
        ) : (
          <Box display="flex" gap={1}>
            <IconButton
              onClick={() => toggleSidebar()}
              color="inherit"
              size="small"
              aria-label="Open menu"
              sx={{ display: { xs: "inherit", md: "none" } }}
            >
              <MenuRoundedIcon />
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
