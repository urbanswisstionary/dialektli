import MuiDivider from "@mui/joy/Divider";

import { FC, PropsWithChildren } from "react";

const Divider: FC<PropsWithChildren> = ({ children }) => (
  <MuiDivider
    sx={(theme) => ({
      [theme.getColorSchemeSelector("light")]: {
        color: { xs: "#FFF", md: "text.tertiary" },
        "--Divider-lineColor": {
          xs: "#FFF",
          md: "var(--joy-palette-divider)",
        },
      },
    })}
  >
    {children}
  </MuiDivider>
);

export default Divider;
