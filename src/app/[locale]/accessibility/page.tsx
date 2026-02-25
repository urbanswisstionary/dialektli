"use client"

import { useTranslations } from "next-intl"

import { Card, CardContent } from "@/components/ui/card"

export default function AccessibilityPage() {
  const t = useTranslations()

  const renderListItems = (items: string[]) => {
    return (
      <ul className="mt-2 mb-4 pl-6">
        {items.map((item, index) => (
          <li key={index} className="mb-1">
            <p className="leading-[1.8]">{item}</p>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="mx-auto flex max-w-[900px] flex-col gap-6 px-6 py-8">
      <Card>
        <CardContent className="p-6 md:p-10">
          <h1 className="mb-8 text-3xl font-semibold text-primary">
            {t("accessibility.title")}
          </h1>

          {/* Commitment */}
          <h2 className="mt-8 mb-4 text-xl font-semibold">
            {t("accessibility.commitment.title")}
          </h2>
          <p className="mb-6 leading-[1.8]">
            {t("accessibility.commitment.paragraph")}
          </p>

          {/* WCAG Compliance */}
          <h2 className="mt-10 mb-4 text-xl font-semibold">
            {t("accessibility.wcagCompliance.title")}
          </h2>
          <p className="mb-6 leading-[1.8]">
            {t("accessibility.wcagCompliance.paragraph")}
          </p>

          {/* Accessibility Features */}
          <h2 className="mt-10 mb-4 text-xl font-semibold">
            {t("accessibility.features.title")}
          </h2>
          <p className="mb-2 leading-[1.8]">
            {t("accessibility.features.intro")}
          </p>
          {renderListItems([
            t("accessibility.features.list.0" as any),
            t("accessibility.features.list.1" as any),
            t("accessibility.features.list.2" as any),
            t("accessibility.features.list.3" as any),
            t("accessibility.features.list.4" as any),
            t("accessibility.features.list.5" as any),
          ])}

          {/* Report Issues */}
          <h2 className="mt-10 mb-4 text-xl font-semibold">
            {t("accessibility.reportIssues.title")}
          </h2>
          <p className="mb-4 leading-[1.8]">
            {t("accessibility.reportIssues.paragraph")}
          </p>

          {/* Contact Information */}
          <div className="mt-8 rounded-lg bg-muted/50 p-6">
            <h3 className="mb-2 text-lg font-semibold text-primary">
              {t("accessibility.contact.title")}
            </h3>
            <p className="mb-2 leading-[1.8]">
              {t("accessibility.contact.paragraph")}
            </p>
            <a
              href="mailto:urbanswisstionary@gmail.com"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              urbanswisstionary@gmail.com
            </a>
          </div>

          {/* Ongoing Efforts */}
          <h2 className="mt-10 mb-4 text-xl font-semibold">
            {t("accessibility.ongoingEfforts.title")}
          </h2>
          <p className="mb-6 leading-[1.8]">
            {t("accessibility.ongoingEfforts.paragraph")}
          </p>

          {/* Last Updated */}
          <div className="mt-12 border-t border-border pt-6">
            <p className="text-sm italic text-muted-foreground">
              {t("accessibility.updated")}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
