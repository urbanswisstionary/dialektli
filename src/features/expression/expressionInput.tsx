import type { FC } from "react"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import DebouncedInput from "@/ui/debouncedInput"

const ExpressionInput: FC<
  Omit<FormControlProps, "value" | "onChange"> & {
    value?: string
    onChange: (_value: string) => void
    label?: string
  }
> = ({ value = "", onChange, label, ...formControlProps }) => (
  <FormControl {...formControlProps}>
    {label ? <FormLabel>{label}</FormLabel> : null}
    <DebouncedInput
      size="lg"
      value={value}
      onChange={(value) => onChange(value)}
      debounce={250}
      disableClearable
      slotProps={{ input: { autoComplete: "off", maxLength: 240 } }}
    />
  </FormControl>
)

export default ExpressionInput
