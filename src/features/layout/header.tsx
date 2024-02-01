import IconButton from "@mui/joy/IconButton"
import Sheet from "@mui/joy/Sheet"
import MenuRoundedIcon from "@mui/icons-material/MenuRounded"
import { toggleSidebar } from "./utils"
import type { FC } from "react"
import Typography from "@mui/joy/Typography"
import ColorSchemeToggle from "@/ui/ColorSchemeToggle"
import Link from "next/link"

const Header: FC<{ hideSidebar?: boolean }> = ({ hideSidebar }) => (
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
      pl: hideSidebar ? 2 : { xs: 2, md: "calc(var(--Sidebar-width) + 1rem)" },
    }}
  >
    <Link href="/" passHref>
      <Typography level="title-lg">UrbanSwisstionary</Typography>
    </Link>

    {hideSidebar ? (
      <ColorSchemeToggle />
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

export default Header
