import { FC } from "react"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import Textarea from "@mui/joy/Textarea"
import Typography from "@mui/joy/Typography"
import FormHelperText from "@mui/joy/FormHelperText"
import { useTranslation } from "next-i18next"

const bioInputMaxLength = 220

interface BioInputProps extends Omit<FormControlProps, "value" | "onChange"> {
  value: string | null | undefined
  onChange: (_bio: string) => void
  helperText?: string
}

const BioInput: FC<BioInputProps> = ({
  value,
  onChange,
  helperText,
  ...formControlProps
}) => {
  const { t } = useTranslation("common", { keyPrefix: "auth.profile" })
  const bio = value ?? ""
  const charsLeft = bioInputMaxLength - bio.length
  return (
    <FormControl {...formControlProps}>
      {formControlProps.title ? (
        <Typography level="title-md">{formControlProps.title}</Typography>
      ) : null}
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
            {charsLeft} {t(charsLeft === 1 ? "bioCharsLeft" : "bioCharsLeft")}
          </Typography>
        }
      />
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  )
}

export default BioInput
