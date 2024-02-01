import Typography from "@mui/joy/Typography"
import Stack from "@mui/joy/Stack"
import LayoutWithImage from "@/features/layout/layoutWithImage"
import type { NextPage } from "next"
import ResetPasswordForm from "@/features/Auth/resetPassword"
import RecaptchaProvider from "@/providers/Recaptcha"

const SigninPage: NextPage = () => {
  return (
    <RecaptchaProvider>
      <LayoutWithImage>
        <Stack gap={1}>
          <Typography level="h3">Reset Password</Typography>
        </Stack>
        <Stack gap={4}>
          <ResetPasswordForm />
        </Stack>
      </LayoutWithImage>
    </RecaptchaProvider>
  )
}

export default SigninPage
