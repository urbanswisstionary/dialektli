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
      <Box
        sx={{
          maxWidth: "100vw",
          maxHeight: "100vh",
          display: "flex",
          overflowY: "hidden",
          overflowX: "auto",
        }}
      >
        {hideSidebar ? null : <Sidebar />}
        <Header hideSidebar={hideSidebar} />
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
            padding: "var(--main-padding)",
            margin: "0 auto",
            maxWidth: "1024px",
            width: "100%",
            gap: 1,
            overflow: "auto",
            position: "relative",
            top: hideSidebar
              ? "var(--Header-height)"
              : { xs: "var(--Header-height)", md: 0 },
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
