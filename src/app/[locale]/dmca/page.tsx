"use client"

import { useTranslations } from "next-intl"

import { Card, CardContent } from "@/components/ui/card"

export default function DMCAPage() {
  const t = useTranslations()

  return (
    <div className="flex flex-col gap-6 py-8">
      <Card>
        <CardContent className="p-8">
          <h1 className="mb-6 text-2xl font-bold">{t("layout.footer.dmca")}</h1>

          <h2 className="mt-8 mb-2 text-lg font-semibold">
            {t("legal.dmca.section1.title")}
          </h2>
          <p className="mb-6 leading-[1.7]">
            {t("legal.dmca.section1.content")}
          </p>

          <h2 className="mt-8 mb-2 text-lg font-semibold">
            {t("legal.dmca.section2.title")}
          </h2>
          <p className="mb-6 leading-[1.7]">
            {t("legal.dmca.section2.content")}
          </p>

          <h2 className="mt-8 mb-2 text-lg font-semibold">
            {t("legal.dmca.section3.title")}
          </h2>
          <p className="mb-6 leading-[1.7]">
            {t("legal.dmca.section3.content")}
          </p>

          <h2 className="mt-8 mb-2 text-lg font-semibold">
            {t("legal.dmca.section4.title")}
          </h2>
          <p className="mb-6 leading-[1.7]">
            {t("legal.dmca.section4.content")}
          </p>

          <p className="mt-10 text-sm italic text-muted-foreground">
            {t("legal.lastUpdated")}: {new Date().toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
