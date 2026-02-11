"use client"

import type { FC } from "react"
import Avatar from "@mui/material/Avatar"
import { companyName } from "@/config/constants"

type LogoProps = {
  size?: "small" | "medium" | "large"
}

const Logo: FC<LogoProps> = ({ size = "large" }) => {
  const sizeMap = {
    small: 32,
    medium: 40,
    large: 48,
  }

  return (
    <Avatar
      src="/assets/dialektli_logo.svg"
      alt={companyName}
      sx={{
        width: sizeMap[size],
        height: sizeMap[size],
        background: "transparent",
        pt: 0.5,
      }}
      title={companyName}
    />
  )
}

export default Logo
