"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { HoneypotField, isHoneypotTripped } from "@/components/ui/HoneypotField"

export default function ContactUsPage() {
  const t = useTranslations()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.currentTarget))
    if (isHoneypotTripped(formData as Record<string, string>)) return

    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch("/api/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Failed to submit")
      setSubmitted(true)
    } catch {
      setError(t("contactUs.errorMessage"))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col gap-6 py-8">
        <Card>
          <CardContent className="p-8">
            <p className="text-lg font-medium">{t("contactUs.thankYou")}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 py-8">
      <Card>
        <CardContent className="p-8">
          <h1 className="mb-4 text-2xl font-bold">
            {t("layout.footer.contact")}
          </h1>
          <p className="mb-6">{t("contactUs.subtitle")}</p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">
                  {t("contactUs.name")}
                  <span className="text-destructive ml-1">*</span>
                </Label>
                <Input id="name" name="name" required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">
                  {t("contactUs.email")}
                  <span className="text-destructive ml-1">*</span>
                </Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="subject">
                  {t("contactUs.subject")}
                  <span className="text-destructive ml-1">*</span>
                </Label>
                <Input id="subject" name="subject" required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="message">
                  {t("contactUs.message")}
                  <span className="text-destructive ml-1">*</span>
                </Label>
                <Textarea id="message" name="message" rows={6} required />
              </div>
              <HoneypotField />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "…" : t("actions.submit")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
