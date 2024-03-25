import { FC } from "react"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import Input from "@mui/joy/Input"
import EmailRoundedIcon from "@mui/icons-material/EmailRounded"

interface EmailInputProps extends Omit<FormControlProps, "value" | "onChange"> {
  value: string | null | undefined
  onChange: (_email: string) => void
}

const EmailInput: FC<EmailInputProps> = ({
  value,
  onChange,
  ...formControlProps
}) => (
  <FormControl {...formControlProps} id="email">
    {formControlProps.title ? (
      <FormLabel>{formControlProps.title}</FormLabel>
    ) : null}
    <Input
      size="sm"
      type="email"
      endDecorator={<EmailRoundedIcon />}
      value={value ?? ""}
      onChange={({ currentTarget }) => onChange(currentTarget.value)}
      autoComplete="on"
      name="email"
    />
  </FormControl>
)

export default EmailInput
