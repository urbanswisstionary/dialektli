import type { FC } from "react"
import Avatar from "@mui/joy/Avatar"
import { companyName } from "@/config/constants"

type LogoProps = {
  size?: "sm" | "md" | "lg"
}

const Logo: FC<LogoProps> = ({ size = "lg" }) => (
  <Avatar
    src="/assets/dialektli_logo.svg"
    alt={companyName}
    size={size}
    sx={{ background: "transparent", pt: 0.5 }}
    title={companyName}
  />
)

export default Logo
