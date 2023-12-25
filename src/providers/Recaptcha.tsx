import { ReCaptchaProvider as GoogleReCaptchaV3Provider } from "next-recaptcha-v3";

import { FC, PropsWithChildren } from "react";

const reCaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

const RecaptchaProvider: FC<PropsWithChildren> = ({ children }) => (
  <GoogleReCaptchaV3Provider
    reCaptchaKey={reCaptchaKey}
    async={false}
    defer={false}
    nonce={undefined}
  >
    {children}
  </GoogleReCaptchaV3Provider>
);

export default RecaptchaProvider;
