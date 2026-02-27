"use client"

/* eslint-disable @next/next/no-img-element */
import type { FC } from "react"

import { companyName } from "@/config/constants"
import { cn } from "@/lib/utils"

type LogoProps = {
  size?: "small" | "medium" | "large"
}

const Logo: FC<LogoProps> = ({ size = "large" }) => {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-10 h-10",
    large: "w-12 h-12",
  }

  return (
    <img
      src="/assets/dialektli_logo.svg"
      alt={`${companyName} logo`}
      title={companyName}
      className={cn("pt-0.5", sizeClasses[size])}
    />
  )
}

export default Logo
