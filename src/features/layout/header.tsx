import IconButton from "@mui/joy/IconButton"
import Sheet from "@mui/joy/Sheet"
import MenuRoundedIcon from "@mui/icons-material/MenuRounded"
import { toggleSidebar } from "./sidebar/sidebar.utils"
import type { FC } from "react"
import ColorSchemeToggle from "@/ui/ColorSchemeToggle"
import Link from "next/link"
import Logo from "@/ui/Logo"
import Box from "@mui/joy/Box"
import LoginRoundedIcon from "@mui/icons-material/LoginRounded"
import { useRouter } from "next/router"

const signinPagePathname = "/account/signin"

const Header: FC<{ hideSidebar?: boolean }> = ({ hideSidebar }) => {
  const router = useRouter()
  return (
    <Sheet
      sx={{
        display: hideSidebar ? "flex" : { xs: "flex", md: "none" },
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        width: "100%",
        height: "var(--Header-height)",
        zIndex: 9998,
        p: 2,
        gap: 1,
        borderBottom: "1px solid",
        borderColor: "background.level1",
        boxShadow: "sm",
        pl: hideSidebar
          ? "1rem"
          : { xs: "1rem", md: "calc(var(--Sidebar-width) + 1rem)" },
      }}
    >
      <Link href="/" passHref>
        <Logo />
      </Link>

      {hideSidebar ? (
        <Box display="flex" gap={2}>
          <Link
            href={signinPagePathname}
            passHref
            style={{ width: "100%" }}
            hidden={router.pathname === signinPagePathname}
          >
            <IconButton
              title="Sign In"
              variant="outlined"
              color="neutral"
              size="sm"
            >
              <LoginRoundedIcon />
            </IconButton>
          </Link>
          <ColorSchemeToggle />
        </Box>
      ) : (
        <IconButton
          onClick={() => toggleSidebar()}
          variant="outlined"
          color="neutral"
          size="sm"
          sx={{ display: { xs: "inherit", md: "none" } }}
        >
          <MenuRoundedIcon />
        </IconButton>
      )}
    </Sheet>
  )
}

export default Header
