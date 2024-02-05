import Typography from "@mui/joy/Typography"
import Stack from "@mui/joy/Stack"
import GoogleIcon from "@/ui/icons/GoogleIcon"
import { signIn } from "next-auth/react"
import LayoutWithImage from "@/features/layout/layoutWithImage"
import type { NextPage } from "next"
import Button from "@/ui/Button"
import RecaptchaProvider from "@/providers/Recaptcha"
import { useCallback, useState } from "react"
import { ReCaptcha } from "next-recaptcha-v3"
import { useRouter } from "next/router"

const SigninPage: NextPage = () => {
  const router = useRouter()
  const [token, setToken] = useState("")
  const [disableButton, setDisableButton] = useState(false)

  const onClick = useCallback(async () => {
    const res = await fetch("/api/recaptcha", { method: "POST", body: token })
    if (!res.ok) router.reload()
    else {
      setDisableButton(true)
      signIn("google", {
        redirect: true,
        callbackUrl: "/",
      })
    }
  }, [router, token])

  return (
    <RecaptchaProvider>
      <LayoutWithImage>
        <ReCaptcha onValidate={setToken} action="sign_in" />
        <Stack gap={4}>
          <Typography
            level="h3"
            textAlign={"center"}
            textTransform={"uppercase"}
          >
            Sign in
          </Typography>
          <Button
            startDecorator={<GoogleIcon />}
            onClick={onClick}
            disabled={disableButton}
          >
            Continue with Google
          </Button>
        </Stack>
      </LayoutWithImage>
    </RecaptchaProvider>
  )
}
export default SigninPage
