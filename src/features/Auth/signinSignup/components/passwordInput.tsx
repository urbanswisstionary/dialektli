import FormControl from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import Input from "@mui/joy/Input"

import { FC, useState, MouseEvent } from "react"
import { FormHelperText, IconButton } from "@mui/joy"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useTranslation } from "next-i18next"

const PasswordInput: FC<{
  required?: boolean
  name?: string
  error?: string
}> = ({ required, name = "password", error }) => {
  const { t } = useTranslation("common")
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) =>
    event.preventDefault()

  return (
    <FormControl required={required} error={!!error}>
      <FormLabel>{t("auth.passwordFieldLabel")}</FormLabel>
      <Input
        name={name}
        type={showPassword ? "text" : "password"}
        endDecorator={
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        }
        aria-errormessage={error}
      />
      {error ? (
        <FormHelperText id="password-error-message">{error}</FormHelperText>
      ) : null}
    </FormControl>
  )
}

export default PasswordInput
