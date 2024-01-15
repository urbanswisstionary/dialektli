import Typography from "@mui/joy/Typography"
import Stack from "@mui/joy/Stack"

import GoogleIcon from "@/ui/icons/GoogleIcon"
import { signIn } from "next-auth/react"

import AuthLayout from "@/features/Auth/layout"
import { NextPage } from "next"

import Button from "@/ui/Button"
import RecaptchaProvider from "@/providers/Recaptcha"

const SigninPage: NextPage = () => (
  <RecaptchaProvider>
    <AuthLayout>
      <Stack gap={4}>
        <Typography level="h3" textAlign={"center"} textTransform={"uppercase"}>
          Sign in
        </Typography>
        <Button
          startDecorator={<GoogleIcon />}
          onClick={() =>
            signIn("google", {
              redirect: true,
              callbackUrl: "/account/profile",
            })
          }
        >
          Continue with Google
        </Button>
      </Stack>
    </AuthLayout>
  </RecaptchaProvider>
)

export default SigninPage
