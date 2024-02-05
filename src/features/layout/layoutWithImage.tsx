import Box from "@mui/joy/Box"
import Stack from "@mui/joy/Stack"
import type { FC, PropsWithChildren } from "react"
import image0_0 from "../../../public/assets/image0_0.jpg"
import image1_0 from "../../../public/assets/image1_0.jpg"
import Header from "./header"
import Footer from "./footer"

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
            mb: "auto",
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
          <Stack gap={4} sx={{ mb: 2 }}>
            {children}
          </Stack>
        </Box>
        <Footer />
      </Box>
    </Box>
    <BackgroundImage />
  </>
)

export default LayoutWithImage

const BackgroundImage: FC = () => (
  <Box
    sx={(theme) => ({
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
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${image0_0.src})`,
      [theme.getColorSchemeSelector("dark")]: {
        backgroundImage: `url(${image1_0.src})`,
      },
    })}
  />
)