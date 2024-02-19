import type { FC, PropsWithChildren } from "react"
import Box from "@mui/joy/Box"
import Sidebar from "./sidebar"
import Header from "./header"
import Footer from "./footer"

const Layout: FC<PropsWithChildren<{ hideSidebar?: boolean }>> = ({
  children,
  hideSidebar,
}) => {
  return (
    <>
      <Box sx={{ display: "flex", height: "100vh" }}>
        {hideSidebar ? null : <Sidebar />}
        <Header hideSidebar={hideSidebar} />
        <Box
          component="main"
          className="MainContent"
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: "380px",
            padding: "var(--main-padding)",
            width: "100%",
            height: hideSidebar
              ? `calc(100% - var(--Header-height))`
              : { xs: `calc(100% - var(--Header-height))`, md: "100%" },
            overflow: "auto",
            marginTop: hideSidebar
              ? "var(--Header-height)"
              : { xs: "var(--Header-height)", md: 0 },
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "1024px",
              margin: "0 auto",
              pb: 2,
            }}
          >
            {children}
          </Box>

          <Footer />
        </Box>
      </Box>
    </>
  )
}

export default Layout
