"use client"

import type { FC, PropsWithChildren } from "react"
import Box from "@mui/material/Box"
import Navbar from "./Navbar"
import Footer from "./Footer"

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Box
        component="main"
        className="MainContent"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "var(--main-padding)",
          width: "100%",
          overflow: "auto",
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
  )
}

export default Layout
