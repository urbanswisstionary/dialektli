"use client"

import type { FC } from "react"

import { useTranslations } from "next-intl"

import type { ExpressionFragmentFragment } from "@/generated/graphql"

import { getFragmentData } from "@/generated"
import { ExpressionExampleFragment } from "@/hooks/useExpressions"

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
  const examples =
    getFragmentData(ExpressionExampleFragment, expression.examples) ?? []

  return (
    <ExpressionCardContentList
      disabled={disabled}
      label={`${t("expression.examples")}:`}
    >
      {examples.map((example) => (
        <div key={example.id} className="py-1.5 px-2">
          <p className="text-sm italic text-muted-foreground">
            {example.definition}
          </p>
        </div>
      ))}
    </ExpressionCardContentList>
  )
}

export default ExpressionCardExamples
