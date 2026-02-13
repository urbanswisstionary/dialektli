"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function ContactUsPage() {
  const t = useTranslations()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement contact form submission
    alert(t("contactUs.thankYou"))
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
                <Label htmlFor="name">{t("contactUs.name")}</Label>
                <Input id="name" required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">{t("contactUs.email")}</Label>
                <Input id="email" type="email" required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="subject">{t("contactUs.subject")}</Label>
                <Input id="subject" required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="message">{t("contactUs.message")}</Label>
                <Textarea id="message" rows={6} required />
              </div>
              <Button type="submit" size="lg">
                {t("actions.submit")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
