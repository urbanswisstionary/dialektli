"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { HoneypotField, isHoneypotTripped } from "@/components/ui/HoneypotField"

export default function BugReportPage() {
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
      const res = await fetch("/api/bug-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Failed to submit")
      setSubmitted(true)
    } catch {
      setError(t("bugReport.errorMessage"))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col gap-6 py-8">
        <Card>
          <CardContent className="p-8">
            <p className="text-lg font-medium">{t("bugReport.thankYou")}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 py-8">
      <Card>
        <CardContent className="p-8">
          <h1 className="mb-4 text-2xl font-bold">{t("bugReport.title")}</h1>
          <p className="mb-6">{t("bugReport.subtitle")}</p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">
                  {t("bugReport.email")}
                  <span className="text-destructive ml-1">*</span>
                </Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="bugDescription">
                  {t("bugReport.bugDescription.label")}
                  <span className="text-destructive ml-1">*</span>
                </Label>
                <Textarea
                  id="bugDescription"
                  name="bugDescription"
                  rows={4}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  {t("bugReport.bugDescription.helperText")}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="reproductionSteps">
                  {t("bugReport.reproductionSteps.label")}
                  <span className="text-destructive ml-1">*</span>
                </Label>
                <Textarea
                  id="reproductionSteps"
                  name="reproductionSteps"
                  rows={10}
                  placeholder={t("bugReport.reproductionSteps.placeholder")}
                  required
                  defaultValue={t("bugReport.reproductionSteps.placeholder")}
                />
                <p className="text-xs text-muted-foreground">
                  {t("bugReport.reproductionSteps.helperText")}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="expectedBehavior">
                  {t("bugReport.expectedBehavior.label")}
                  <span className="text-destructive ml-1">*</span>
                </Label>
                <Textarea
                  id="expectedBehavior"
                  name="expectedBehavior"
                  rows={3}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  {t("bugReport.expectedBehavior.helperText")}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="desktopDescription">
                  {t("bugReport.desktopDescription.label")}
                </Label>
                <Input id="desktopDescription" name="desktopDescription" />
                <p className="text-xs text-muted-foreground">
                  {t("bugReport.desktopDescription.helperText")}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="mobileDescription">
                  {t("bugReport.mobileDescription.label")}
                </Label>
                <Input id="mobileDescription" name="mobileDescription" />
                <p className="text-xs text-muted-foreground">
                  {t("bugReport.mobileDescription.helperText")}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="browserDetails">
                  {t("bugReport.browserDetails.label")}
                </Label>
                <Input id="browserDetails" name="browserDetails" />
                <p className="text-xs text-muted-foreground">
                  {t("bugReport.browserDetails.helperText")}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="additionalContext">
                  {t("bugReport.additionalContext.label")}
                </Label>
                <Textarea
                  id="additionalContext"
                  name="additionalContext"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  {t("bugReport.additionalContext.helperText")}
                </p>
              </div>
              <HoneypotField />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "…" : t("bugReport.submit")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
