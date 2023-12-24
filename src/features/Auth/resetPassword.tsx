import Box from "@mui/joy/Box";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";

import { FC, FormEvent } from "react";
import Button from "@/ui/Button";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
}
interface ResetPasswordFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const ResetPasswordForm: FC = () => {
  if (process.env.NODE_ENV !== "development") return null;
  return (
    <form
      onSubmit={(event: FormEvent<ResetPasswordFormElement>) => {
        event.preventDefault();
        const formElements = event.currentTarget.elements;
        const data = { email: formElements.email.value };
        console.log("reset password", { data });
      }}
    >
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
