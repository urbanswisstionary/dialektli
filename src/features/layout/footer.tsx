import type { FC } from "react"
import Box from "@mui/joy/Box"
import Typography from "@mui/joy/Typography"
import SelectLanguage from "@/ui/Autocomplete/SelectLanguage"
import Grid from "@mui/joy/Grid"

const Footer: FC = () => (
  <Box
    component="footer"
    sx={{
      width: "100%",
      maxWidth: "1024px",
      margin: "0 auto",
      mt: "auto",
      py: 2,
    }}
  >
    <Grid container spacing={{ xs: 2, md: 3 }} sx={{ flexGrow: 1 }}>
      <Grid xs={12} sm={6} md={3}>
        <SelectLanguage />
      </Grid>
      <Grid xs={12}>
        <Typography level="body-xs" textAlign="center">
          © UrbanSwisstionary {new Date().getFullYear()}
        </Typography>
      </Grid>
    </Grid>
  </Box>
)

export default Footer
