import JoiLink from "@mui/joy/Link"
import Link from "next/link"
import Typography from "@mui/joy/Typography"
import Stack from "@mui/joy/Stack"
import GoogleIcon from "@/ui/icons/GoogleIcon"
import { useSession, signIn, signOut } from "next-auth/react"
import SignupForm from "@/features/Auth/signup"
import LayoutWithImage from "@/features/layout/layoutWithImage"
import type { NextPage } from "next"
import Divider from "@/ui/Divider"
import Button from "@/ui/Button"
import RecaptchaProvider from "@/providers/Recaptcha"

const SignupPage: NextPage = () => {
  const { data: session } = useSession()
  // eslint-disable-next-line no-console
  console.log(session)

  return (
    <RecaptchaProvider>
      <LayoutWithImage>
        {session ? <button onClick={() => signOut()}>Sign out</button> : null}
        <Stack gap={1}>
          <Typography level="h3">Sign up</Typography>
          <Typography level="body-sm">
            already have an account?{" "}
            <JoiLink component={Link} href="/account/signin" level="title-sm">
              Sign in!
            </JoiLink>
          </Typography>
        </Stack>
        <Stack gap={4}>
          <SignupForm />
        </Stack>
        <Divider>or</Divider>
        <Button
          startDecorator={<GoogleIcon />}
          onClick={() => signIn("google")}
        >
          Continue with Google
        </Button>
      </LayoutWithImage>
    </RecaptchaProvider>
  )
}

export default SignupPage
