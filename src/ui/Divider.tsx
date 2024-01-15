import MuiDivider from "@mui/joy/Divider"

import { FC, PropsWithChildren } from "react"

const Divider: FC<PropsWithChildren> = ({ children }) => (
  <MuiDivider>{children}</MuiDivider>
)

export default Divider
