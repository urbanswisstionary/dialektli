import { FC } from "react"

import FormControl from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import Input from "@mui/joy/Input"

const NameInput: FC<{
  name?: string | null
  // eslint-disable-next-line no-unused-vars
  onChange: (name: string) => void
}> = ({ name, onChange }) => {
  return (
    <FormControl
      sx={{
        display: { sm: "flex-column", md: "flex-row" },
      }}
    >
      <FormLabel>Name</FormLabel>
      <Input
        size="sm"
        placeholder="Name"
        value={name ?? ""}
        onChange={({ currentTarget }) => onChange(currentTarget.value ?? "")}
      />
    </FormControl>
  )
}

export default NameInput
