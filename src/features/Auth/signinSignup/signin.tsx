import Box from "@mui/joy/Box"
import FormControl from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import JoiLink from "@mui/joy/Link"
import Input from "@mui/joy/Input"
import Stack from "@mui/joy/Stack"

import { FC, FormEvent, useCallback } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import Button from "@mui/joy/Button"
import PasswordInput from "./components/passwordInput"
import { useReCaptcha } from "next-recaptcha-v3"
import { useTranslation } from "next-i18next"

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement
  password: HTMLInputElement
}
interface SigninFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

const SigninForm: FC = () => {
  const { t } = useTranslation("common", { keyPrefix: "auth.signinPage" })
  const { executeRecaptcha } = useReCaptcha()

  const onSubmit = useCallback(
    async (e: FormEvent<SigninFormElement>) => {
      e.preventDefault()

      const formElements = e.currentTarget.elements
      const data = {
        email: formElements.email.value,
        password: formElements.password.value,
        recaptchaToken: await executeRecaptcha("sign_in"),
      }
      signIn("credentials", data)
    },
    [executeRecaptcha],
  )
  return (
    <form onSubmit={onSubmit}>
      <FormControl required>
        <FormLabel>{t("email")}</FormLabel>
        <Input type="email" name="email" />
      </FormControl>
      <PasswordInput required />
      <Stack gap={4} sx={{ mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <JoiLink
            component={Link}
            level="title-sm"
            href="/account/reset-password"
          >
            {t("forgotPassword")}
          </JoiLink>
        </Box>
        <Button variant="soft" color="neutral" fullWidth type="submit">
          {t("title")}
        </Button>
      </Stack>
    </form>
  )
}

export default SigninForm
