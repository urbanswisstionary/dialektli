import type { FC, ReactNode } from "react"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import JoyInput, { type InputProps as JoyInputProps } from "@mui/joy/Input"
import FormHelperText from "@mui/joy/FormHelperText"

interface InputProps extends FormControlProps {
  inputProps?: JoyInputProps
  label?: ReactNode
  helperText?: ReactNode
}

const Input: FC<InputProps> = ({
  label,
  helperText,
  inputProps,
  size = "sm",
  ...props
}) => (
  <FormControl size={size} {...props}>
    {label ? <FormLabel sx={{ display: "block" }}>{label}</FormLabel> : null}
    <JoyInput {...inputProps} />
    {helperText ? (
      <FormHelperText sx={{ display: "block" }}>{helperText}</FormHelperText>
    ) : null}
  </FormControl>
)
export default Input
