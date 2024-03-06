import type { FC, ReactNode } from "react"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import JoyCheckbox from "@mui/joy/Checkbox"

const Checkbox: FC<
  Omit<FormControlProps, "value" | "onChange"> & {
    checked: boolean
    onChange: (_checked: boolean) => void
    label?: ReactNode
  }
> = ({ checked, onChange, label, ...formControlProps }) => (
  <FormControl {...formControlProps}>
    <JoyCheckbox
      checked={checked}
      onChange={({ currentTarget: { checked } }) => onChange(checked)}
      label={label}
    />
  </FormControl>
)

export default Checkbox
