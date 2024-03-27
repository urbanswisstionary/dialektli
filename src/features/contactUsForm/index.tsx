import { type FC, type FormEvent, useCallback, useState } from "react"
import Input from "./components/input"
import Textarea from "./components/textarea"
import Stack from "@mui/joy/Stack"
import Button from "@mui/joy/Button"
import { useReCaptcha } from "next-recaptcha-v3"
import { useTranslation } from "next-i18next"

import type { SendMailArgs } from "@/services/mailService"

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLTextAreaElement
  email: HTMLInputElement
  subject: HTMLTextAreaElement
  message: HTMLInputElement
}
interface BugReportFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

const ContactUsForm: FC = () => {
  const { t } = useTranslation("common")
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
        name: formElements.name.value,
        email: formElements.email.value,
        subject: formElements.subject.value,
        message: formElements.message.value,
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

        const mailOptions: SendMailArgs = {
          subject: data.subject,
          text: `${data.email}; ${data.message}`,
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
    [executeRecaptcha],
  )

  if (formState.submitted) return <div>{t("contactUs.thankYou")}</div>
  if (formState.error) return <>Error:{formState.error}</>
  return (
    <form onSubmit={onSubmit}>
      <Stack gap={2}>
        <Input
          required
          label={t("contactUs.email")}
          inputProps={{ type: "email", name: "email" }}
          id="email"
          disabled={formState.loading}
        />
        <Input
          required
          label={t("contactUs.name")}
          inputProps={{ type: "text", name: "name" }}
          id="name"
          disabled={formState.loading}
        />
        <Input
          required
          label={t("contactUs.subject")}
          inputProps={{ type: "text", name: "subject" }}
          id="subject"
          disabled={formState.loading}
        />
        <Textarea
          required
          id="message"
          label={t("contactUs.message")}
          textareaProps={{ name: "message", minRows: 6 }}
          disabled={formState.loading}
        />

        <Button
          variant="soft"
          color="neutral"
          fullWidth
          type="submit"
          disabled={formState.loading}
        >
          {t("actions.submit")}
        </Button>
      </Stack>
    </form>
  )
}
export default ContactUsForm
