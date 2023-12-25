import Box from "@mui/joy/Box";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";

import { FC, FormEvent, useCallback } from "react";
import Button from "@/ui/Button";
import { useReCaptcha } from "next-recaptcha-v3";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
}
interface ResetPasswordFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const ResetPasswordForm: FC = () => {
  const { executeRecaptcha } = useReCaptcha();

  const onSubmit = useCallback(
    async (e: FormEvent<ResetPasswordFormElement>) => {
      e.preventDefault();

      const formElements = e.currentTarget.elements;

      const data = {
        email: formElements.email.value,
        recaptchaToken: await executeRecaptcha("reset_password"),
      };
      console.log("reset password", { data });
    },
    [executeRecaptcha]
  );
  return (
    <form onSubmit={onSubmit}>
      <FormControl required>
        <FormLabel>Email</FormLabel>
        <Input type="email" name="email" />
      </FormControl>
      <Box sx={{ mt: 2 }}>
        <Button type="submit">Reset Password</Button>
      </Box>
    </form>
  );
};

export default ResetPasswordForm;
