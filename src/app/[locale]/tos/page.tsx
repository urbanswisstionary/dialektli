"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"

export default function TOSPage() {
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
            {t("legal.tos.title")}
          </h1>

          {/* Description */}
          <p className="mb-4 leading-[1.8]">{t("legal.tos.description.0")}</p>
          <p className="mb-6 leading-[1.8]">{t("legal.tos.description.1")}</p>

          {/* Table of Contents */}
          <div className="my-8 rounded-lg bg-muted/50 p-6">
            <h2 className="mb-4 text-xl font-semibold text-primary">
              {t("legal.tos.tableOfContent.title")}
            </h2>
            <ol className="mt-4 pl-6">
              {[...Array(10)].map((_, index) => (
                <li key={index} className="mb-2">
                  <p>{t(`legal.tos.tableOfContent.list.${index}` as any)}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* NO WARRANTIES */}
          <h2 className="mt-10 mb-4 text-xl font-semibold">
            {t("legal.tos.noGuarantee.title")}
          </h2>
          <p className="mb-6 leading-[1.8]">
            {t("legal.tos.noGuarantee.paragraph")}
          </p>

          {/* LIMITATION OF LIABILITY */}
          <h2 className="mt-10 mb-4 text-xl font-semibold">
            {t("legal.tos.limitationOfLiabilty.title")}
          </h2>
          <p className="mb-6 leading-[1.8]">
            {t("legal.tos.limitationOfLiabilty.paragraph")}
          </p>

          {/* Terms of Usage */}
          <h2 className="mt-10 mb-4 text-xl font-semibold">
            {t("legal.tos.termsOfUsage.title")}
          </h2>
          <p className="mb-6 leading-[1.8]">
            {t("legal.tos.termsOfUsage.paragraph")}
          </p>

          {/* User Conduct */}
          <h2 className="mt-10 mb-4 text-xl font-semibold">
            {t("legal.tos.userConduct.title")}
          </h2>
          <p className="mb-2 leading-[1.8]">
            {t("legal.tos.userConduct.paragraph1.paragraph")}
          </p>
          {renderListItems([
            t("legal.tos.userConduct.paragraph1.list.0" as any),
            t("legal.tos.userConduct.paragraph1.list.1" as any),
            t("legal.tos.userConduct.paragraph1.list.2" as any),
          ])}

          <p className="mt-4 mb-2 leading-[1.8]">
            {t("legal.tos.userConduct.paragraph2.paragraph")}
          </p>
          {renderListItems([
            t("legal.tos.userConduct.paragraph2.list.0" as any),
            t("legal.tos.userConduct.paragraph2.list.1" as any),
            t("legal.tos.userConduct.paragraph2.list.2" as any),
            t("legal.tos.userConduct.paragraph2.list.3" as any),
            t("legal.tos.userConduct.paragraph2.list.4" as any),
            t("legal.tos.userConduct.paragraph2.list.5" as any),
          ])}

          <p className="mt-4 mb-4 leading-[1.8]">
            {t("legal.tos.userConduct.paragraph3")}
          </p>

          <p className="mb-4 leading-[1.8]">
            {t("legal.tos.userConduct.paragraph4")}
          </p>

          <p className="mb-2 leading-[1.8]">
            {t("legal.tos.userConduct.paragraph5.paragraph")}
          </p>
          {renderListItems([
            t("legal.tos.userConduct.paragraph5.list.0" as any),
            t("legal.tos.userConduct.paragraph5.list.1" as any),
            t("legal.tos.userConduct.paragraph5.list.2" as any),
            t("legal.tos.userConduct.paragraph5.list.3" as any),
          ])}

          <p className="mt-4 mb-4 leading-[1.8]">
            {t("legal.tos.userConduct.paragraph6")}
          </p>

          <p className="mb-4 leading-[1.8]">
            {t("legal.tos.userConduct.paragraph7")}
          </p>

          <p className="mb-4 leading-[1.8]">
            {t("legal.tos.userConduct.paragraph8")}
          </p>

          <p className="mb-6 leading-[1.8]">
            {t("legal.tos.userConduct.paragraph9")}
          </p>

          {/* Copyright and Ownership */}
          <h2 className="mt-10 mb-4 text-xl font-semibold">
            {t("legal.tos.copyrightsAndOwnership.title")}
          </h2>
          <p className="mb-4 leading-[1.8]">
            {t("legal.tos.copyrightsAndOwnership.paragraph1")}
          </p>

          <p className="mb-2 leading-[1.8]">
            {t("legal.tos.copyrightsAndOwnership.paragraph2.paragraph")}
          </p>
          {renderListItems([
            t("legal.tos.copyrightsAndOwnership.paragraph2.list.0" as any),
            t("legal.tos.copyrightsAndOwnership.paragraph2.list.1" as any),
            t("legal.tos.copyrightsAndOwnership.paragraph2.list.2" as any),
            t("legal.tos.copyrightsAndOwnership.paragraph2.list.3" as any),
            t("legal.tos.copyrightsAndOwnership.paragraph2.list.4" as any),
            t("legal.tos.copyrightsAndOwnership.paragraph2.list.5" as any),
          ])}

          <p className="mt-4 mb-6 leading-[1.8]">
            {t("legal.tos.copyrightsAndOwnership.paragraph3")}
          </p>

          {/* Disclaimer for Participation */}
          <h2 className="mt-10 mb-4 text-xl font-semibold">
            {t("legal.tos.participationDisclaimer.title")}
          </h2>
          <p className="mb-6 leading-[1.8]">
            {t("legal.tos.participationDisclaimer.paragraph")}
          </p>

          {/* Unsolicited Ideas Policy */}
          <h2 className="mt-10 mb-4 text-xl font-semibold">
            {t("legal.tos.unsolicitedIdeaPolicy.title")}
          </h2>
          <p className="mb-6 leading-[1.8]">
            {t("legal.tos.unsolicitedIdeaPolicy.paragraph")}
          </p>

          {/* Terms of Idea Submission */}
          <h2 className="mt-10 mb-4 text-xl font-semibold">
            {t("legal.tos.termsOfIdeaSubmission.title")}
          </h2>
          <p className="mb-6 leading-[1.8]">
            {t("legal.tos.termsOfIdeaSubmission.paragraph")}
          </p>

          {/* Feedback and Information */}
          <h2 className="mt-10 mb-4 text-xl font-semibold">
            {t("legal.tos.feedbackAndInformation.title")}
          </h2>
          <p className="mb-6 leading-[1.8]">
            {t("legal.tos.feedbackAndInformation.paragraph")}
          </p>

          {/* Updated */}
          <div className="mt-12 border-t border-border pt-6">
            <h2 className="mb-2 text-xl font-semibold">
              {t("legal.tos.updates.title")}
            </h2>
            <p className="mb-2 text-sm italic text-muted-foreground">
              {t("legal.tos.updates.updated")}
            </p>
            <p className="text-sm italic text-muted-foreground">
              {t("legal.tos.updates.copyrights")}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
