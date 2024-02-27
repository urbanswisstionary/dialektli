import { ReCaptchaProvider as GoogleReCaptchaV3Provider } from "next-recaptcha-v3"
import { FC, PropsWithChildren, useEffect } from "react"

const reCaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""
const RecaptchaProvider: FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    // the recaptcha badge persists in the DOM even after the user has left the page
    // we set the badge to show only in pages the provider is used
    // and remove it when the provider is unmounted
    document.documentElement.style.setProperty(
      "--recaptcha-badge-display",
      "block",
    )

    return () => {
      document.documentElement.style.setProperty(
        "--recaptcha-badge-display",
        "none",
      )
    }
  }, [])
  return (
    <GoogleReCaptchaV3Provider
      reCaptchaKey={reCaptchaKey}
      async
      defer
      useRecaptchaNet
      useEnterprise
    >
      {children}
    </GoogleReCaptchaV3Provider>
  )
}

export default RecaptchaProvider
