import type { FC } from "react"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import Input from "@mui/joy/Input"

const WordInput: FC<
  Omit<FormControlProps, "value" | "onChange"> & {
    value: string
    onChange: (_value: string) => void
  }
> = ({ value, onChange, ...formControlProps }) => (
  <FormControl {...formControlProps}>
    <FormLabel>New Word</FormLabel>
    <Input
      size="lg"
      value={value}
      onChange={({ currentTarget: { value } }) => onChange(value)}
      slotProps={{ input: { autoComplete: "off", maxLength: 100 } }}
    />
  </FormControl>
)

export default WordInput
