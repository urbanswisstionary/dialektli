import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import JoyInput, { InputProps } from "@mui/joy/Input"
import JoyTextarea, { TextareaProps } from "@mui/joy/Textarea"
import { FC, FormEvent, ReactNode, useCallback, useState } from "react"
import { Box, FormHelperText } from "@mui/joy"
import Button from "@/ui/Button"
import { useReCaptcha } from "next-recaptcha-v3"
import { useTranslation, Trans } from "next-i18next"
import JoyLink from "@mui/joy/Link"

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement
  reproductionSteps: HTMLTextAreaElement
  expectedBehavior: HTMLTextAreaElement
  desktopDescription: HTMLInputElement
  mobileDescription: HTMLInputElement
  browserDetails: HTMLInputElement
  additionalContext: HTMLTextAreaElement
}
interface BugReportFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

const BugReportForm: FC = () => {
  const { t } = useTranslation("common", { keyPrefix: "bugReport" })
  const { executeRecaptcha } = useReCaptcha()
  const [formState, setFormState] = useState<{
    submitted: boolean
    loading: boolean
    error: string | null
  }>({
    submitted: false,
    loading: false,
    error: null,
  })
  const onSubmit = useCallback(
    async (e: FormEvent<BugReportFormElement>) => {
      e.preventDefault()
      const formElements = e.currentTarget.elements
      const data = {
        email: formElements.email.value,
        reproductionSteps: formElements.reproductionSteps.value,
        expectedBehavior: formElements.expectedBehavior.value,
        desktopDescription: formElements.desktopDescription.value,
        mobileDescription: formElements.mobileDescription.value,
        browserDetails: formElements.browserDetails.value,
        additionalContext: formElements.additionalContext.value,
      }

      setFormState((prev) => ({ ...prev, loading: true }))
      try {
        try {
          const recaptchaToken = await executeRecaptcha("bug_report")
          const recaptchaRes = await fetch("/api/recaptcha", {
            method: "POST",
            body: recaptchaToken,
          })
          if (!recaptchaRes.ok) {
            const errorMessage = await recaptchaRes.text()
            throw new Error(errorMessage)
          }
        } catch (error: any) {
          setFormState((prev) => ({
            ...prev,
            error: error?.message ?? "Unknown Error occured",
          }))
          return
        }

        const res = await fetch("/api/send_mail", {
          method: "POST",
          body: JSON.stringify({
            subject: "Bug Report",
            html: `
            <div>
            <h1>Bug Report</h1>
            <br/>
            <p><b>From:</b>${data.email}</p>
            <br/>
            <p><b>Reproduction Steps:</b>${data.reproductionSteps}</p>
            <br/>
            <p><b>Expected Behavior:</b>${data.expectedBehavior}</p>
            <br/>
            <p><b>Desktop Description:</b>${data.desktopDescription}</p>
            <br/>
            <p><b>Mobile Description:</b>${data.mobileDescription}</p>
            <br/>
            <p><b>Browser Details:</b>${data.browserDetails}</p>
            <br/>
            <p><b>Additional Context:</b>${data.additionalContext}</p>
            </div>`,
          }),
        })
        if (!res.ok) throw new Error(await res.text())
        setFormState((prev) => ({ ...prev, submitted: true }))
      } catch (error: any) {
        setFormState((prev) => ({
          ...prev,
          error: error?.message ?? "Unknown Error occured",
        }))
      }
    },
    [executeRecaptcha],
  )
  if (formState.submitted) return <div>Thank you for your report</div>
  if (formState.error) return <>Error:{formState.error}</>
  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        label={t("email")}
        inputProps={{ type: "email", name: "email" }}
        id="email"
        disabled={formState.loading}
      />
      <TextArea
        required
        id="reproductionSteps"
        label={t("reproductionSteps.label")}
        helperText={t("reproductionSteps.helperText")}
        textAreaProps={{
          placeholder: t("reproductionSteps.placeholder"),
          name: "reproductionSteps",
        }}
        disabled={formState.loading}
      />

      <TextArea
        required
        id="expectedBehavior"
        label={t("expectedBehavior.label")}
        helperText={t("expectedBehavior.helperText")}
        disabled={formState.loading}
      />

      <Input
        label={t("desktopDescription.label")}
        helperText={t("desktopDescription.helperText")}
        inputProps={{ name: "desktopDescription" }}
        id="desktopDescription"
        disabled={formState.loading}
      />
      <Input
        label={t("mobileDescription.label")}
        helperText={t("mobileDescription.helperText")}
        inputProps={{ name: "mobileDescription" }}
        id="mobileDescription"
        disabled={formState.loading}
      />
      <Input
        label={t("browserDetails.label")}
        helperText={
          <Trans
            t={t}
            i18nKey="browserDetails.helperText"
            components={[
              <JoyLink
                href={t("browserDetails.whatismybrowserUrl")}
                target="_blank"
                rel="noopener noreferrer"
                key="link"
                fontSize={"inherit"}
              />,
              <b key="bold" />,
            ]}
          />
        }
        inputProps={{ name: "browserDetails" }}
        id="browserDetails"
        disabled={formState.loading}
      />
      <TextArea
        id="additionalContext"
        label={t("additionalContext.label")}
        helperText={t("additionalContext.helperText")}
        disabled={formState.loading}
      />

      <Box sx={{ mt: 2 }}>
        <Button type="submit" disabled={formState.loading}>
          {t("submit")}
        </Button>
      </Box>
    </form>
  )
}
export default BugReportForm

const Input: FC<
  FormControlProps & {
    inputProps?: InputProps
    label?: ReactNode
    helperText?: ReactNode
  }
> = ({ label, helperText, inputProps, size = "sm", ...props }) => {
  return (
    <FormControl size={size} {...props}>
      {label ? <FormLabel sx={{ display: "block" }}>{label}</FormLabel> : null}
      <JoyInput {...inputProps} />
      {helperText ? (
        <FormHelperText sx={{ display: "block" }}>{helperText}</FormHelperText>
      ) : null}
    </FormControl>
  )
}

const TextArea: FC<
  FormControlProps & {
    textAreaProps?: TextareaProps
    label?: ReactNode
    helperText?: ReactNode
  }
> = ({
  label,
  helperText,
  textAreaProps = { minRows: 3, slotProps: { textarea: { maxLength: 500 } } },
  size = "sm",
  ...props
}) => {
  return (
    <FormControl size={size} {...props}>
      {label ? <FormLabel sx={{ display: "block" }}>{label}</FormLabel> : null}
      <JoyTextarea {...textAreaProps} />
      {helperText ? (
        <FormHelperText sx={{ display: "block" }}>{helperText}</FormHelperText>
      ) : null}
    </FormControl>
  )
}
