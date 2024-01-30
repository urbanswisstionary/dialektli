import type { FC, PropsWithChildren } from "react";
import Box from "@mui/joy/Box";
import Sidebar from "./sidebar";
import Header from "./header";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Sidebar />
        <Header />
        <Box
          component="main"
          className="MainContent"
          sx={{
            pt: { xs: "calc(4px + var(--Header-height))", md: 1 },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            height: "100dvh",
            gap: 1,
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;
