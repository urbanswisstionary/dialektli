"use client"

import type { FC } from "react"
import IconButton, { IconButtonProps } from "@mui/material/IconButton"
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded"
import LightModeIcon from "@mui/icons-material/LightMode"
import { useIsMounted } from "@/hooks/useIsMounted"
import { useTranslations } from "next-intl"
import { useColorScheme } from "@/components/providers/ThemeProvider"

const ColorSchemeToggle: FC<Omit<IconButtonProps, "onClick">> = ({
  size = "small",
  color = "inherit",
  ...props
}) => {
  const t = useTranslations()
  const { mode, setMode } = useColorScheme()
  const mounted = useIsMounted()

  if (!mounted) {
    return (
      <IconButton
        size={size}
        color={color}
        {...props}
        disabled
        title={t("actions.toggleColorScheme")}
        aria-label={t("actions.toggleColorScheme")}
      >
        <LightModeIcon />
      </IconButton>
    )
  }

  const resolvedMode =
    mode === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : mode

  return (
    <IconButton
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      color="inherit"
      size="small"
      title={t("actions.toggleColorScheme")}
      aria-label={t("actions.toggleColorScheme")}
      {...props}
    >
      {resolvedMode === "dark" ? <LightModeIcon /> : <DarkModeRoundedIcon />}
    </IconButton>
  )
}

export default ColorSchemeToggle
