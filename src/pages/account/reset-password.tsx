import JoiLink from "@mui/joy/Link";
import Link from "next/link";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";

import GoogleIcon from "@/ui/icons/GoogleIcon";
import { useSession, signIn } from "next-auth/react";
import AuthLayout from "@/features/Auth/layout";
import { NextPage } from "next";
import Divider from "@/ui/Divider";
import Button from "@/ui/Button";
import ResetPasswordForm from "@/features/Auth/resetPassword";

const SigninPage: NextPage = () => {
  const { data: session } = useSession();

  console.log(session);

  return (
    <AuthLayout>
      <Stack gap={1}>
        <Typography level="h3">Reset Password</Typography>
      </Stack>
      <Stack gap={4}>
        <ResetPasswordForm />
      </Stack>
    </AuthLayout>
  );
};

export default SigninPage;
