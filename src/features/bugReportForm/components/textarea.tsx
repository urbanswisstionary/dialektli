import type { FC, ReactNode } from "react"
import FormControl, { type FormControlProps } from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import JoyTextarea, {
  type TextareaProps as JoyTextareaProps,
} from "@mui/joy/Textarea"
import FormHelperText from "@mui/joy/FormHelperText"

interface TextareaProps extends FormControlProps {
  textareaProps?: JoyTextareaProps
  label?: ReactNode
  helperText?: ReactNode
}

const Textarea: FC<TextareaProps> = ({
  label,
  helperText,
  textareaProps: { minRows = 3, ...textareaProps } = {
    slotProps: { textarea: { maxLength: 500 } },
  },
  size = "sm",
  ...props
}) => {
  return (
    <FormControl size={size} {...props}>
      {label ? <FormLabel sx={{ display: "block" }}>{label}</FormLabel> : null}
      <JoyTextarea minRows={minRows} {...textareaProps} />
      {helperText ? (
        <FormHelperText sx={{ display: "block" }}>{helperText}</FormHelperText>
      ) : null}
    </FormControl>
  )
}

export default Textarea
