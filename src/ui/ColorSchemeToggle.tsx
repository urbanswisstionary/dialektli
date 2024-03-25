import type { FC } from "react"
import { useColorScheme } from "@mui/joy/styles"
import IconButton, { IconButtonProps } from "@mui/joy/IconButton"
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded"
import LightModeIcon from "@mui/icons-material/LightMode"
import { useIsMounted } from "@/hooks/useIsMouted"
import { useTranslation } from "next-i18next"

const ColorSchemeToggle: FC<IconButtonProps> = ({
  onClick,
  size = "sm",
  variant = "outlined",
  color = "neutral",
  ...props
}) => {
  const { t } = useTranslation("common")
  const { mode, setMode } = useColorScheme()
  const mounted = useIsMounted()

  if (!mounted)
    return (
      <IconButton
        size={size}
        variant={variant}
        color={color}
        {...props}
        disabled
        title={t("actions.toggleColorScheme")}
      />
    )

  return (
    <IconButton
      id="toggle-mode"
      size={size}
      variant={variant}
      color={color}
      title={t("actions.toggleColorScheme")}
      onClick={(event) => {
        setMode(mode === "light" ? "dark" : "light")
        if (onClick) onClick(event)
      }}
      {...props}
    >
      <DarkModeRoundedIcon
        sx={{ display: mode === "dark" ? "none" : "initial" }}
      />
      <LightModeIcon sx={{ display: mode === "light" ? "none" : "initial" }} />
    </IconButton>
  )
}

export default ColorSchemeToggle
