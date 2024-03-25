import { FC } from "react"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import Select from "@mui/joy/Select"
import Option from "@mui/joy/Option"
import BadgeIcon from "@mui/icons-material/Badge"
import { Role } from "@@/generated/graphql"

interface RoleInputProps extends Omit<FormControlProps, "value" | "onChange"> {
  role: Role
  onChange: (_role: Role) => void
}

const RoleInput: FC<RoleInputProps> = (role, onChange, ...formControlProps) => {
  return (
    <FormControl {...formControlProps}>
      <FormLabel>Role</FormLabel>
      <Select
        size="sm"
        endDecorator={<BadgeIcon />}
        value={role}
        onChange={(_e, role) => {
          if (role) onChange(role)
        }}
      >
        {Object.entries(Role).map(([key, value]) => (
          <Option key={key} value={value}>
            {key}
          </Option>
        ))}
      </Select>
    </FormControl>
  )
}
export default RoleInput
