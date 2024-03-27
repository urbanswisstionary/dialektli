import { FC, FormEvent, useCallback, useState } from "react"
import Input from "./components/input"
import Textarea from "./components/textarea"
import ImageUploadInput from "./components/imageUploadInput"
import FormLabel from "@mui/joy/FormLabel"
import { Box, FormHelperText } from "@mui/joy"
import Button from "@mui/joy/Button"
import { useReCaptcha } from "next-recaptcha-v3"
import { useTranslation, Trans } from "next-i18next"
import JoyLink from "@mui/joy/Link"
import type { ImageType } from "react-images-uploading"
import { SendMailArgs } from "@/services/mailService"

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
  const [screenshots, setScreenshots] = useState<{
    screenshot1: ImageType | undefined
    screenshot2: ImageType | undefined
  }>({ screenshot1: undefined, screenshot2: undefined })

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
        const recaptchaToken = await executeRecaptcha("bug_report")
        const recaptchaRes = await fetch("/api/recaptcha", {
          method: "POST",
          body: recaptchaToken,
        })
        if (!recaptchaRes.ok) {
          const errorMessage = await recaptchaRes.text()
          throw new Error(errorMessage)
        }

        const attachments = [
          screenshots.screenshot1
            ? {
                filename: screenshots.screenshot1!.file!.name,
                path: screenshots.screenshot1!.dataURL,
              }
            : null,
          screenshots.screenshot2
            ? {
                filename: screenshots.screenshot2!.file!.name,
                path: screenshots.screenshot2!.dataURL,
              }
            : null,
        ].filter(Boolean) as SendMailArgs["attachments"]

        const mailOptions: SendMailArgs = {
          subject: "Bug Report",
          html: `
            <div>
            <h1>Bug Report</h1>
            <br/>
            <p><b>From:</b> ${data.email}</p>
            <br/>
            <p><b>Reproduction Steps:</b> ${data.reproductionSteps}</p>
            <br/>
            <p><b>Expected Behavior:</b> ${data.expectedBehavior}</p>
            <br/>
            <p><b>Desktop Description:</b> ${data.desktopDescription}</p>
            <br/>
            <p><b>Mobile Description:</b> ${data.mobileDescription}</p>
            <br/>
            <p><b>Browser Details:</b> ${data.browserDetails}</p>
            <br/>
            <p><b>Additional Context:</b> ${data.additionalContext}</p>
            </div>`,
          attachments,
          replyTo: data.email,
        }

        const res = await fetch("/api/send_mail", {
          method: "POST",
          body: JSON.stringify(mailOptions),
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
    [executeRecaptcha, screenshots],
  )

  if (formState.submitted) return <div>{t("thankYou")}</div>
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
      <Textarea
        required
        id="reproductionSteps"
        label={t("reproductionSteps.label")}
        helperText={t("reproductionSteps.helperText")}
        textareaProps={{
          placeholder: t("reproductionSteps.placeholder"),
          name: "reproductionSteps",
          minRows: 9,
        }}
        disabled={formState.loading}
      />

      <Textarea
        required
        id="expectedBehavior"
        label={t("expectedBehavior.label")}
        helperText={t("expectedBehavior.helperText")}
        textareaProps={{ name: "expectedBehavior" }}
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
      <Textarea
        id="additionalContext"
        label={t("additionalContext.label")}
        helperText={t("additionalContext.helperText")}
        disabled={formState.loading}
        textareaProps={{ name: "additionalContext" }}
      />

      <FormLabel>Screenshots</FormLabel>
      <FormHelperText>
        If applicable, add screenshots to help explain your problem.
      </FormHelperText>
      <ImageUploadInput
        value={screenshots.screenshot1}
        onChange={(screenshot1) =>
          setScreenshots((prev) => ({ ...prev, screenshot1 }))
        }
      />
      <br />
      <ImageUploadInput
        value={screenshots.screenshot2}
        onChange={(screenshot2) =>
          setScreenshots((prev) => ({ ...prev, screenshot2 }))
        }
      />
      <Box sx={{ mt: 2 }}>
        <Button
          variant="soft"
          color="neutral"
          fullWidth
          type="submit"
          disabled={formState.loading}
        >
          {t("submit")}
        </Button>
      </Box>
    </form>
  )
}
export default BugReportForm
