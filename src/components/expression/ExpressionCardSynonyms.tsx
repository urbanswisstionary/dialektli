"use client"

import type { FC } from "react"

import { useTranslations } from "next-intl"

import Flag from "@/components/ui/Flag"
import { Separator } from "@/components/ui/separator"
import { ExpressionFragmentFragment } from "@/generated/graphql"
import { Link } from "@/i18n/navigation"

import ExpressionCardContentList from "./ExpressionCardContentList"

type ExpressionCardSynonymsProps = {
  expression: ExpressionFragmentFragment
}

const ExpressionCardSynonyms: FC<ExpressionCardSynonymsProps> = ({
  expression,
}) => {
  const t = useTranslations()

  return (
    <ExpressionCardContentList label={`${t("expression.synonyms")}:`}>
      {expression.synonyms?.map(({ synonymOf: s }, i) =>
        s ? (
          <div key={i} className="py-1.5 px-2">
            <div className="flex items-center justify-between gap-2">
              <Link
                href={`/expressions/${s.id}`}
                className="text-sm text-primary hover:underline"
              >
                {s.title}
              </Link>
              <div className="flex items-center gap-0.5 flex-wrap justify-end">
                {s.cantons?.map((canton: string, i: number) => (
                  <Flag key={i} mode="canton" code={canton} />
                ))}
              </div>
            </div>
          </div>
        ) : null,
      )}
      {expression.synonyms?.length ? <Separator className="my-1" /> : null}
      <div className="py-1.5 px-2">
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
