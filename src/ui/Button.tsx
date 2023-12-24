import { FC } from "react";
import JoiButton, { ButtonProps as JoiButtonProps } from "@mui/joy/Button";

const Button: FC<JoiButtonProps> = ({
  variant = "soft",
  color = "neutral",
  fullWidth = true,
  ...props
}) => (
  <JoiButton variant={variant} color={color} fullWidth={fullWidth} {...props} />
);

export default Button;
