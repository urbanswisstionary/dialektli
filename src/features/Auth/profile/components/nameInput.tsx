import { FC } from "react"

import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import Input from "@mui/joy/Input"

const NameInput: FC<
  Omit<FormControlProps, "value" | "onChange"> & {
    value: string | null | undefined
    onChange: (_name: string) => void
  }
> = ({ value, onChange, sx, ...formControlProps }) => {
  return (
    <FormControl
      {...formControlProps}
      sx={[
        { display: { sm: "flex-column", md: "flex-row" } },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      id="name"
    >
      <FormLabel>Name</FormLabel>
      <Input
        size="sm"
        placeholder="Name"
        value={value ?? ""}
        onChange={({ currentTarget }) => onChange(currentTarget.value)}
        autoComplete="on"
        name="name"
      />
    </FormControl>
  )
}

export default NameInput
