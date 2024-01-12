import { FC } from "react"
import Image from "next/image"
import Box from "@mui/joy/Box"
import IconButton from "@mui/joy/IconButton"
import Typography from "@mui/joy/Typography"
import ColorSchemeToggle from "@/ui/ColorSchemeToggle"
import Link from "next/link"

const Header: FC = () => (
  <Box
    component="header"
    sx={{
      py: 3,
      display: "flex",
      alignItems: "left",
      justifyContent: "space-between",
    }}
  >
    <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
      <Link href="/" passHref>
        <IconButton variant="soft" color="neutral" size="sm">
          <Image
            src="/apple-touch-icon.png"
            alt="logo"
            width={24}
            height={24}
          />
        </IconButton>
      </Link>
      <Typography level="title-lg">UrbanSwisstionary</Typography>
    </Box>
    <ColorSchemeToggle />
  </Box>
)

export default Header
