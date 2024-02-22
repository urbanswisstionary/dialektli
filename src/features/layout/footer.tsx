import type { FC } from "react"
import Box from "@mui/joy/Box"
import Typography from "@mui/joy/Typography"
import SelectLanguage from "@/ui/Autocomplete/SelectLanguage"

const Footer: FC = () => (
  <Box
    component="footer"
    pt={4}
    sx={{ width: "100%", maxWidth: "1024px", margin: "0 auto" }}
  >
    <SelectLanguage />
    <Typography level="body-xs" textAlign="center">
      © UrbanSwisstionary {new Date().getFullYear()}
    </Typography>
  </Box>
)

export default Footer
