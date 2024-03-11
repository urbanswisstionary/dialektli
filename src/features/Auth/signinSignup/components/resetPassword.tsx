import Box from "@mui/joy/Box"
import FormControl from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import Input from "@mui/joy/Input"

import { FC, FormEvent, useCallback } from "react"
import Button from "@mui/joy/Button"
import { useReCaptcha } from "next-recaptcha-v3"
import { useTranslation } from "next-i18next"

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement
}
interface ResetPasswordFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

const ResetPasswordForm: FC = () => {
  const { t } = useTranslation("common", {
    keyPrefix: "auth.resetPasswordPage",
  })
  const { executeRecaptcha } = useReCaptcha()

  const onSubmit = useCallback(
    async (e: FormEvent<ResetPasswordFormElement>) => {
      e.preventDefault()

      const formElements = e.currentTarget.elements

      const data = {
        email: formElements.email.value,
        recaptchaToken: await executeRecaptcha("reset_password"),
      }
      // eslint-disable-next-line no-console
      console.info("reset password", { data })
    },
    [executeRecaptcha],
  )
  return (
    <form onSubmit={onSubmit}>
      <FormControl required>
        <FormLabel>{t("email")}</FormLabel>
        <Input type="email" name="email" />
      </FormControl>
      <Box sx={{ mt: 2 }}>
        <Button type="submit">{t("resetPassword")}</Button>
      </Box>
    </form>
  )
}

export default ResetPasswordForm
