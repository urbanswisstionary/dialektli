import { FC } from "react"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import Textarea from "@mui/joy/Textarea"
import Typography from "@mui/joy/Typography"

const bioInputMaxLength = 220

const BioInput: FC<
  Omit<FormControlProps, "value" | "onChange"> & {
    value: string | null | undefined
    onChange: (_bio: string) => void
  }
> = ({ value, onChange, ...formControlProps }) => {
  const bio = value ?? ""
  const charsLeft = bioInputMaxLength - bio.length
  return (
    <FormControl {...formControlProps}>
      <Typography level="title-md">Bio</Typography>
      <Typography level="body-sm">
        Write a short introduction to be displayed on your profile
      </Typography>
      <Textarea
        size="sm"
        minRows={4}
        maxRows={6}
        sx={{ mt: 1.5 }}
        value={bio}
        slotProps={{ textarea: { maxLength: bioInputMaxLength } }}
        onChange={({ currentTarget }) => onChange(currentTarget.value)}
        endDecorator={
          <Typography level="body-xs" sx={{ ml: "auto", mr: 0.5 }}>
            {charsLeft} character
            {charsLeft === 1 ? "" : "s"} left
          </Typography>
        }
      />
    </FormControl>
  )
}

export default BioInput
