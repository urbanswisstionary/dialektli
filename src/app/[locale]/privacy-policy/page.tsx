"use client"

import { useTranslations } from "next-intl"

import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  const t = useTranslations()

  return (
    <div className="mx-auto flex max-w-225 flex-col gap-6 px-6 py-8">
      <Card>
        <CardContent className="p-6 md:p-10">
          <h1 className="mb-8 text-3xl font-semibold text-primary">
            {t("legal.privacyPolicy.title")}
          </h1>

          <p className="mb-4 leading-[1.8]">
            {t("legal.privacyPolicy.description.0")}
          </p>
          <ul className="mb-4 pl-6">
            {[0, 1].map((index) => (
              <li key={index} className="mb-1">
                <p className="leading-[1.8]">
                  {t(`legal.privacyPolicy.description.1.${index}` as any)}
                </p>
              </li>
            ))}
          </ul>
          <p className="mb-6 leading-[1.8]">
            {t("legal.privacyPolicy.description.2")}
          </p>

          <div className="my-8 rounded-lg bg-muted/50 p-6">
            <h2 className="mb-4 text-xl font-semibold text-primary">
              {t("legal.privacyPolicy.tableOfContent.title")}
            </h2>
            <ol className="mt-4 pl-6">
              {(
                t.raw("legal.privacyPolicy.tableOfContent.list") as string[]
              ).map((v, i) => (
                <li key={i} className="mb-2">
                  <a href={`#${v}`}>{v}</a>
                </li>
              ))}
            </ol>
          </div>

          <h2
            className="mt-10 mb-4 text-xl font-semibold"
            id={t("legal.privacyPolicy.informationWeCollect.title")}
          >
            {t("legal.privacyPolicy.informationWeCollect.title")}
          </h2>
          <p className="mb-6 leading-[1.8]">
            {t("legal.privacyPolicy.informationWeCollect.paragraph")}
          </p>

          <h2
            className="mt-10 mb-4 text-xl font-semibold"
            id={t("legal.privacyPolicy.howWeUseYourInformation.title")}
          >
            {t("legal.privacyPolicy.howWeUseYourInformation.title")}
          </h2>
          <p className="mb-6 leading-[1.8]">
            {t("legal.privacyPolicy.howWeUseYourInformation.paragraph")}
          </p>

          <h2
            className="mt-10 mb-4 text-xl font-semibold"
            id={t("legal.privacyPolicy.whenDoWeShareYourData.title")}
          >
            {t("legal.privacyPolicy.whenDoWeShareYourData.title")}
          </h2>
          <p className="mb-6 leading-[1.8]">
            {t("legal.privacyPolicy.whenDoWeShareYourData.paragraph")}
          </p>

          <h2
            className="mt-10 mb-4 text-xl font-semibold"
            id={t("legal.privacyPolicy.yourPrivacyRights.title")}
          >
            {t("legal.privacyPolicy.yourPrivacyRights.title")}
          </h2>
          <p className="mb-6 leading-[1.8]">
            {t("legal.privacyPolicy.yourPrivacyRights.paragraph")}
          </p>

          <h2
            className="mt-10 mb-4 text-xl font-semibold"
            id={t(
              "legal.privacyPolicy.informationRequestsAndDeletionRequests.title",
            )}
          >
            {t(
              "legal.privacyPolicy.informationRequestsAndDeletionRequests.title",
            )}
          </h2>
          <p className="mb-6 leading-[1.8]">
            {t(
              "legal.privacyPolicy.informationRequestsAndDeletionRequests.paragraph",
            )}
          </p>

          <h2
            className="mt-10 mb-4 text-xl font-semibold"
            id={t("legal.privacyPolicy.dataStorage.title")}
          >
            {t("legal.privacyPolicy.dataStorage.title")}
          </h2>
          <p className="mb-6 leading-[1.8]">
            {t("legal.privacyPolicy.dataStorage.paragraph")}
          </p>

          <h2
            className="mt-10 mb-4 text-xl font-semibold"
            id={t("legal.privacyPolicy.security.title")}
          >
            {t("legal.privacyPolicy.security.title")}
          </h2>
          <p className="mb-6 leading-[1.8]">
            {t("legal.privacyPolicy.security.paragraph")}
          </p>

          <h2
            className="mt-10 mb-4 text-xl font-semibold"
            id={t("legal.privacyPolicy.children.title")}
          >
            {t("legal.privacyPolicy.children.title")}
          </h2>
          <p className="mb-6 leading-[1.8]">
            {t("legal.privacyPolicy.children.paragraph")}
          </p>

          <h2
            className="mt-10 mb-4 text-xl font-semibold"
            id={t("legal.privacyPolicy.changes.title")}
          >
            {t("legal.privacyPolicy.changes.title")}
          </h2>
          <p className="mb-6 leading-[1.8]">
            {t("legal.privacyPolicy.changes.paragraph")}
          </p>

          <h2
            className="mt-10 mb-4 text-xl font-semibold"
            id={t("legal.privacyPolicy.questions.title")}
          >
            {t("legal.privacyPolicy.questions.title")}
          </h2>
          <p className="mb-6 leading-[1.8]">
            {t("legal.privacyPolicy.questions.paragraph")}
          </p>

          <div className="mt-12 border-t border-border pt-6">
            <p className="text-sm italic text-muted-foreground">
              {t("legal.lastUpdated")}: February 2024
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
