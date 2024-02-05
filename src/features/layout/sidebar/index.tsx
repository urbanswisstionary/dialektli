import type { FC } from "react"
import Box from "@mui/joy/Box"
import Sheet from "@mui/joy/Sheet"
import ColorSchemeToggle from "../colorSchemeToggle"
import { closeSidebar } from "./sidebar.utils"
import Link from "next/link"
import Logo from "@/ui/Logo"
import { useMe } from "@/hooks/useMe"
import AuthedSidebarOptions from "./components/sidebarOptions.authed"
import UnauthedSidebarOptions from "./components/sidebarOptions.unauthed"

const Sidebar: FC = () => {
  const { me, isAdmin } = useMe()
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
      {me ? (
        <AuthedSidebarOptions me={me} isAdmin={isAdmin} />
      ) : (
        <UnauthedSidebarOptions />
      )}
    </Sheet>
  )
}

export default Sidebar
