import type { FC, ReactNode } from "react"
import FormControl, { type FormControlProps } from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import JoyTextarea, {
  type TextareaProps as JoyTextareaProps,
} from "@mui/joy/Textarea"

interface TextareaProps extends FormControlProps {
  textareaProps?: JoyTextareaProps
  label?: ReactNode
}

const Textarea: FC<TextareaProps> = ({
  label,
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
    </FormControl>
  )
}

export default Textarea
