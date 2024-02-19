import type { FC } from "react"
import Box from "@mui/joy/Box"
import Typography from "@mui/joy/Typography"

const Footer: FC = () => (
  <Box component="footer" pt={4}>
    <Typography level="body-xs" textAlign="center">
      © UrbanSwisstionary {new Date().getFullYear()}
    </Typography>
  </Box>
)

export default Footer
