"use client"

import type { FC } from "react"
import { useTranslations } from "next-intl"
import { ExpressionFragmentFragment } from "@/generated/graphql"
import ExpressionCardContentList from "./ExpressionCardContentList"

type ExpressionCardExamplesProps = {
  expression: ExpressionFragmentFragment
  disabled?: boolean
}

const ExpressionCardExamples: FC<ExpressionCardExamplesProps> = ({
  expression,
  disabled,
}) => {
  const t = useTranslations()
  const examples = expression.examples ?? []

  return (
    <ExpressionCardContentList
      disabled={disabled}
      label={`${t("expression.examples")}:`}
    >
      {examples.map((example: any, i: number) => (
        <div key={example.id} className="py-1.5 px-2">
          <p className="text-sm text-muted-foreground">
            {i + 1}. {example.definition}
          </p>
        </div>
      ))}
    </ExpressionCardContentList>
  )
}

export default ExpressionCardExamples
