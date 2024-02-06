import { FC } from "react"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import Input from "@mui/joy/Input"
import EmailRoundedIcon from "@mui/icons-material/EmailRounded"

const EmailInput: FC<
  Omit<FormControlProps, "value" | "onChange"> & {
    value: string | null | undefined
    onChange: (_email: string) => void
  }
> = ({ value, onChange, ...formControlProps }) => (
  <FormControl {...formControlProps} id="email">
    <FormLabel>Email</FormLabel>
    <Input
      size="sm"
      type="email"
      endDecorator={<EmailRoundedIcon />}
      placeholder="email"
      value={value ?? ""}
      onChange={({ currentTarget }) => onChange(currentTarget.value)}
      autoComplete="on"
      name="email"
    />
  </FormControl>
)

export default EmailInput
