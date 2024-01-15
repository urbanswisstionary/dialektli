import Typography from "@mui/joy/Typography"
import Stack from "@mui/joy/Stack"

import AuthLayout from "@/features/Auth/layout"
import { NextPage } from "next"

import ResetPasswordForm from "@/features/Auth/resetPassword"
import RecaptchaProvider from "@/providers/Recaptcha"

const SigninPage: NextPage = () => {
  return (
    <RecaptchaProvider>
      <AuthLayout>
        <Stack gap={1}>
          <Typography level="h3">Reset Password</Typography>
        </Stack>
        <Stack gap={4}>
          <ResetPasswordForm />
        </Stack>
      </AuthLayout>
    </RecaptchaProvider>
  )
}

export default SigninPage
