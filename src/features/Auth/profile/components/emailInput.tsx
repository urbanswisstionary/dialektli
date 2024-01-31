import { FC } from "react"
import FormControl from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import Input from "@mui/joy/Input"
import EmailRoundedIcon from "@mui/icons-material/EmailRounded"

const EmailInput: FC<{
  email: string
  // eslint-disable-next-line no-unused-vars
  onChange: (email: string) => void
}> = ({ email, onChange }) => (
  <FormControl>
    <FormLabel>Email</FormLabel>
    <Input
      size="sm"
      type="email"
      endDecorator={<EmailRoundedIcon />}
      placeholder="email"
      value={email ?? ""}
      onChange={({ currentTarget }) => onChange(currentTarget.value ?? "")}
      disabled
    />
  </FormControl>
)

export default EmailInput
