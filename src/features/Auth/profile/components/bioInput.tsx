import { FC } from "react"
import Box from "@mui/joy/Box"
import FormHelperText from "@mui/joy/FormHelperText"
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
      <Box>
        <Typography level="title-md">Bio</Typography>
        <Typography level="body-sm">
          Write a short introduction to be displayed on your profile
        </Typography>
      </Box>
      <Textarea
        size="sm"
        minRows={4}
        sx={{ mt: 1.5 }}
        value={bio}
        slotProps={{ textarea: { maxLength: bioInputMaxLength } }}
        onChange={({ currentTarget }) => onChange(currentTarget.value)}
      />
      <FormHelperText sx={{ mt: 0.75, fontSize: "xs" }}>
        {charsLeft} character
        {charsLeft === 1 ? "" : "s"} left
      </FormHelperText>
    </FormControl>
  )
}

export default BioInput
