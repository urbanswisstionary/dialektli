"use client"

import type { FC } from "react"

import { useTranslations } from "next-intl"

import type { ExpressionFragmentFragment } from "@/generated/graphql"

import Flag from "@/components/ui/Flag"
import { Separator } from "@/components/ui/separator"
import { Link } from "@/i18n/navigation"

import ExpressionCardContentList from "./ExpressionCardContentList"

type ExpressionCardSynonymsProps = {
  expression: ExpressionFragmentFragment
}

const ExpressionCardSynonyms: FC<ExpressionCardSynonymsProps> = ({
  expression,
}) => {
  const t = useTranslations()
  const synonyms = expression.synonyms ?? []
  return (
    <ExpressionCardContentList label={`${t("expression.synonyms")}:`}>
      {synonyms.map(({ synonymOf: s }, i) =>
        s ? (
          <div key={i} className="px-2 py-1.5">
            <div className="flex items-center justify-between gap-2">
              <Link
                href={`/expressions/${s.id}`}
                className="text-sm text-primary hover:underline"
              >
                {s.title}
              </Link>
              <div className="flex flex-wrap items-center justify-end gap-0.5">
                {s.cantons?.map((canton: string, i: number) => (
                  <Flag key={i} mode="canton" code={canton} />
                ))}
              </div>
            </div>
          </div>
        ) : null,
      )}
      {!!synonyms.length && <Separator className="my-1" />}
      <div className="px-2 py-1.5">
        <Link
          href={`/expressions/new?synonym=${expression.id}`}
          className="text-sm font-semibold text-primary hover:underline"
        >
          {t("expression.suggestSynonym")}
        </Link>
      </div>
    </ExpressionCardContentList>
  )
}

export default ExpressionCardSynonyms
