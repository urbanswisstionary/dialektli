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
      <Box sx={{ display: "flex", overflow: "hidden" }}>
        {hideSidebar ? null : <Sidebar />}
        <Header />
        <Box
          component="main"
          className="MainContent"
          sx={{
            pb: { xs: 8, md: 0 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: "380px",
            minHeight: "100dvh",
            gap: 1,
            overflow: "auto",
            position: "relative",
            top: hideSidebar
              ? "calc(0.25rem + var(--Header-height))"
              : { xs: "calc(0.25rem + var(--Header-height))", md: 0 },
          }}
        >
          {children}
          <Footer />
        </Box>
      </Box>
    </>
  )
}

export default Layout
