"use client"

import type { FC } from "react"

import { Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"

import ExpressionCard from "@/components/expression/ExpressionCard"
import { getFragmentData } from "@/generated"
import { useExpression, ExpressionFragment } from "@/hooks/useExpressions"
import { useMe } from "@/hooks/useUsers"

type ExpressionDetailClientProps = {
  expressionId: string
}

const ExpressionDetailClient: FC<ExpressionDetailClientProps> = ({
  expressionId,
}) => {
  const t = useTranslations()
  const { me, loading: loadingMe } = useMe()
  const { data, loading: loadingExpression } = useExpression(
    expressionId,
    !expressionId,
  )

  const loading = loadingMe || loadingExpression
  const expression = data?.expression
    ? getFragmentData(ExpressionFragment, data.expression)
    : null

  if (loading) {
    return (
      <div className="flex items-center justify-center my-10">
        <Loader2 className="h-15 w-15 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!expression) {
    return <>{t("noData")}</>
  }

  return <ExpressionCard expression={expression} disableActions={!me} />
}

export default ExpressionDetailClient
