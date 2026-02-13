"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function BugReportPage() {
  const t = useTranslations()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement bug report submission
    alert(t("bugReport.thankYou"))
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
                <Label htmlFor="email">{t("bugReport.email")}</Label>
                <Input id="email" type="email" required />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="bugDescription">
                  {t("bugReport.bugDescription.label")}
                </Label>
                <Textarea id="bugDescription" rows={4} required />
                <p className="text-xs text-muted-foreground">
                  {t("bugReport.bugDescription.helperText")}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="reproductionSteps">
                  {t("bugReport.reproductionSteps.label")}
                </Label>
                <Textarea
                  id="reproductionSteps"
                  rows={4}
                  placeholder={t("bugReport.reproductionSteps.placeholder")}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  {t("bugReport.reproductionSteps.helperText")}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="expectedBehavior">
                  {t("bugReport.expectedBehavior.label")}
                </Label>
                <Textarea id="expectedBehavior" rows={3} required />
                <p className="text-xs text-muted-foreground">
                  {t("bugReport.expectedBehavior.helperText")}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="desktopDescription">
                  {t("bugReport.desktopDescription.label")}
                </Label>
                <Input id="desktopDescription" />
                <p className="text-xs text-muted-foreground">
                  {t("bugReport.desktopDescription.helperText")}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="mobileDescription">
                  {t("bugReport.mobileDescription.label")}
                </Label>
                <Input id="mobileDescription" />
                <p className="text-xs text-muted-foreground">
                  {t("bugReport.mobileDescription.helperText")}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="browserDetails">
                  {t("bugReport.browserDetails.label")}
                </Label>
                <Input id="browserDetails" />
                <p className="text-xs text-muted-foreground">
                  {t("bugReport.browserDetails.helperText")}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="additionalContext">
                  {t("bugReport.additionalContext.label")}
                </Label>
                <Textarea id="additionalContext" rows={3} />
                <p className="text-xs text-muted-foreground">
                  {t("bugReport.additionalContext.helperText")}
                </p>
              </div>
              <Button type="submit" size="lg">
                {t("bugReport.submit")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
