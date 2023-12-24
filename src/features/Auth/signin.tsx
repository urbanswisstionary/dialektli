import Box from "@mui/joy/Box";
import Checkbox from "@mui/joy/Checkbox";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import JoiLink from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";

import { FC, FormEvent } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Button from "@/ui/Button";
import PasswordInput from "./passwordInput";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SigninFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const SigninForm: FC = () => {
  if (process.env.NODE_ENV !== "development") return null;
  return (
    <form
      onSubmit={(event: FormEvent<SigninFormElement>) => {
        event.preventDefault();
        const formElements = event.currentTarget.elements;
        const data = {
          email: formElements.email.value,
          password: formElements.password.value,
        };
        signIn("credentials", data);
      }}
    >
      <FormControl required>
        <FormLabel>Email</FormLabel>
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
          <Checkbox size="sm" label="Remember me" name="persistent" />
          <JoiLink
            component={Link}
            level="title-sm"
            href="/account/reset-password"
          >
            Forgot your password?
          </JoiLink>
        </Box>
        <Button type="submit">Sign in</Button>
      </Stack>
    </form>
  );
};

export default SigninForm;
