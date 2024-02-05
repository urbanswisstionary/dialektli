import type { FC } from "react"
import Box from "@mui/joy/Box"
import List from "@mui/joy/List"
import ListItem from "@mui/joy/ListItem"
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton"
import LoginRoundedIcon from "@mui/icons-material/LoginRounded"
import Link from "next/link"

const UnauthedSidebarOptions: FC = () => (
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
    }}
  >
    <List
      size="sm"
      sx={{
        mt: "auto",
        flexGrow: 0,
        "--ListItem-radius": (theme) => theme.vars.radius.sm,
        "--List-gap": "8px",
      }}
    >
      <ListItem>
        <Link href="/account/signin" passHref style={{ width: "100%" }}>
          <ListItemButton>
            <LoginRoundedIcon />
            Sign In
          </ListItemButton>
        </Link>
      </ListItem>
    </List>
  </Box>
)

export default UnauthedSidebarOptions
