"use client"

import type { FC, PropsWithChildren } from "react"
import Box from "@mui/material/Box"
import Sidebar from "./Sidebar"
import Header from "./Header"
import Footer from "./Footer"

const Layout: FC<PropsWithChildren<{ hideSidebar?: boolean }>> = ({
  children,
  hideSidebar,
}) => {
  return (
    <>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        {hideSidebar ? null : <Sidebar />}
        <Header hideSidebar={hideSidebar} />
        <Box
          component="main"
          className="MainContent"
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: "350px",
            padding: "var(--main-padding)",
            width: "100%",
            minHeight: hideSidebar
              ? `calc(100vh - var(--Header-height))`
              : { xs: `calc(100vh - var(--Header-height))`, md: "100vh" },
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
              flex: 1,
              display: "flex",
              flexDirection: "column",
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
