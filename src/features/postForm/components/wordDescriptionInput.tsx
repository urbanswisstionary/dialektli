import type { FC } from "react"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import FormHelperText from "@mui/joy/FormHelperText"
import Textarea from "@mui/joy/Textarea"

const WordDescriptionInput: FC<
  Omit<FormControlProps, "value" | "onChange"> & {
    value: string
    onChange: (_value: string) => void
    label?: string
  }
> = ({ value, onChange, label, ...formControlProps }) => (
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
    <FormHelperText sx={{ display: "block" }}>
      <b>Write for a large audience.</b> Lots of people will read this, so give
      some background information.
    </FormHelperText>
  </FormControl>
)

export default WordDescriptionInput
