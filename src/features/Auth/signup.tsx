import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";

import { FC, FormEvent, useCallback, useState } from "react";
import { Box, FormHelperText } from "@mui/joy";
import Button from "@/ui/Button";
import PasswordInput from "./passwordInput";
import { signIn } from "next-auth/react";
import { useReCaptcha } from "next-recaptcha-v3";

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  passwordRepeat: HTMLInputElement;
}
interface SignupFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const SigninForm: FC = () => {
  const { executeRecaptcha } = useReCaptcha();
  const [passwordError, setPasswordError] = useState<string | undefined>();

  const onSubmit = useCallback(
    async (e: FormEvent<SignupFormElement>) => {
      e.preventDefault();

      const formElements = e.currentTarget.elements;
      if (formElements.password.value !== formElements.passwordRepeat.value) {
        setPasswordError("Passwords do not match");
      } else {
        const data = {
          name: formElements.name.value,
          email: formElements.email.value,
          password: formElements.password.value,
          recaptchaToken: await executeRecaptcha("sign_up"),
        };
        signIn("credentials", data);
      }
    },
    [executeRecaptcha]
  );
  return (
    <form onSubmit={onSubmit}>
      <FormControl required>
        <FormLabel>Name</FormLabel>
        <Input name="name" />
      </FormControl>
      <FormControl required>
        <FormLabel>Email</FormLabel>
        <Input type="email" name="email" />
      </FormControl>

      <PasswordInput required error={passwordError} />
      <PasswordInput required name="passwordRepeat" error={passwordError} />

      <FormHelperText id="email-helper-text">
        We&apos;ll never share your information.
      </FormHelperText>

      <Box sx={{ mt: 2 }}>
        <Button type="submit">Sign up</Button>
      </Box>
    </form>
  );
};
export default SigninForm;
