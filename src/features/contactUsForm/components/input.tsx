import type { FC, ReactNode } from "react"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import JoyInput, { type InputProps as JoyInputProps } from "@mui/joy/Input"

interface InputProps extends FormControlProps {
  inputProps?: JoyInputProps
  label?: ReactNode
}

const Input: FC<InputProps> = ({
  label,
  inputProps,
  size = "sm",
  ...props
}) => (
  <FormControl size={size} {...props}>
    {label ? <FormLabel sx={{ display: "block" }}>{label}</FormLabel> : null}
    <JoyInput {...inputProps} />
  </FormControl>
)
export default Input
