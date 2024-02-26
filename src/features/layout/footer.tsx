import type { FC } from "react"
import Box from "@mui/joy/Box"
import Typography from "@mui/joy/Typography"
import SelectLanguage from "@/ui/Autocomplete/SelectLanguage"
import Grid, { GridProps } from "@mui/joy/Grid"
import NextLink from "next/link"
import JoyLink, { LinkProps } from "@mui/joy/Link"

const Footer: FC = () => (
  <Box
    component="footer"
    sx={{
      width: "100%",
      maxWidth: "1024px",
      margin: "0 auto",
      mt: "auto",
      pt: 10,
    }}
  >
    <Grid container spacing={{ xs: 2, md: 3 }} sx={{ flexGrow: 1 }}>
      <GridItem>
        <Link href="/tos">Terms of Service</Link>
      </GridItem>
      <GridItem>
        <Link href="/privacy-policy">Privacy Policy</Link>
      </GridItem>
      <GridItem>
        <Link href="/dmca">DMCA</Link>
      </GridItem>
      <GridItem>
        <Link
          href={`mailto:urbanswisstionary@gmail.com?subject=Bug Report&body=${bugReportTemplate}`}
        >
          Bug Report
        </Link>
      </GridItem>
      <Grid xs={12} sm={3} md={3}>
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

const GridItem: FC<GridProps> = (props) => (
  <Grid
    xs={12}
    sm={3}
    md={3}
    sx={{
      justifyContent: "center",
      display: "flex",
    }}
    {...props}
  />
)

const Link: FC<LinkProps> = ({ sx, ...props }) => (
  <JoyLink
    component={NextLink}
    color="neutral"
    sx={[
      {
        transition: "font-weight 0.1s ease",
        ":hover": { textDecoration: "none", fontWeight: "bolder" },
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
    {...props}
  />
)
const bugReportTemplate = `
Bug Report Form
%0DIf you encounter a bug in Urban Dictionary, let us know!
%0D
%0D**Describe the bug**
%0DA clear and concise description of what the bug is.
%0D
%0D**What are the steps we can take to reproduce the bug**
%0DSteps to reproduce the behavior:
%0D1. Go to '...'
%0D2. Click on '....'
%0D3. Scroll down to '....'
%0D4. See error
%0D
%0D**Expected behavior**
%0DA clear and concise description of what you expected to happen.
%0D
%0D**Screenshots**
%0DIf applicable, add screenshots to help explain your problem.
%0D
%0D**Browser details**
%0DIn a new window, go to [whatismybrowser](www.whatismybrowser.com).
%0DClick "Copy URL to Clipboard" and paste that URL below.
%0D
%0D**Desktop (please complete the following information):**
%0D - OS: [e.g. iOS]
%0D - Browser [e.g. chrome, safari]
%0D - Version [e.g. 22]
%0D
%0D**Smartphone (please complete the following information):**
%0D - Device: [e.g. iPhone6]
%0D - OS: [e.g. iOS8.1]
%0D - Browser [e.g. stock browser, safari]
%0D - Version [e.g. 22]
%0D
%0D**Additional context**
%0DAdd any other context about the problem here.`
