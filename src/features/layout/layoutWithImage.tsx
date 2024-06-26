import Box from "@mui/joy/Box"
import type { FC, PropsWithChildren } from "react"
import logo from "../../../public/assets/dialektli_logo.svg"
import Header from "./header"
import Typography from "@mui/joy/Typography"
import SelectLocale from "@/ui/Select/selectLocale"
import { companyName } from "@/config/constants"

const LayoutWithImage: FC<PropsWithChildren> = ({ children }) => (
  <>
    <Box
      sx={{
        width:
          "clamp(calc(100vw - var(--Cover-width)), calc(var(--Auth-forms-breakpoint) - 100vw), 100vw)",
        transition: "width var(--Transition-duration)",
        transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
        position: "relative",
        zIndex: 1,
        display: "flex",
        justifyContent: "flex-end",
        backdropFilter: "blur(12px)",
      }}
    >
      <Header hideSidebar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100dvh",
          width:
            "clamp(var(--Form-maxWidth), calc(var(--Auth-forms-breakpoint) + 10vw), 100%)",
          maxWidth: "100%",
          px: 2,
          margin: "0 auto",
        }}
      >
        <Box
          component="main"
          sx={{
            pt: 10,
            pb: 5,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: 400,
            maxWidth: "100%",
            mx: "auto",
            borderRadius: "sm",
            "& form": {
              display: "flex",
              flexDirection: "column",
              gap: 2,
            },
          }}
        >
          {children}
        </Box>
        <Box
          component="footer"
          pt={4}
          sx={{
            width: "100%",
            maxWidth: "1024px",
            margin: "0 auto",
            mt: "auto",
            pb: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <SelectLocale />
          <Typography level="body-xs" textAlign="center">
            © {companyName} {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>
    </Box>
    <BackgroundImage />
  </>
)

export default LayoutWithImage

const BackgroundImage: FC = () => (
  <Box
    sx={{
      height: "100%",
      position: "fixed",
      right: 0,
      top: 0,
      bottom: 0,
      left: "clamp(0px, 100vw, var(--Cover-width))",
      transition:
        "background-image var(--Transition-duration), left var(--Transition-duration) !important",
      transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
      backgroundColor: "background.level1",
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${logo.src})`,
    }}
  />
)
