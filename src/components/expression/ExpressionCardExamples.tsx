"use client"

import type { FC } from "react"
import ListItem from "@mui/material/ListItem"
import { useTranslations } from "next-intl"
import { ExpressionFragmentFragment } from "@/generated/graphql"
import ExpressionCardContentList from "./ExpressionCardContentList"
import ListItemText from "@mui/material/ListItemText"
import Typography from "@mui/material/Typography"

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
        <ListItem key={example.id}>
          <ListItemText>
            <Typography variant="body2">
              {i + 1}. {example.definition}
            </Typography>
          </ListItemText>
        </ListItem>
      ))}
    </ExpressionCardContentList>
  )
}

export default ExpressionCardExamples
