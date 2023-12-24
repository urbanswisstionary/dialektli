import { FC } from "react";
import { useColorScheme } from "@mui/joy/styles";

import IconButton, { IconButtonProps } from "@mui/joy/IconButton";

import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";

import { useIsMounted } from "@/hooks/useIsMouted";

const ColorSchemeToggle: FC<IconButtonProps> = ({ onClick, ...props }) => {
  const { mode, setMode } = useColorScheme();
  const mounted = useIsMounted();
  if (!mounted)
    return <IconButton size="sm" variant="outlined" color="neutral" disabled />;

  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="neutral"
      aria-label="toggle light/dark mode"
      {...props}
      onClick={(event) => {
        if (mode === "light") setMode("dark");
        else setMode("light");

        onClick?.(event);
      }}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
};

export default ColorSchemeToggle;
