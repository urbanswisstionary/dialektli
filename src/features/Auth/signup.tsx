import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";

import { FC, useState, MouseEvent, FormEvent } from "react";
import { Box, FormHelperText, IconButton } from "@mui/joy";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Button from "@/ui/Button";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}
interface SignupFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const SigninForm: FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  if (process.env.NODE_ENV !== "development") return null;
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <form
      onSubmit={(event: FormEvent<SignupFormElement>) => {
        event.preventDefault();
        const formElements = event.currentTarget.elements;
        const data = {
          email: formElements.email.value,
          password: formElements.password.value,
        };
        console.log("signup", { data });
      }}
    >
      <FormControl required>
        <FormLabel>Email</FormLabel>
        <Input type="email" name="email" />
        <FormHelperText id="my-helper-text">
          We&apos;ll never share your email.
        </FormHelperText>
      </FormControl>
      <FormControl required>
        <FormLabel>Password</FormLabel>
        <Input
          name="password"
          type={showPassword ? "text" : "password"}
          endDecorator={
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          }
        />
      </FormControl>
      <Box sx={{ mt: 5 }}>
        <Button type="submit">Sign up</Button>
      </Box>
    </form>
  );
};

export default SigninForm;
