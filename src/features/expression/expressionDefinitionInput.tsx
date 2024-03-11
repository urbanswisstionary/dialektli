import type { FC, ReactNode } from "react"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import FormHelperText from "@mui/joy/FormHelperText"
import DebouncedTextarea from "@/ui/debouncedTextarea"

const ExpressionDefinitionInput: FC<
  Omit<FormControlProps, "value" | "onChange"> & {
    value: string
    onChange: (_value: string) => void
    label?: string
    helperText?: ReactNode
  }
> = ({ value, onChange, label, helperText, ...formControlProps }) => (
  <FormControl {...formControlProps}>
    {label ? <FormLabel>{label}</FormLabel> : null}
    <DebouncedTextarea
      size="lg"
      value={value}
      onChange={(value) => onChange(value)}
      debounce={250}
      slotProps={{ textarea: { maxLength: 500 } }}
    />
    {helperText ? (
      <FormHelperText sx={{ display: "block" }}>{helperText}</FormHelperText>
    ) : null}
  </FormControl>
)

export default ExpressionDefinitionInput
