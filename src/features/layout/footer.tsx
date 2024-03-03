import type { FC } from "react"
import Box from "@mui/joy/Box"
import Typography from "@mui/joy/Typography"
import SelectLocale from "@/ui/Select/selectLocale"
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
        <Link href="/bug-report">Bug Report</Link>
      </GridItem>
      <Grid xs={12} sm={3} md={3}>
        <SelectLocale />
      </Grid>
      <Grid xs={12}>
        <Typography level="body-xs" textAlign="center">
          © Dialektli {new Date().getFullYear()}
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
