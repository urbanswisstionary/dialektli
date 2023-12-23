import JoiLink from "@mui/joy/Link";
import Link from "next/link";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";

import GoogleIcon from "@/ui/icons/GoogleIcon";
import { useSession, signIn } from "next-auth/react";
import SigninForm from "@/features/Auth/signin";
import AuthLayout from "@/features/Auth/layout";
import { NextPage } from "next";
import Divider from "@/ui/Divider";
import Button from "@/ui/Button";

const SigninPage: NextPage = () => {
  const { data: session } = useSession();

  console.log(session);

  return (
    <AuthLayout>
      <Stack gap={1}>
        <Typography level="h3">Sign in</Typography>
        <Typography level="body-sm">
          already have an account?{" "}
          <JoiLink component={Link} href="/account/signup" level="title-sm">
            Sign up!
          </JoiLink>
        </Typography>
      </Stack>
      <Stack gap={4}>
        <SigninForm />
      </Stack>
      <Divider>or</Divider>
      <Button startDecorator={<GoogleIcon />} onClick={() => signIn("google")}>
        Continue with Google
      </Button>
    </AuthLayout>
  );
};

export default SigninPage;
