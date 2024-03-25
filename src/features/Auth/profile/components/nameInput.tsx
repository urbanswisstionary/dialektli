import { FC, ReactNode } from "react"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import FormHelperText from "@mui/joy/FormHelperText"
import DebouncedInput from "@/ui/debouncedInput"

interface NameInputProps extends Omit<FormControlProps, "value" | "onChange"> {
  value: string | null | undefined
  onChange: (_name: string) => void
  helperText?: ReactNode
}

const NameInput: FC<NameInputProps> = ({
  value,
  onChange,
  helperText,
  size = "sm",
  ...formControlProps
}) => (
  <FormControl {...formControlProps} size={size}>
    {formControlProps.title ? (
      <FormLabel>{formControlProps.title}</FormLabel>
    ) : null}
    <DebouncedInput
      value={value ?? ""}
      onChange={(value) => onChange(value)}
      autoComplete="on"
      name="name"
      disableClearable
    />
    {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
  </FormControl>
)

export default NameInput
