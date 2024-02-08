import Typography from "@mui/joy/Typography"
import Stack from "@mui/joy/Stack"
import GoogleIcon from "@/ui/icons/GoogleIcon"
import { signIn } from "next-auth/react"
import LayoutWithImage from "@/features/layout/layoutWithImage"
import type { NextPage } from "next"
import Button from "@/ui/Button"

const SigninPage: NextPage = () => {
  const onClick = () => {
    signIn("google", {
      callbackUrl: `${window?.location?.origin}`,
    })
  }

  return (
    <LayoutWithImage>
      <Stack gap={4}>
        <Typography level="h3" textAlign={"center"} textTransform={"uppercase"}>
          Sign in
        </Typography>
        <Button startDecorator={<GoogleIcon />} onClick={onClick}>
          Continue with Google
        </Button>
      </Stack>
    </LayoutWithImage>
  )
}
export default SigninPage
