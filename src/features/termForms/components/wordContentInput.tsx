import type { FC, ReactNode } from "react"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import FormHelperText from "@mui/joy/FormHelperText"
import Textarea from "@mui/joy/Textarea"

const WordContentInput: FC<
  Omit<FormControlProps, "value" | "onChange"> & {
    value: string
    onChange: (_value: string) => void
    label?: string
    helperText?: ReactNode
  }
> = ({ value, onChange, label, helperText, ...formControlProps }) => (
  <FormControl {...formControlProps}>
    {label ? <FormLabel>{label}</FormLabel> : null}
    <Textarea
      size="lg"
      minRows={4}
      maxRows={6}
      value={value}
      onChange={({ currentTarget: { value } }) => onChange(value)}
      slotProps={{ textarea: { maxLength: 500 } }}
    />
    {helperText ? (
      <FormHelperText sx={{ display: "block" }}>{helperText}</FormHelperText>
    ) : null}
  </FormControl>
)

export default WordContentInput
